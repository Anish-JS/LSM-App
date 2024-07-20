import { Category, Course } from "@prisma/client";

import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          const wordsOfTitle = course.title.toString().split(" ");
          let strTitle = "";
          wordsOfTitle.forEach((word) => {
            strTitle += word[0].toUpperCase() + word.slice(1) + " ";
          });

          if (course.purchases.length === 0)
            return { ...course, title: strTitle, progress: null };
          const progressPercent = await getProgress(userId, course.id);
          return { ...course, title: strTitle, progress: progressPercent };
        })
      );

    return coursesWithProgress;
  } catch (err) {
    console.log("[GET_COURSES]", err);
    return [];
  }
};

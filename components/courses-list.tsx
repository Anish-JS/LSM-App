import { Category, Course } from "@prisma/client";
import { CourseCard } from "./course-card";
import { upperCaseTitle } from "@/lib/upper-case-title";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}
export const CoursesList = ({ items }: CoursesListProps) => {
  const courseItems = items.map((item) => {
    const title = upperCaseTitle(item.title);
    return { ...item, title: title };
  });
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg: grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {courseItems.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageURL!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Course Found
        </div>
      )}
    </div>
  );
};

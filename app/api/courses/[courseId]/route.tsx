import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    const values = await req.json();
    // console.log(values);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: { ...values },
    });
    return NextResponse.json(course);
  } catch (err) {
    console.log("[COURSES_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

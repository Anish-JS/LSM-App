import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { upperCaseTitle } from "@/lib/upper-case-title";

const CoursePage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const courses = await db.course.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const courseItems = courses.map((item) => {
    const title = upperCaseTitle(item.title);
    return { ...item, title: title };
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courseItems} />
    </div>
  );
};

export default CoursePage;

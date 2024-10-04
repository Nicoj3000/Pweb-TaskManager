import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Calendar } from "./components/Calendar";

export default async function Taskspage({ params }: { params: { taskId: string } }) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const companies = await db.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const events = (await db.event.findMany({
    where: {
      taskId: params.taskId,
      userId
    },
    include: {
      task: true, // Incluir la relación con la empresa
    },
  })).map(event => ({
    ...event,
    Task: event.task
  }));

  return (
    <div>
      <Calendar tasks={companies} events={events} />
    </div>
  );
}
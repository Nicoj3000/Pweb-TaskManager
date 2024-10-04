import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const { userId } = auth();
    const { taskId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const task = await db.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: {
        title: values.title,
        description: values.description,
      },
    });

    return NextResponse.json(task);

  } catch (error) {
    console.log("[TASK ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const { userId } = auth();
    const { taskId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deleteCompany = await db.task.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json(deleteCompany);
    
  } catch (error) {
    console.log("[COMPANY ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
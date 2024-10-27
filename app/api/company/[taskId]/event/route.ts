import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Asegúrate de que la ruta de importación sea correcta
import { auth } from "@clerk/nextjs"; // Importar auth para manejar la autenticación
import { Prisma } from "@prisma/client"; // Importar Prisma para manejar errores específicos

export async function POST(request: Request, { params }: { params: { taskId: string } }) {
  try {
    const { userId } = auth();
    const data = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const task = await db.task.findUnique({
      where: {
        id: params.taskId,
      },
    });

    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }

    const event = await db.event.create({
      data: {
        taskId: params.taskId,
        userId: userId,
        title: data.title,
        start: data.start,
        allDay: data.allDay,
        timeFormat: data.timeFormat,
        description: data.description || "", // Proporcionar un valor por defecto si 'description' no está definido
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.log("[EVENT] Error al crear el evento:", error); // Mejorar el log de errores
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Manejar errores conocidos de Prisma
      console.error("Prisma error code:", error.code);
      return new NextResponse(`Prisma error: ${error.message}`, { status: 500 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
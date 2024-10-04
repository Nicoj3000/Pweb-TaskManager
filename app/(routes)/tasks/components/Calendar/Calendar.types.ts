import { Task, Event as PrismaEvent } from "@prisma/client";

export type Event = PrismaEvent & {
  task: Task; // Asegúrate de que la propiedad 'task' esté en minúscula para coincidir con el uso en el componente
};

export type CalendarProps = {
  tasks: Task[]; // Lista de tareas
  events: Event[]; // Lista de eventos que incluyen la relación con las tareas
  
};
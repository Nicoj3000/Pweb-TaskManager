import { PrismaClient } from '@prisma/client';
import { UsersRound, Waypoints } from "lucide-react";
import { CardSummary } from "../components/CardSummary";
import { HeaderCompanies } from "./components/HeaderTask";
import { ListCompanies } from "./components/listTask";

const prisma = new PrismaClient();

export default async function CompaniesPage() {
  const tasksCount = await prisma.task.count();
  const eventsCount = await prisma.event.count();

  const dataCardsSummary = [
    {
      icon: UsersRound,
      total: tasksCount,
      average: tasksCount, // Puedes calcular el promedio real si es necesario
      title: "Tasks created",
      tooltipText: "See all the tasks created",
    },
    {
      icon: Waypoints,
      total: eventsCount,
      average: eventsCount, // Puedes calcular el promedio real si es necesario
      title: "Events created",
      tooltipText: "See all of the events created",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-x-20">
        {dataCardsSummary.map(
          ({ icon, total, average, title, tooltipText }) => (
            <CardSummary
              key={title}
              icon={icon}
              total={total}
              average={average}
              title={title}
              tooltipText={tooltipText}
            />
          )
        )}
      </div>
      <div className="mt-3">
        <HeaderCompanies />
        <ListCompanies />
      </div>
    </div>
  );
}
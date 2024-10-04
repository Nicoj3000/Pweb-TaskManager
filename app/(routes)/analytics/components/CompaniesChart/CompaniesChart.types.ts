import { Task, Event } from "@prisma/client"

export type CompaniesChartProps = {
    companies: Task[],
    events: Event[]
}
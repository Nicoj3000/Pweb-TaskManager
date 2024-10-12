import {
  BarChart4,
  CircleHelpIcon,
  BookCheck,
  Bot,
  CalendarDays,
  BotMessageSquare,
} from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: BotMessageSquare,
    label: "Chat with AI",
    href: "/",
  },

  {
    icon: BookCheck,
    label: "Tasks",
    href: "/companies",
  },

  {
    icon: CalendarDays,
    label: "Calendar",
    href: "/tasks",
  },
];

export const dataToolsSidebar = [
  {
    icon: CircleHelpIcon,
    label: "Faqs",
    href: "/faqs",
  },
  {
    icon: BarChart4,
    label: "Analytics",
    href: "/analytics",
  },
];

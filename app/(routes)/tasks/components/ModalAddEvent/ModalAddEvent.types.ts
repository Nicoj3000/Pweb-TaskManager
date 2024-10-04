import { Task } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type ModalAddEventProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>;
  tasks: Task[];
  setNewEvent: Dispatch<
    SetStateAction<{
      eventName: string;
      taskSelected: { name: string; id: string };
      description: string;
    }>
  >;
};
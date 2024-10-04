import { Task } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type FormEventProps = {
  setNewEvent: Dispatch<SetStateAction<{
      eventName: string,
      taskSelected: { name: string; id: string },
      description: string,
    }>
  >;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tasks: Task[];
  setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>;
};




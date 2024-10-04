import { Task } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type TaskFormProps = {
  task: Task;
  setOpenModalCreate: Dispatch<SetStateAction<boolean>>
};

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ModalAddEventProps } from "./ModalAddEvent.types";
import { FormEvent } from "../FormEvent";

export function ModalAddEvent(props: ModalAddEventProps) {
  const { open, tasks, setNewEvent,  setOnSaveNewEvent, setOpen } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new event</DialogTitle>
        </DialogHeader>
        <FormEvent
          setOnSaveNewEvent={setOnSaveNewEvent}
          tasks={tasks}
          setOpen={setOpen}
          setNewEvent={setNewEvent}
        />
      </DialogContent>
    </Dialog>
  );
}
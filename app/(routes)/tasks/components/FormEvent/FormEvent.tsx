"use client";

import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormEventProps } from "./FormEvent.types";

const formSchema = z.object({
  eventName: z.string().min(2),
  taskSelected: z.object({
    name: z.string().min(2),
    id: z.string(),
  }),
  description: z.string().nullable(),
});

export function FormEvent(props: FormEventProps) {
  const { tasks, setNewEvent, setOnSaveNewEvent, setOpen } = props;
  const [selectedTask, setselectedTask] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    console.log("Tasks received:", tasks);
  }, [tasks]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      taskSelected: {
        name: "",
        id: "",
      },
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setNewEvent({
      eventName: values.eventName,
      taskSelected: values.taskSelected,
      description: values.description || "",
    });
    setOpen(false);
    setOnSaveNewEvent(true);
  }

  const handleTaskChange = (newValue: string) => {
    const selectedTask = tasks.find((tasks) => tasks.title === newValue);
    if (selectedTask) {
      setselectedTask({
        name: selectedTask.title,
        id: selectedTask.id,
      });
      form.setValue("taskSelected.name", selectedTask.title);
      form.setValue("taskSelected.id", selectedTask.id);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Meeting..." {...field} />
              </FormControl>
              <FormDescription>This is your event name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taskSelected.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task name</FormLabel>
              <Select
                onValueChange={(newValue) => {
                  field.onChange(newValue);
                  handleTaskChange(newValue);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tasks" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tasks &&
                    tasks.map((tasks) => (
                      <SelectItem key={tasks.id} value={tasks.title}>
                        {tasks.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Description..." {...field} value={field.value ?? ""} />
              </FormControl>
              <FormDescription>This is your event description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create event</Button>
      </form>
    </Form>
  );
}

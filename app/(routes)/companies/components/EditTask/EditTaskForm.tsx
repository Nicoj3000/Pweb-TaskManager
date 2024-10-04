"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import Axios from "axios";

import { toast } from "@/components/ui/use-toast";

import { UploadButton } from "@/utils/uploadthing";

import { TaskFormProps } from "./TaskForm.types";
import { formSchema } from "./TaskForm.form";

export function CompanyForm(props: TaskFormProps) {
  const { task, setOpenModalCreate} = props;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      

    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await Axios.patch(`/api/company/${task.id}`, values);
      toast({ title: "Company edited" });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error editing company",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task name </FormLabel>
                <FormControl>
                  <Input placeholder="Task name..." type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Description </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Task description..."
                    {...field}
                    value={form.getValues().description ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Edit Task</Button>
        
      </form>
    </Form>
  );
}

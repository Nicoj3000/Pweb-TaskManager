"use client";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Task } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyForm } from "../EditTask";
import { FooterCompany } from "../FooterTask";

const EditExpense = ({ task }: { task: Task }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

    const handleDeleteClick = () => {
      setIsDeleting(true);
    };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="w-8 h-4 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={handleEditClick}
            className="cursor-pointer"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="cursor-pointer"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-[90%] rounded-md sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
            <DialogDescription>
              Complete the form to edit the task
            </DialogDescription>
          </DialogHeader>
          <CompanyForm task={task} setOpenModalCreate={setIsEditing} />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="max-w-[90%] rounded-md sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Delete task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the task?
            </DialogDescription>
          </DialogHeader>
          <FooterCompany taskId={task.id} onClose={() => setIsDeleting(false)} />
        </DialogContent>
      </Dialog>
      
    </div>
  );
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task names
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description task",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { id, userId, title, description, createdAt, updatedAt } =
        row.original;
      return (
        <EditExpense
          task={{ id, userId, title, description, createdAt, updatedAt }}
        />
      );
    },
  },
];

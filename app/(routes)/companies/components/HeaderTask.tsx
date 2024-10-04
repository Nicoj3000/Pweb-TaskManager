"use client"

import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  
} from "@/components/ui/dialog"
import { useState } from "react"
import { FormCreateCustomer } from "./FormCreateTask"

export  function HeaderCompanies() {
  const [openModalCreate, setOpenModalCreate] = useState(false)
  return (
    <div className="flex justify-between items-center ">
      <h2 className="text-2xl">List of task</h2>

      <Dialog open={openModalCreate} onOpenChange=
      {setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Create Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>
              Create and configure a task
            </DialogDescription>
          </DialogHeader>

          <FormCreateCustomer setOpenModalCreate={setOpenModalCreate}/>

        </DialogContent>

      </Dialog>

    </div>
  )
}

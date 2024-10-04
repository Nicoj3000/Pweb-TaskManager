"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FooterCompanyProps } from "./FooterTask.types";
import { toast } from "@/components/ui/use-toast";

export function FooterCompany(props: FooterCompanyProps) {
  const { taskId, onClose } = props;
  const router = useRouter();

  const onDeleteCompany = async () => {
    try {
      await axios.delete(`/api/company/${taskId}`);
      toast({
        title: "Task deleted",
      });
      router.push("/companies");
      onClose(); // Cerrar el diálogo después de eliminar
    } catch (error) {
      toast({
        title: "Error deleting task",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-end mt-5">
      <Button variant="destructive" onClick={onDeleteCompany}>
        <Trash className="w-4 h-4 mr-2" />
        Eliminar task
      </Button>
    </div>
  );
}
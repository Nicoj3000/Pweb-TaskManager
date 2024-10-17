"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button"; // Importa el componente Button

export function RefreshButton() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Button
      onClick={handleRefresh}
      variant="outline"
      size="icon"
      className="flex items-center justify-center p-2 rounded-md"
      title="Refresh Page"
    >
      <RefreshCw className="w-5 h-5" />
    </Button>
  );
}
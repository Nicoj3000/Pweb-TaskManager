import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { SidebarRoutes } from "../SidebarRoutes";
import { ToggleTheme } from "@/components/ToggleTheme";
export function Navbar() {
  return (
    <nav
      className="flex items-center px-2 gap-x-4 md:px-6 
    justify-between w-full bg-background border-b h-20"
    >
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>
      <div className="relative W-[300px]">
      <h1 className="text-xl font-bold ">
            Start controlling your life
          </h1>
        
      </div>
      <div className="flex gap-x-2 items-center">
        <ToggleTheme />
        <UserButton />
      </div>
    </nav>
  );
}

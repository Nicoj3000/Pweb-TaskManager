import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { SidebarRoutes } from "../SidebarRoutes";
import { ToggleTheme } from "@/components/ToggleTheme";
import { RefreshButton } from "./RefreshComp";
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
      <div className=" relative flex items-center W-[300px] gap-2 ">
        <h1 className="text-xl font-sans ">Start controlling your life</h1>
        <RefreshButton />
      </div>
      
      <div className="flex gap-x-2 items-center">
        <ToggleTheme />
        <UserButton />
      </div>
    </nav>
  );
}

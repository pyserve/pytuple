import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BellIcon, Moon, Settings2 } from "lucide-react";
import { UserDropdown } from "./user-dropdown";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 max-w-full">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-6" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-[250px] md:w-[300px]"
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="bg-gray-50 p-2 rounded-md hover:bg-gray-200">
          <Moon size={18} />
        </div>
        <div className="bg-gray-50 p-2 rounded-md hover:bg-gray-200">
          <BellIcon size={18} />
        </div>
        <div className="bg-gray-50 p-2 rounded-md hover:bg-gray-200">
          <Settings2 size={18} />
        </div>
        <div className="bg-gray-50 rounded-md hover:bg-gray-200">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}

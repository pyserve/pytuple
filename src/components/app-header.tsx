import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserDropdown } from "./user-dropdown";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-6" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-[250px] md:w-[300px]"
        />
      </div>
      <UserDropdown />
    </header>
  );
}

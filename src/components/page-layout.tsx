"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMassDelete } from "@/hooks/update-records";
import { useQueryClient } from "@tanstack/react-query";
import { RowSelectionState } from "@tanstack/react-table";
import {
  ChevronDown,
  Download,
  Edit,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { Dispatch } from "react";
import toast from "react-hot-toast";
import { useDialog } from "./providers/alert-dialog-provider";

export function PageLayout({
  children,
  module,
  selectedRows,
  setRowSelection,
  createComponent,
  importExport = false,
}: {
  children: React.ReactNode;
  module: string;
  selectedRows: Record<number, boolean>;
  setRowSelection: Dispatch<React.SetStateAction<RowSelectionState>>;
  createComponent: React.ReactNode;
  importExport?: boolean;
}) {
  const { showDialog } = useDialog();
  const massDelete = useMassDelete();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (await showDialog({})) {
      try {
        const res = await massDelete.mutateAsync({
          module: module,
          ids: Object.keys(selectedRows),
        });
        console.log("🚀 ~ handleDelete ~ res:", res);
        toast.success("Deleted successfully!");
        setRowSelection({});
        queryClient.invalidateQueries({ queryKey: [module] });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error");
      }
    }
  };

  const justify =
    Object.keys(selectedRows)?.length > 0 ? "justify-between" : "justify-end";
  return (
    <div className="">
      <div className={`flex items-center p-2 ${justify}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {Object.keys(selectedRows)?.length > 0 && (
              <Button variant={"outline"} className="border border-gray-300">
                Mass Option <ChevronDown />
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleDelete}>
              <div className="flex gap-2 items-center">
                <Trash2 />
                <span>Delete</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-2 pb-2">
          {importExport && (
            <>
              <Button variant="outline">
                <Download className="h-4 w-4" />
                Import
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4" />
                Export
              </Button>
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                Create
              </Button>
            </SheetTrigger>
            <SheetContent className="min-w-1/2">
              <SheetHeader>
                <SheetTitle className="flex gap-2 items-center">
                  <Edit /> Create Page
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              {createComponent}
              <SheetFooter>
                <SheetClose asChild></SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {children}
    </div>
  );
}

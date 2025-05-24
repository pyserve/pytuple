"use client";

import { Button } from "@/components/ui/button";
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
import { Download, Edit, Plus, Upload } from "lucide-react";

export function PageLayout({
  children,
  createComponent,
  importExport = false,
}: {
  children: React.ReactNode;
  createComponent: React.ReactNode;
  importExport?: boolean;
}) {
  return (
    <div className="p-2">
      <div className="flex justify-end items-center">
        <div className="flex gap-2 pb-2">
          {importExport && (
            <>
              <Button variant="outline">
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                Create New
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

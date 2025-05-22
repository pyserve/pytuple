"use client";

import { Button } from "@/components/ui/button";
import { Download, Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export function PageLayout({
  children,
  createRoute = "/create",
  importExport = false,
}: {
  children: React.ReactNode;
  createRoute?: string;
  importExport?: boolean;
}) {
  const router = useRouter();

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
          <Button onClick={() => router.push(createRoute)}>
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}

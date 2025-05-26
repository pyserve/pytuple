"use client";
import { FileUploadField } from "@/components/file-upload-field";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import api from "@/lib/api";
import {
  UploadFileSchema,
  UploadFileSchemaType,
} from "@/schemas/FileUploadSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileCode, Loader2, Trash, UploadCloud } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function FileUploadForm() {
  const { data: session } = useSession();
  const form = useForm<UploadFileSchemaType>({
    resolver: zodResolver(UploadFileSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const watchFile = form.watch("file");

  const onSubmit = async (values: UploadFileSchemaType) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    try {
      const formData = new FormData();
      formData.append("file", values.file);
      if (session?.user) {
        formData.append("user", session?.user?.id);
      }
      const res = await api.post("/uploaded_files/", formData);
      console.log("🚀 ~ onSubmit ~ res:", res);
      form.setValue("file", undefined);
      toast.success("Success!!");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error");
    }
  };

  console.log("🚀 ~ Page ~ form:", form.formState.errors);

  return (
    <div className="m-2">
      <div className="w-full mx-auto p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 flex gap-2 items-center">
          <FileCode />
          <span>Drag and drop files to upload</span>
        </h2>
        <div className="text-sm text-gray-500 py-2">
          <div className="flex flex-col">
            <div>Supported formats include PDF, DOCX, JPG, and PNG. </div>
            <div>Maximum file size: 10MB.</div>
          </div>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FileUploadField
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            {watchFile && (
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => form.setValue("file", undefined)}
                  className="w-1/2 font-bold"
                >
                  <Trash />
                  <span>Clear</span>
                </Button>
                <Button
                  className="w-1/2 font-bold"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex gap-2 items-center">
                      <Loader2 className="animate-spin" />
                      <span>Uploading...</span>
                    </span>
                  ) : (
                    <span className="flex gap-2 items-center">
                      <UploadCloud />
                      <span>Upload File</span>
                    </span>
                  )}
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

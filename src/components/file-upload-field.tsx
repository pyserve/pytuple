"use client";

import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { FileCheckIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadFieldProps {
  onChange: (files: File[]) => void;
  value?: File[];
  className?: string;
}

export function FileUploadField({
  onChange,
  value,
  className,
}: FileUploadFieldProps) {
  const [filePreviews, setFilePreviews] = useState<
    { name: string; size: number; preview?: string }[]
  >([]);

  useEffect(() => {
    if (value && value.length > 0) {
      const newPreviews = value.map((file) => {
        const info: { name: string; size: number; preview?: string } = {
          name: file.name,
          size: file.size,
        };

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFilePreviews((prev) =>
              prev.map((f) =>
                f.name === file.name
                  ? { ...f, preview: reader.result as string }
                  : f
              )
            );
          };
          reader.readAsDataURL(file);
        }

        return info;
      });

      setFilePreviews(newPreviews);
    } else {
      setFilePreviews([]);
    }
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      multiple: true,
      accept: {
        "application/json": [".json"],
        "text/csv": [".csv"],
        "application/x-hdf5": [".h5"],
        "application/octet-stream": [".npy", ".pkl", ".pt", ".pb"],
        "image/*": [".jpeg", ".png", ".gif", ".bmp", ".webp"],
        "audio/*": [".mp3", ".wav", ".ogg"],
        "video/*": [".mp4", ".mov", ".avi"],
        "text/*": [".txt"],
        "application/pdf": [".pdf"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
      },
    });

  return (
    <FormItem className={cn(className)}>
      <FormControl>
        <div className="space-y-2">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed p-20 rounded-md cursor-pointer text-center",
              "transition-colors duration-200 ease-in-out",
              filePreviews.length > 0
                ? "border-green-500 bg-green-50"
                : "border-gray-400 bg-gray-50",
              isDragActive
                ? "border-rose-400 bg-rose-50"
                : "hover:border-rose-300",
              fileRejections.length > 0 && "border-red-700 bg-red-50"
            )}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-gray-700 font-semibold">
                Drop the files here ...
              </p>
            ) : filePreviews.length > 0 ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                {filePreviews.map((file) => (
                  <div
                    key={file.name}
                    className="flex flex-col items-center justify-center border rounded p-2 w-full bg-white"
                  >
                    <FileCheckIcon className="h-6 w-6 text-green-600 mb-1" />
                    <span className="font-semibold text-gray-800">
                      {file.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    {file.preview && (
                      <img
                        src={file.preview}
                        alt="Preview"
                        className="mt-2 max-w-full h-20 object-contain rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                Drag & drop files here, or click to select files
              </p>
            )}
          </div>
          {fileRejections.length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              File not accepted. Please ensure it's a supported type and within
              size limits.
              {fileRejections.map(({ file, errors }) => (
                <span key={file.name} className="block">
                  <span className="font-semibold">{file.name}:</span>{" "}
                  {errors.map((e) => e.message).join(", ")}
                </span>
              ))}
            </p>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

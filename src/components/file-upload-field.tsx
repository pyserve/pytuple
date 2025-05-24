"use client";

import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { FileCheckIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadFieldProps {
  onChange: (file: File | null) => void;
  value?: File | null;
  className?: string;
}

export function FileUploadField({
  onChange,
  value,
  className,
}: FileUploadFieldProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setFileName(value.name);
      setFileSize(value.size);
      if (value.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(value);
      } else {
        setFilePreview(null);
      }
    } else {
      setFileName(null);
      setFileSize(null);
      setFilePreview(null);
    }
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      onChange(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      multiple: false,
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
              fileName
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
                Drop the file here ...
              </p>
            ) : fileName ? (
              <div className="flex flex-col items-center justify-center">
                <FileCheckIcon className="h-8 w-8 text-green-600 mb-2" />
                <span className="font-semibold text-gray-800">{fileName}</span>
                {fileSize && (
                  <span className="text-sm text-gray-600">
                    ({(fileSize / 1024 / 1024).toFixed(2)} MB)
                  </span>
                )}
                {filePreview && (
                  <img
                    src={filePreview}
                    alt="File preview"
                    className="mt-4 max-w-full h-24 object-contain rounded-md"
                  />
                )}
              </div>
            ) : (
              <p className="text-gray-600">
                Drag & drop a file here, or click to select a file
              </p>
            )}
          </div>
          {fileRejections.length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              {`File not accepted. Please ensure it's a supported type and within
              size limits.`}
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

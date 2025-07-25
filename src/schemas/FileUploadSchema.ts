import { z } from "zod";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

// Define types for File and Blob, with fallback for server-side
const isFile =
  typeof window !== "undefined" && "File" in window ? window.File : Object;
const isBlob =
  typeof window !== "undefined" && "Blob" in window ? window.Blob : Object;

export const UploadFileSchema = z.object({
  files: z
    .array(z.any())
    .optional()
    .refine(
      (files) =>
        !files ||
        files.every(
          (val) =>
            val instanceof isFile ||
            val instanceof isBlob ||
            typeof val === "string"
        ),
      {
        message: "All items must be valid files, blobs, or base64 strings.",
      }
    )
    .refine(
      (files) =>
        !files ||
        files.every((val) => {
          // Type guard to ensure val is File or Blob
          if (val instanceof File || val instanceof Blob) {
            return val.size <= MAX_SIZE;
          }

          if (typeof val === "string") {
            const base64Length = val.length - (val.indexOf(",") + 1);
            const sizeInBytes = Math.ceil((base64Length * 3) / 4);
            return sizeInBytes <= MAX_SIZE;
          }

          return false;
        }),
      {
        message: `Each file must be less than ${MAX_SIZE / (1024 * 1024)} MB.`,
      }
    ),
});

export type UploadFileSchemaType = z.infer<typeof UploadFileSchema>;

import { z } from "zod";

const MAX_SIZE = 10 * 1024 * 1024;
const isFile =
  typeof window !== "undefined" && "File" in window ? window.File : Object;
const isBlob =
  typeof window !== "undefined" && "Blob" in window ? window.Blob : Object;

export const UploadFileSchema = z.object({
  file: z
    .any()
    .optional()
    .nullable()
    .refine(
      (val) =>
        !val ||
        val instanceof isFile ||
        val instanceof isBlob ||
        typeof val === "string",
      {
        message: "Please upload a valid file, blob, or base64 string.",
      }
    )
    .refine(
      (val) => {
        if (!val) return true;

        if (val instanceof isFile || val instanceof isBlob) {
          return val?.size <= MAX_SIZE;
        }

        if (typeof val === "string") {
          const base64Length = val.length - (val.indexOf(",") + 1);
          const sizeInBytes = Math.ceil((base64Length * 3) / 4);
          return sizeInBytes <= MAX_SIZE;
        }

        return false;
      },
      {
        message: `File must be less than ${MAX_SIZE / (1024 * 1024)} MB.`,
      }
    ),
});

export type UploadFileSchemaType = z.infer<typeof UploadFileSchema>;

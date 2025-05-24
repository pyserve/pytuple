import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export type DataType = {
  module: string;
  query?: string;
};

export const useFetchRecords = (data: DataType) => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: [data.module],
    queryFn: async () => {
      try {
        const res = await api.get(`/${data.module.toLowerCase()}s/`);
        return res.data;
      } catch (error) {
        console.log("🚀 ~ queryFn: ~ error:", error);
        throw new Error(error instanceof Error ? error.message : "Error");
      }
    },
    enabled: !!session,
  });
};

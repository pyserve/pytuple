import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type CreateData = {
  module: string;
  data: Record<string, any>;
};

export const useCreateRecord = () => {
  return useMutation({
    mutationKey: [],
    mutationFn: async (data: CreateData) => {
      try {
        console.log("🚀 ~ mutationFn: ~ data:", data);
        const res = await api.post(`/${data.module}/`, data.data);
        console.log("🚀 ~ mutationFn: ~ res:", res);
        return res.data;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error");
      }
    },
  });
};

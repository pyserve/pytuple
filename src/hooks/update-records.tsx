import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export type MassDeleteData = {
  module: string;
  ids: string[];
};

export const useMassDelete = () =>
  useMutation({
    mutationKey: [],
    mutationFn: async (data: MassDeleteData) => {
      try {
        const res = await api.post(`/${data.module}/mass_delete/`, {
          ids: data.ids,
        });
        console.log("🚀 ~ mutationFn: ~ res:", res);
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error");
      }
    },
  });

export const useUpdateRecord = () =>
  useMutation({
    mutationKey: [],
    mutationFn: async (data: MassDeleteData) => {
      try {
        const res = await api.post(`/${data.module}/mass_delete/`, {
          ids: data.ids,
        });
        console.log("🚀 ~ mutationFn: ~ res:", res);
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error");
      }
    },
  });

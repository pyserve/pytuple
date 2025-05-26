"use client";

import api from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export type DataType = {
  module: string;
  query?: string;
};

export const useFetchRecords = (data: DataType) => {
  return useQuery({
    queryKey: [data.module],
    queryFn: async () => {
      try {
        const res = await api.get(`/${data.module}/`);
        return res.data;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error");
      }
    },
    placeholderData: keepPreviousData,
  });
};

"use client";

import api from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export type DataType = {
  module: string;
  page?: number;
  page_size?: number;
  query?: string;
};

export const useFetchRecords = (data: DataType) => {
  const { module, page, page_size } = data;
  return useQuery({
    queryKey: [module, page, page_size],
    queryFn: async () => {
      try {
        const res = await api.get(
          `/${module}/?page=${page}&page_size=${page_size}`
        );
        return res.data;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error");
      }
    },
    placeholderData: keepPreviousData,
  });
};

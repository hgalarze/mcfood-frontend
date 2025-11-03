"use client";

import useSWR from "swr";
import { searchCategories } from "@/lib/category-api";
import type { Category, SearchParams } from "@/types/category";

export function useSearchCategories(params: SearchParams) {
    const key: [string, SearchParams] = ["categories", { ...params, query: params.query ?? null as any }];

    const { data, error, isLoading, mutate, isValidating } = useSWR(key, ([, p]) => searchCategories(p), {
        revalidateOnMount: true,
        revalidateOnFocus: false,
        keepPreviousData: true,
    });

    return {
        categories: data?.items ?? ([] as Category[]),
        total: data?.total ?? 0,
        page: data?.page ?? params.page,
        pageSize: data?.pageSize ?? params.pageSize,
        pages: data?.pages ?? 1,
        error,
        isLoading,
        isValidating,
        mutate,
    };
}

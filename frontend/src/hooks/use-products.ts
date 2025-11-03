"use client";

import useSWR from "swr";
import { searchProducts } from "@/lib/product-api";
import type { Product, SearchParams } from "@/types/product";

export function useSearchProducts(params: SearchParams) {
    const key: [string, SearchParams] = ["products", { ...params, query: params.query ?? null as any }];

    const { data, error, isLoading, mutate, isValidating } = useSWR(key, ([, p]) => searchProducts(p), {
        revalidateOnMount: true,
        revalidateOnFocus: false,
        keepPreviousData: true,
    });

    return {
        products: data?.items ?? ([] as Product[]),
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

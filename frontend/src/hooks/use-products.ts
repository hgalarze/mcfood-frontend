// /hooks/use-products.ts
"use client";

import useSWR, { mutate as globalMutate } from "swr";
import { useRouter } from "next/navigation";
import {
  searchProducts,
  getHighlightedProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/product-api";
import type {
  Product,
  SearchParams,
  CreateProductData,
  UpdateProductData,
} from "@/types/product";
import { ApiError } from "@/lib/api-error";

/* -------------------------------------------------------------------------- */
/*                               Helpers & Matchers                           */
/* -------------------------------------------------------------------------- */

const buildSearchUrl = (params: SearchParams) => {
  const qs = new URLSearchParams({
    query: params.query ?? "",
    page: String(params.page ?? 1),
    pageSize: String(params.pageSize ?? 20),
    sort: params.sort ?? "",
  }).toString();
  return `/api/products/search?${qs}`;
};

const highlightedUrl = (maxItems: number) => `/api/products/highlighted/${maxItems}`;
const byCategoryUrl = (categoryId: string) => `/api/products/by-category/${categoryId}`;

const revalidateAllProducts = async () => {
  await globalMutate(
    (key) => typeof key === "string" && key.startsWith("/api/products"),
    undefined,
    { revalidate: true }
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Hooks                                    */
/* -------------------------------------------------------------------------- */

/** Search / listado paginado */
export function useSearchProducts(params: SearchParams) {
  const url = buildSearchUrl(params);
  const router = useRouter();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    async () => {
      try {
        return await searchProducts(params);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push("/login");
        throw err;
      }
    },
    { revalidateOnMount: true, revalidateOnFocus: false, keepPreviousData: true }
  );

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

/** Destacados */
export function useHighlightedProducts(maxItems: number = 3) {
  const url = highlightedUrl(maxItems);
  const router = useRouter();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    async () => {
      try {
        return await getHighlightedProducts(maxItems);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push("/login");
        throw err;
      }
    },
    { revalidateOnMount: true, revalidateOnFocus: false, keepPreviousData: true }
  );

  return {
    products: data ?? ([] as Product[]),
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

/** Por categoría (si no tienes categoryId, NO llames a este hook) */
export function useProductsByCategory(categoryId: string) {
  const url = byCategoryUrl(categoryId);
  const router = useRouter();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    async () => {
      try {
        return await getProductsByCategory(categoryId);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push("/login");
        throw err;
      }
    },
    { revalidateOnMount: true, revalidateOnFocus: false, keepPreviousData: true }
  );

  return {
    products: (data as Product[]) ?? ([] as Product[]),
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

/* -------------------------------------------------------------------------- */
/*                                 Mutaciones                                 */
/* -------------------------------------------------------------------------- */

export function useProductMutations() {
  const router = useRouter();

  const create = async (data: CreateProductData) => {
    try {
      const created = await createProduct(data);
      await revalidateAllProducts();
      return created;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) router.push("/login");
      throw err;
    }
  };

  const update = async (id: string, data: UpdateProductData) => {
    try {
      const updated = await updateProduct(id, data);
      await revalidateAllProducts();
      return updated;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) router.push("/login");
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      const res = await deleteProduct(id);
      await revalidateAllProducts();
      return res;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) router.push("/login");
      throw err;
    }
  };

  return { create, update, remove };
}

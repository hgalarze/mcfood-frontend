// /hooks/use-categories.ts
"use client";

import useSWR, { mutate as globalMutate } from "swr";
import { useRouter } from "next/navigation";
import {
  searchCategories,
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/category-api";
import type {
  Category,
  SearchParams,
  CreateCategoryData,
  UpdateCategoryData,
} from "@/types/category";
import { ApiError } from "@/lib/api-error";

/* ------------------------------ Helpers & URLs ----------------------------- */
const buildSearchUrl = (params: SearchParams) => {
  const qs = new URLSearchParams({
    query: params.query ?? "",
    page: String(params.page ?? 1),
    pageSize: String(params.pageSize ?? 20),
    sort: params.sort ?? "",
  }).toString();
  return `/api/categories/search?${qs}`;
};

const revalidateAllCategories = async () => {
  await globalMutate(
    (key) => typeof key === "string" && key.startsWith("/api/categories"),
    undefined,
    { revalidate: true }
  );
};

const allCategoriesUrl = `/api/categories`;
const categoryDetailUrl = (id: string) => `/api/categories/${id}`;


/* ----------------------------------- Hooks --------------------------------- */

/** Búsqueda / listado paginado de categorías (SÓLO hook) */
export function useSearchCategories(params: SearchParams) {
  const url = buildSearchUrl(params);
  const router = useRouter();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    async () => {
      try {
        return await searchCategories(params);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push("/login");
        throw err;
      }
    },
    { revalidateOnMount: true, revalidateOnFocus: false, keepPreviousData: true }
  );

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

/** Todas las categorías (no paginado) */
export function useAllCategories() {
  const router = useRouter();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    allCategoriesUrl,
    async () => {
      try {
        return await getCategories();
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push("/login");
        throw err;
      }
    },
    { revalidateOnMount: true, revalidateOnFocus: false, keepPreviousData: true }
  );

  return {
    categories: data ?? ([] as Category[]),
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

/** Categoría por id (si `id` es falsy, NO llames al hook desde tu componente) */
export function useCategory(id: string) {
  const url = categoryDetailUrl(id);
  const router = useRouter();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    async () => {
      try {
        return await getCategory(id);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push("/login");
        throw err;
      }
    },
    { revalidateOnMount: true, revalidateOnFocus: false, keepPreviousData: true }
  );

  return {
    category: (data as Category | null) ?? null,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

/* ------------------------------- Mutaciones ------------------------------- */

export function useCategoryMutations() {
  const router = useRouter();

  const create = async (data: CreateCategoryData) => {
    try {
      const created = await createCategory(data);
      await revalidateAllCategories();
      return created;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) router.push("/login");
      throw err;
    }
  };

  const update = async (id: string, data: UpdateCategoryData) => {
    try {
      const updated = await updateCategory(id, data);
      await revalidateAllCategories();
      return updated;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) router.push("/login");
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      const res = await deleteCategory(id);
      await revalidateAllCategories();
      return res;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) router.push("/login");
      throw err;
    }
  };

  return { create, update, remove };
}

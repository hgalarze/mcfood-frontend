import type { Category, CreateCategoryData, UpdateCategoryData, SearchParams } from "@/types/category";
import { ApiError } from "@/lib/api-error";

const API_BASE_URL = process.env.BACKEND_API_URL || ""

const json = (body?: any) => ({
    headers: { "Content-Type": "application/json" },
    credentials: "include" as RequestCredentials,
    ...(body ? { body: JSON.stringify(body) } : {}),
});

export async function searchCategories(params: SearchParams) {
    const qs = new URLSearchParams();
    if (params.query) qs.set("query", params.query);
    if (params.page) qs.set("page", String(params.page));
    if (params.pageSize) qs.set("pageSize", String(params.pageSize));
    if (params.sort) qs.set("sort", params.sort);

    const res = await fetch(`${API_BASE_URL}/api/categories/search?${qs.toString()}`, {
        credentials: "include"
    });

    if (!res.ok)
        throw new ApiError(res.status, await res.text());
    
    return res.json() as Promise<{ items: Category[]; total: number; page: number; pageSize: number; pages: number }>;
}

export async function getCategories() {
    const res = await fetch(`${API_BASE_URL}/api/categories`, {
        method: "GET",
        credentials: "include"
    });

    if (!res.ok)
        throw new ApiError(res.status, await res.text());
    
    return res.json() as Promise<Category[]>;
}

export async function getCategory(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: "GET",
        credentials: "include"
    });

    if (!res.ok)
        throw new ApiError(res.status, await res.text());
    
    return res.json() as Promise<Category>;
}

export async function createCategory(data: CreateCategoryData) {
    const res = await fetch(`${API_BASE_URL}/api/categories`, {
        method: "POST",
        ...json(data)
    });

    if (!res.ok)
        throw new ApiError(res.status, await res.text());
    
    return res.json() as Promise<Category>;
}

export async function updateCategory(id: string, data: UpdateCategoryData) {
    const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: "PUT",
        ...json(data)
    });

    if (!res.ok)
        throw new ApiError(res.status, await res.text());
    
    return res.json() as Promise<Category>;
}

export async function deleteCategory(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!res.ok)
        throw new ApiError(res.status, await res.text());
    
    return res.json();
}

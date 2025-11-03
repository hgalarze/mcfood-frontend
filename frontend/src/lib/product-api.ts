import type { Product, CreateProductData, UpdateProductData, SearchParams } from "@/types/product";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

const json = (body?: any) => ({
    headers: { "Content-Type": "application/json" },
    credentials: "include" as RequestCredentials,
    ...(body ? { body: JSON.stringify(body) } : {}),
});

export async function searchProducts(params: SearchParams) {
    const qs = new URLSearchParams();
    if (params.query) qs.set("query", params.query);
    if (params.page) qs.set("page", String(params.page));
    if (params.pageSize) qs.set("pageSize", String(params.pageSize));
    if (params.sort) qs.set("sort", params.sort);

    const res = await fetch(`${API_BASE_URL}/api/products/search?${qs.toString()}`, { credentials: "include" });
    if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
    return res.json() as Promise<{ items: Product[]; total: number; page: number; pageSize: number; pages: number }>;
}

export async function createProduct(data: CreateProductData) {
    const res = await fetch(`${API_BASE_URL}/api/products`, { method: "POST", ...json(data) });
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<Product>;
}

export async function updateProduct(id: string, data: UpdateProductData) {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, { method: "PUT", ...json(data) });
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<Product>;
}

export async function deleteProduct(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, { method: "DELETE", credentials: "include" });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export async function getHighlightedProducts(maxItems: number = 3) {
    const res = await fetch(`${API_BASE_URL}/api/products/highlighted/${maxItems}`, { method: "GET", credentials: "include" });
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<Product[]>;
}

export async function getProductsByCategory(categoryId: string) {
    const res = await fetch(`${API_BASE_URL}/api/products/by-category/${categoryId}`, { method: "GET", credentials: "include" });
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<Product[]>;
}
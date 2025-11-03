export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string | null;
    highlighted: boolean;
    category: { _id: string; name: string } | string;
    createdAt: string;
    updatedAt: string;
};

export type CreateProductData = {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string | null;
    highlighted: boolean;
    categoryId: string;
};

export type UpdateProductData = {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string | null;
    highlighted: boolean;
    categoryId: string;
};

export interface SearchParams {
    query?: string
    page?: number
    pageSize?: number
    sort?: string
}
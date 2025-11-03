export type Category = {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateCategoryData = {
    name: string;
    description: string,
    imageUrl: string
};

export type UpdateCategoryData = {
    name?: string;
    description?: string,
    imageUrl?: string
};

export interface SearchParams {
    query?: string
    page?: number
    pageSize?: number
    sort?: string
}
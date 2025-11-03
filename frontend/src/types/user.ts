export interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    createdAt: string
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface CreateUserData {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    passwordHash: string
}

export interface UpdateUserData {
    firstName: string
    lastName: string
    phone: string
    address: string
    passwordHash?: string
}

export interface SearchParams {
    query?: string
    page?: number
    pageSize?: number
    sort?: string
}
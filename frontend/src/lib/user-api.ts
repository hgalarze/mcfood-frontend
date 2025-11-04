import type { LoginCredentials, SearchParams, CreateUserData, UpdateUserData, UserInfo, LoginResponse } from "@/types/user"
import { ApiError } from "@/lib/api-error";

const API_BASE_URL = process.env.BACKEND_API_URL || ""

// Login function
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    
    const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify(credentials),
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Login failed" }))
        throw new Error(error.message || "Login failed")
    }

    return res.json();
}

// Logout function
export async function logout(): Promise<void> {
    // Clear the cookie by making a request or just reload
    document.cookie = "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

// Search users
export async function searchUsers(params: SearchParams) {
    const queryParams = new URLSearchParams()
    if (params.query) queryParams.append("query", params.query)
    if (params.page) queryParams.append("page", params.page.toString())
    if (params.pageSize) queryParams.append("pageSize", params.pageSize.toString())
    if (params.sort) queryParams.append("sort", params.sort)

    const res = await fetch(`${API_BASE_URL}/api/users/search?${queryParams}`, {
        credentials: "include",
    })

    if (!res.ok) {
        throw new ApiError(res.status, await res.text());
    }

    return res.json()
}

// Get all users
export async function getUsers() {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
        credentials: "include",
    })

    if (!res.ok) {
        throw new ApiError(res.status, await res.text());
    }

    return res.json()
}

// Get user by ID
export async function getUserById(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        credentials: "include",
    })

    if (!res.ok) {
        throw new ApiError(res.status, await res.text());
    }

    return res.json()
}

// Create user
export async function createUser(data: CreateUserData) {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        throw new ApiError(res.status, await res.text());
    }

    return res.json()
}

// Update user (PATCH for partial update)
export async function updateUser(id: string, data: UpdateUserData) {
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        throw new ApiError(res.status, await res.text());
    }

    return res.json()
}

// Delete user
export async function deleteUser(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
    })

    if (!res.ok) {
        throw new ApiError(res.status, await res.text());
    }

    return res.json()
}

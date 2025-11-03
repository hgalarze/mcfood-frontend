import type { LoginCredentials, SearchParams, CreateUserData, UpdateUserData } from "@/types/user"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

// Login function
export async function login(credentials: LoginCredentials): Promise<void> {
    
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify(credentials),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Login failed" }))
        throw new Error(error.message || "Login failed")
    }
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

    const response = await fetch(`${API_BASE_URL}/api/users/search?${queryParams}`, {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Failed to search users")
    }

    return response.json()
}

// Get all users
export async function getUsers() {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Failed to fetch users")
    }

    return response.json()
}

// Get user by ID
export async function getUserById(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Failed to fetch user")
    }

    return response.json()
}

// Create user
export async function createUser(data: CreateUserData) {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Failed to create user" }))
        throw new Error(error.message || "Failed to create user")
    }

    return response.json()
}

// Update user (PATCH for partial update)
export async function updateUser(id: string, data: UpdateUserData) {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Failed to update user" }))
        throw new Error(error.message || "Failed to update user")
    }

    return response.json()
}

// Delete user
export async function deleteUser(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Failed to delete user")
    }

    return response.json()
}

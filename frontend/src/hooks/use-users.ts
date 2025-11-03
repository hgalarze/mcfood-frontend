import useSWR from "swr"
import { getUsers, searchUsers } from "@/lib/user-api"
import { SearchParams } from "@/types/user"

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR("/api/users", getUsers, {
    revalidateOnFocus: false,
  })

  return {
    users: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useSearchUsers(params: SearchParams) {
  // Create a stable key for SWR caching
  const key = JSON.stringify({ endpoint: "/api/users/search", ...params })

  const { data, error, isLoading, mutate } = useSWR(key, () => searchUsers(params), {
    revalidateOnFocus: false,
    keepPreviousData: true, // Keep previous data while loading new data
  })

  return {
    users: data?.items || [],
    total: data?.total || 0,
    page: data?.page || 1,
    pageSize: data?.pageSize || 10,
    isLoading,
    isError: error,
    mutate,
  }
}

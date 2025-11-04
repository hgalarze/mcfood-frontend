// /hooks/use-users.ts
"use client";

import useSWR, { mutate as globalMutate } from "swr";
import { useRouter } from "next/navigation";

import {
  login as _login,
  logout as _logout,
  searchUsers as _searchUsers,
  getUsers as _getUsers,
  getUserById as _getUserById,
  createUser as _createUser,
  updateUser as _updateUser,
  deleteUser as _deleteUser,
} from "@/lib/user-api";

import type { SearchParams, CreateUserData, UpdateUserData } from "@/types/user";
import { ApiError } from "@/lib/api-error";

/* ------------------------------------------------------------- */
/*                       Helpers & matchers                      */
/* ------------------------------------------------------------- */

const buildSearchUrl = (params: SearchParams) =>
  `/api/users/search?${new URLSearchParams({
    query: params.query ?? "",
    page: String(params.page ?? 1),
    pageSize: String(params.pageSize ?? 20),
    sort: params.sort ?? "",
  }).toString()}`;

const allUsersUrl = `/api/users`;
const userDetailUrl = (id: string) => `/api/users/${id}`;

/** Revalida todas las keys SWR que empiecen con `/api/users` */
const revalidateAllUsers = async () => {
  await globalMutate(
    (key) => typeof key === "string" && key.startsWith("/api/users"),
    undefined,
    { revalidate: true }
  );
};

/* ------------------------------------------------------------- */
/*                SEARCH / LIST / DETAIL HOOKS                   */
/* ------------------------------------------------------------- */

/** Búsqueda paginada */
export function useSearchUsers(params: SearchParams) {
  const url = buildSearchUrl(params);
  const router = useRouter();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    async () => {
      try {
        return await _searchUsers(params);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push("/login");
        throw err;
      }
    },
    { revalidateOnMount: true, revalidateOnFocus: false, keepPreviousData: true }
  );

  return {
    users: data?.items ?? [],
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

/** Lista completa sin paginar */
export function useAllUsers() {
  const router = useRouter();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    allUsersUrl,
    async () => {
      try {
        return await _getUsers();
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push("/login");
        throw err;
      }
    },
    { revalidateOnMount: true, revalidateOnFocus: false, keepPreviousData: true }
  );

  return { users: data ?? [], error, isLoading, isValidating, mutate };
}

/** Un usuario por id (no llames a este hook si no tienes id) */
export function useUser(id: string) {
  const url = userDetailUrl(id);
  const router = useRouter();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    async () => {
      try {
        return await _getUserById(id);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) router.push("/login");
        throw err;
      }
    },
    { revalidateOnMount: true, revalidateOnFocus: false, keepPreviousData: true }
  );

  return { user: data ?? null, error, isLoading, isValidating, mutate };
}

/* ------------------------------------------------------------- */
/*                         MUTATIONS                             */
/* ------------------------------------------------------------- */

export function useUserMutations() {
  const router = useRouter();

  const create = async (data: CreateUserData) => {
    try {
      const created = await _createUser(data);
      await revalidateAllUsers();
      return created;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) router.push("/login");
      throw err;
    }
  };

  const update = async (id: string, data: UpdateUserData) => {
    try {
      const updated = await _updateUser(id, data);
      await revalidateAllUsers();
      return updated;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) router.push("/login");
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      const res = await _deleteUser(id);
      await revalidateAllUsers();
      return res;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) router.push("/login");
      throw err;
    }
  };

  return { create, update, remove };
}

/* ------------------------------------------------------------- */
/*                     Auth actions (opcional)                   */
/* ------------------------------------------------------------- */

export function useAuthActions() {
  const router = useRouter();

  /**
   * login: deja que el componente maneje el error 401 (credenciales inválidas)
   * y NO redirige automáticamente, para no hacer loop si ya estás en /login.
   */
  const login = async (email: string, password: string) => {
    return _login({email, password}); // que el caller decida si redirige tras éxito
  };

  /**
   * logout: si el backend cierra sesión correctamente, te llevo a /login.
   * Si responde 401 (ya expirado), también te llevo a /login.
   */
  const logout = async () => {
    try {
      await _logout();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        // sesión ya inválida: seguimos al login igualmente
      } else {
        throw err;
      }
    }
    router.push("/login");
  };

  return { login, logout };
}

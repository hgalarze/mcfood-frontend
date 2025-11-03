"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UsersTable } from "@/components/admin/users/users-table"
import { UserFormModal } from "@/components/admin/users/user-form-modal"
import { UserViewModal } from "@/components/admin/users/user-view-modal"
import { Plus, Search } from "lucide-react"
import type { User } from "@/types/user"
import { useSearchUsers } from "@/hooks/use-users"
import type { CreateUserData, UpdateUserData } from "@/types/user"
import { createUser, updateUser, deleteUser } from "@/lib/user-api"
import { useToast } from "@/hooks/use-toast"
import { useDebounce } from "@/hooks/use-debounce"

export function UsersManagement() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const itemsPerPage = 5

  // Debounce para búsqueda
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  // Cuando cambia el término de búsqueda (debounced), volvemos a la página 1
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery])

  const { users, total, isLoading, mutate } = useSearchUsers({
    // email undefined => **carga inicial** sin filtro
    query: debouncedSearchQuery?.trim() ? debouncedSearchQuery.trim() : undefined,
    page: currentPage,
    pageSize: itemsPerPage,
    sort: "lastName:asc",
  })

  const totalPages = useMemo(() => Math.max(1, Math.ceil((total ?? 0) / itemsPerPage)), [total])

  const handleCreateUser = async (userData: CreateUserData) => {
    try {
      await createUser(userData)
      setIsCreateModalOpen(false)
      setCurrentPage(1)
      await mutate() // Revalida la lista
      toast({ title: "Success", description: "User created successfully" })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create user",
        variant: "destructive",
      })
    }
  }

  const handleEditUser = async (userData: UpdateUserData) => {
    if (!selectedUser) return
    try {
      await updateUser(selectedUser._id, userData)
      setIsEditModalOpen(false)
      setSelectedUser(null)
      await mutate()
      toast({ title: "Success", description: "User updated successfully" })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    try {
      await deleteUser(userId)
      // Si borramos el último de la página, retrocedemos de página antes de revalidar
      if (users.length === 1 && currentPage > 1) setCurrentPage((p) => p - 1)
      await mutate()
      toast({ title: "Success", description: "User deleted successfully" })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsViewModalOpen(true)
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  if (isLoading && users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" />
          <p className="mt-4 text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <>


      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage your application users and their information</p>
        </div>
      </div>

      {/* Search and Create */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create User
        </Button>
      </div>

      {/* Users Table */}
      <UsersTable
        users={users}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onView={handleViewUser}
        onEdit={handleEditClick}
        onDelete={handleDeleteUser}
      />

      {/* Modals */}
      <UserFormModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreateUser}
        title="Create New User"
        submitLabel="Create User"
      />

      <UserFormModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleEditUser}
        title="Edit User"
        submitLabel="Save Changes"
        initialData={selectedUser || undefined}
        isEdit
      />

      <UserViewModal open={isViewModalOpen} onOpenChange={setIsViewModalOpen} user={selectedUser} />
    </>
  )
}

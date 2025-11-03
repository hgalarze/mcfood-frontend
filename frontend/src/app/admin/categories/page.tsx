"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchCategories } from "@/hooks/use-categories";
import { CategoriesTable } from "@/components/admin/categories/categories-table";
import { CategoryFormModal } from "@/components/admin/categories/category-form-modal";
import { CategoryViewModal } from "@/components/admin/categories/category-view-modal";
import { createCategory, updateCategory, deleteCategory } from "@/lib/category-api";
import type { Category, CreateCategoryData, UpdateCategoryData } from "@/types/category";

export default function CategoriesPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);

  const itemsPerPage = 5;
  const debounced = useDebounce(searchQuery, 500);

  useEffect(() => setCurrentPage(1), [debounced]);

  const { categories, total, isLoading, mutate } = useSearchCategories({
    query: debounced?.trim() || undefined,
    page: currentPage,
    pageSize: itemsPerPage,
    sort: "name:asc",
  });

  const totalPages = useMemo(() => Math.max(1, Math.ceil((total ?? 0) / itemsPerPage)), [total]);

  const handleCreate = async (data: CreateCategoryData) => {
    try {
      await createCategory({ name: data.name, description: data.description, imageUrl: data.imageUrl });
      setIsCreateModalOpen(false);
      setCurrentPage(1);
      await mutate();
      toast({ title: "Success", description: "Category created" });
    } catch (e: any) {
      toast({ title: "Error", description: e?.message ?? "Failed to create category", variant: "destructive" });
    }
  };

  const handleEdit = async (data: UpdateCategoryData) => {
    if (!selected) return;
    try {
      await updateCategory(selected._id, data);
      setIsEditModalOpen(false);
      setSelected(null);
      await mutate();
      toast({ title: "Success", description: "Category updated" });
    } catch (e: any) {
      toast({ title: "Error", description: e?.message ?? "Failed to update category", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      await deleteCategory(id);
      if (categories.length === 1 && currentPage > 1) setCurrentPage((p) => p - 1);
      await mutate();
      toast({ title: "Success", description: "Category deleted" });
    } catch (e: any) {
      toast({ title: "Error", description: e?.message ?? "Failed to delete category", variant: "destructive" });
    }
  };

  const handleView = (c: Category) => { setSelected(c); setIsViewModalOpen(true); };
  const handleEditClick = (c: Category) => { setSelected(c); setIsEditModalOpen(true); };

  if (isLoading && categories.length === 0) {
    return (
      <div className="min-h-[40vh] grid place-items-center text-muted-foreground">Loading categories…</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Category Management</h1>
          <p className="text-muted-foreground">Create, edit and manage your product categories</p>
        </div>
      </div>

      {/* Search + Create */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories by name or description…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Category
        </Button>
      </div>

      <CategoriesTable
        categories={categories}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onView={handleView}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      <CategoryFormModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreate}
        title="Create Category"
        submitLabel="Create"
      />

      <CategoryFormModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleEdit}
        title="Edit Category"
        submitLabel="Save"
        initialData={selected ?? undefined}
      />

      <CategoryViewModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        category={selected}
      />
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import {
  useSearchProducts,
  useProductMutations,
} from "@/hooks/use-products";
import { useAllCategories } from "@/hooks/use-categories";
import { ProductsTable } from "@/components/admin/products/products-table";
import { ProductFormModal } from "@/components/admin/products/product-form-modal";
import { ProductViewModal } from "@/components/admin/products/product-view-modal";

import type { Product, CreateProductData, UpdateProductData } from "@/types/product";

export function ProductsManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const itemsPerPage = 5;
  const debounced = useDebounce(searchQuery, 500);

  // reset de página al cambiar el término
  useEffect(() => setCurrentPage(1), [debounced]);

  // Productos (search paginado)
  const { products, total, isLoading, mutate } = useSearchProducts({
    query: debounced?.trim() || undefined,
    page: currentPage,
    pageSize: itemsPerPage,
    sort: "name:asc",
  });

  const { create, update, remove } = useProductMutations();

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((total ?? 0) / itemsPerPage)),
    [total, itemsPerPage]
  );

  // Categorías (todas)
  const { categories, error: catError } = useAllCategories();
  useEffect(() => {
    if (catError) {
      toast({
        title: "Error",
        description: catError?.message ?? "Failed to fetch categories",
        variant: "destructive",
      });
    }
  }, [catError, toast]);

  /* ------------------------------ Handlers CRUD ------------------------------ */

  const handleCreate = async (data: CreateProductData) => {
    try {
      await create({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl,
        highlighted: data.highlighted,
        categoryId: data.categoryId,
      });
      setIsCreateModalOpen(false);
      setCurrentPage(1);
      // opcional: await mutate();  // no necesario, ya revalida globalmente
      toast({ title: "Success", description: "Product created" });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message ?? "Failed to create product",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (data: UpdateProductData) => {
    if (!selected) return;
    try {
      await update(selected._id, data);
      setIsEditModalOpen(false);
      setSelected(null);
      // opcional: await mutate();
      toast({ title: "Success", description: "Product updated" });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message ?? "Failed to update product",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      // si eliminas el único elemento de la página, retrocede una página
      if (products.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
      await remove(id);
      toast({ title: "Success", description: "Product deleted" });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message ?? "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const handleView = (p: Product) => {
    setSelected(p);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (p: Product) => {
    setSelected(p);
    setIsEditModalOpen(true);
  };

  /* --------------------------------- UI --------------------------------- */

  if (isLoading && products.length === 0) {
    return (
      <div className="min-h-[40vh] grid place-items-center text-muted-foreground">
        Loading products…
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Product Management</h1>
          <p className="text-muted-foreground">Create, edit and manage your products</p>
        </div>
      </div>

      {/* Search + Create */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products by name or description…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>

      <ProductsTable
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onView={handleView}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      {/* Create */}
      <ProductFormModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreate}
        title="Create Product"
        submitLabel="Create"
        isEdit={true}
        categories={categories ?? []}
      />

      {/* Edit */}
      <ProductFormModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleEdit}
        title="Edit Product"
        submitLabel="Save"
        initialData={selected ?? undefined}
        isEdit={true}
        categories={categories ?? []}
      />

      {/* View */}
      <ProductViewModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        product={selected}
        categories={categories ?? []}
      />
    </div>
  );
}

"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import type { Product, CreateProductData, UpdateProductData } from "@/types/product";
import { Category } from "@/types/category";


interface ProductFormModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: CreateProductData | UpdateProductData) => Promise<void>
    title: string
    submitLabel: string
    initialData?: Product
    isEdit?: boolean,
    categories: Category[]
}

export function ProductFormModal({ open, onOpenChange, onSubmit, title, submitLabel, initialData, isEdit, categories }: ProductFormModalProps) {

    const [productFormData, setProductFormData] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        imageUrl: "",
        highlighted: false,
        categoryId: '',
    });

    useEffect(() => {
        if (initialData) {
            setProductFormData({
                name: initialData.name,
                description: initialData.description,
                price: initialData.price,
                stock: initialData.stock,
                imageUrl: initialData.imageUrl ?? '',
                highlighted: initialData.highlighted,
                categoryId: initialData.category as string,
            });
        } else {
            setProductFormData({
                name: "",
                description: "",
                price: 0,
                stock: 0,
                imageUrl: "",
                highlighted: false,
                categoryId: '',
            });
        }
    }, [initialData, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(productFormData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update the product information below."
                            : "Fill in the information below to create a new product."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={productFormData.name}
                                onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                                // disabled={isSubmitting}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="numeric"
                                value={productFormData.price}
                                onChange={(e) => setProductFormData({ ...productFormData, price: Number(e.target.value || '0') })}
                                // disabled={isSubmitting}
                                min={0}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                id="stock"
                                type="numeric"
                                value={productFormData.stock}
                                onChange={(e) => setProductFormData({ ...productFormData, stock: Number(e.target.value || '0') })}
                                // disabled={isEdit || isSubmitting}
                                min={0}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="highlighted">Highlighted</Label>
                            <Checkbox
                                id="highlighted"
                                checked={productFormData.highlighted}
                                onCheckedChange={(e) => setProductFormData({ ...productFormData, highlighted: e as boolean })}
                                // disabled={isSubmitting}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                disabled={!isEdit}
                                onValueChange={(e) => setProductFormData({ ...productFormData, categoryId: e })}
                                value={productFormData.categoryId}
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="imageUrl">Image</Label>
                            <Input
                                id="imageUrl"
                                type="text"
                                value={productFormData.imageUrl}
                                onChange={(e) => setProductFormData({ ...productFormData, imageUrl: e.target.value })}
                                // disabled={isSubmitting}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                rows={5}
                                value={productFormData.description}
                                onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                            // disabled={isSubmitting}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {/* {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
                            {submitLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
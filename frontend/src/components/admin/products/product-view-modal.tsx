"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@/components/ui/dialog";
import type { Product } from "@/types/product";
import { formatDate } from "@/lib/utils";
import { Category } from "@/types/category";

export function ProductViewModal({
    open,
    onOpenChange,
    product,
    categories
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    product: Product | null;
    categories?: Category[];
}) {
    const productCategory = categories?.find(cat => cat._id === product?.category);

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Product Details</DialogTitle>
                    <DialogDescription>View complete information for this product</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label className="text-muted-foreground">Name</Label>
                        <p className="text-foreground font-medium">
                            {product?.name || ''}
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-muted-foreground">Price</Label>
                        <p className="text-foreground">${product?.price || ''}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-muted-foreground">Stock</Label>
                        <p className="text-foreground">{product?.stock || ''}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-muted-foreground">Highlighted</Label>
                        <p className="text-foreground">{product?.highlighted ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-muted-foreground">Category</Label>
                        <p className="text-foreground">{productCategory?.name}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-muted-foreground">Created Date</Label>
                        <p className="text-foreground">{formatDate(product?.createdAt)}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-muted-foreground">Updated Date</Label>
                        <p className="text-foreground">{formatDate(product?.updatedAt)}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-muted-foreground">Description</Label>
                        <p className="text-foreground">{product?.description || ''}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
}
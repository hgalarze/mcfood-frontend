"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import type { Category } from "@/types/category";

export function CategoryViewModal({
    open,
    onOpenChange,
    category,
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    category: Category | null;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Category details</DialogTitle>
                </DialogHeader>
                {category ? (
                    <div className="space-y-1">
                        <div><span className="text-muted-foreground">Name:</span> {category.name}</div>
                        <div><span className="text-muted-foreground">Image URL:</span> {category.imageUrl}</div>
                        <div><span className="text-muted-foreground">Description:</span> {category.description}</div>
                        <div className="text-sm text-muted-foreground">Created: {formatDate(category.createdAt)}</div>
                    </div>
                ) : (
                    <div className="text-muted-foreground">No data</div>
                )}
            </DialogContent>
        </Dialog>
    );
}
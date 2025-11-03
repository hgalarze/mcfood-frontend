"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/types/product";
import { formatDate } from "@/lib/utils";

export function ProductsTable(props: {
    products: Product[];
    currentPage: number;
    totalPages: number;
    onPageChange: (p: number) => void;
    onView: (c: Product) => void;
    onEdit: (c: Product) => void;
    onDelete: (id: string) => void;
}) {
    const { products, currentPage, totalPages, onPageChange, onView, onEdit, onDelete } = props;

    return (
        <div className="space-y-4">
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((c) => (
                            <TableRow key={c._id}>
                                <TableCell className="font-medium">{c.name}</TableCell>
                                <TableCell className="max-w-[420px] truncate text-muted-foreground">{c.description}</TableCell>
                                <TableCell className="text-muted-foreground">{formatDate(c.createdAt)}</TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => onView(c)} title="View">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => onEdit(c)} title="Edit">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => onDelete(c._id)} title="Delete">
                                        <Trash2 className="h-4 w-4 text-destructive hover:text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-2">
                <Button variant="outline" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
                    Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {Math.max(1, totalPages)}
                </span>
                <Button
                    variant="outline"
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
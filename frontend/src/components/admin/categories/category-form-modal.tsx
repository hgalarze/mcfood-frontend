"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import type { Category } from "@/types/category";

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    onSubmit: (data: { name: string; description: string, imageUrl: string }) => Promise<void> | void;
    title: string;
    submitLabel: string;
    initialData?: Category | undefined;
};

export function CategoryFormModal({ open, onOpenChange, onSubmit, title, submitLabel, initialData }: Props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        setName(initialData?.name ?? "");
        setDescription(initialData?.description ?? "");
        setImageUrl(initialData?.imageUrl ?? "");
    }, [initialData, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ name, description, imageUrl });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={30} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="imageUrl">Image</Label>
                        <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required maxLength={100} />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">{submitLabel}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
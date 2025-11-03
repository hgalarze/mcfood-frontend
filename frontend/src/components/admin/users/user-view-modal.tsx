"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import type { User } from "@/types/user"

interface UserViewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
}

export function UserViewModal({ open, onOpenChange, user }: UserViewModalProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>View complete information for this user</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label className="text-muted-foreground">Full Name</Label>
            <p className="text-foreground font-medium">
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="grid gap-2">
            <Label className="text-muted-foreground">Email</Label>
            <p className="text-foreground">{user.email}</p>
          </div>
          <div className="grid gap-2">
            <Label className="text-muted-foreground">Phone</Label>
            <p className="text-foreground">{user.phone}</p>
          </div>
          <div className="grid gap-2">
            <Label className="text-muted-foreground">Address</Label>
            <p className="text-foreground">{user.address}</p>
          </div>
          <div className="grid gap-2">
            <Label className="text-muted-foreground">Created Date</Label>
            <p className="text-foreground">{user.createdAt}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

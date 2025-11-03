"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminSidebar } from "./admin-sidebar";
import { logout } from "@/lib/user-api";

export function AdminTopbar() {

	const router = useRouter();

	const getAuthUser = () => {
		// This is a placeholder. Replace with actual user fetching logic.
		return { email: "admin@mcfood.com" };
	}

	const handleLogout = async () => {
		await logout();
		router.push("/login");
	}

	return (
		<header className="border-b bg-background">
			<div className="mx-auto px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="md:hidden"
							>
								Menú
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="p-0">
							<AdminSidebar />
						</SheetContent>
					</Sheet>
					<Link href="/admin/categories" className="font-bold">
						McFood Admin
					</Link>
				</div>
				<div className="flex gap-2 items-center text-sm text-muted-foreground">
					{getAuthUser().email}
					<Button variant="outline" onClick={handleLogout} size="sm">
						<LogOut className="h-4 w-4 mr-2" />
						Logout
					</Button>
				</div>
			</div>
		</header>
	);
}

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"
import "@/app/globals.css"

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen grid grid-rows-[auto_1fr]">
			<AdminTopbar />
			<div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
				<aside className="hidden md:block border-r">
					<AdminSidebar />
				</aside>
				<main className="p-4 md:p-6">{children}</main>
			</div>
		</div>
	);
}

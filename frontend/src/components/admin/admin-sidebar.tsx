"use client";

import Link from "next/link";

const items = [
	// { href: "/admin", label: "Dashboard" },
	{ href: "/admin/categories", label: "Categorías" },
	{ href: "/admin/products", label: "Productos" },
	{ href: "/admin/users", label: "Usuarios" },
	// { href: "/admin/profile", label: "Perfil" },
];

export function AdminSidebar() {
	return (
		<nav className="p-4 space-y-1">
			{items.map((i) => (
				<Link
					key={i.href}
					href={i.href}
					className="block rounded-lg px-3 py-2 hover:bg-muted"
				>
					{i.label}
				</Link>
			))}
		</nav>
	);
}

"use client";
import Link from "next/link";
import Image from "next/image";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
			<div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<Image
						src="/logo.svg"
						alt="McFood"
						width={32}
						height={32}
					/>
					<span className="font-bold text-lg">McFood</span>
				</Link>

				<NavigationMenu>
					<NavigationMenuList className="hidden md:flex gap-2">
						<NavigationMenuItem>
							<Link
								href="/"
								className="px-3 py-2 rounded-lg hover:bg-muted"
							>
								Inicio
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link
								href="/menu"
								className="px-3 py-2 rounded-lg hover:bg-muted"
							>
								Menú
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link
								href="/about"
								className="px-3 py-2 rounded-lg hover:bg-muted"
							>
								Nosotros
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link
								href="/contact"
								className="px-3 py-2 rounded-lg hover:bg-muted"
							>
								Contacto
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<div className="flex items-center gap-2">
					<Link href="/login">
						<Button size="sm" variant="outline">
							Acceder
						</Button>
					</Link>
					{/* <Link href="/menu">
						<Button size="sm">Pedir ahora</Button>
					</Link> */}
				</div>
			</div>
		</header>
	);
}

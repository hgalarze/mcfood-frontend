import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
	title: "MacFood",
	description: "McFood - Comida rápida y rica",
};

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SiteHeader />
			<main className="flex-1">{children}</main>
			<SiteFooter />
		</>
	);
}

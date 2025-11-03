import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsFont = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "MacFood",
	description: "McFood - Comida rápida y rica",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${poppinsFont.variable} min-h-screen flex flex-col bg-background text-foreground antialiased`}
			>
				{children}
			</body>
		</html>
	);
}

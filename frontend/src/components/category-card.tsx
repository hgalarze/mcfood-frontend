import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getPlaceholderImageUrl } from "@/lib/utils";

type Props = { id: string, slug: string; name: string; image?: string | null };

export function CategoryCard({ id, slug, name, image }: Props) {
	return (
		<Link href={{ pathname: `/menu/${slug}`, query: { id} }}>
			<Card className="overflow-hidden hover:shadow-lg transition">
				<div className="relative h-40 w-full">
					<Image
						src={image || getPlaceholderImageUrl(name, 400, 160)}
						alt={name}
						fill
						className="object-cover"
						unoptimized={!image}
					/>
				</div>
				<CardContent className="p-3 text-center font-semibold">
					{name}
				</CardContent>
			</Card>
		</Link>
	);
}

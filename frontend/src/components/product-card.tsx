import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { getPlaceholderImageUrl } from "@/lib/utils";

type Props = { name: string; price: number; image?: string | null };

export function ProductCard({ name, price, image }: Props) {
	return (
		<Card className="overflow-hidden hover:shadow-lg transition">
			<div className="relative h-40 w-full">
				<Image
					src={image || getPlaceholderImageUrl(name, 400, 160)}
					alt={name}
					fill className="object-cover"
					unoptimized={!image}
				/>
				<div className="absolute left-2 top-2">
					<Badge className="text-base">${price.toFixed(2)}</Badge>
				</div>
			</div>
			<CardContent className="p-3 flex items-center justify-between gap-2">
				<div className="font-semibold truncate">{name}</div>
				{/* <Button size="sm">Agregar</Button> */}
			</CardContent>
		</Card>
	);
}

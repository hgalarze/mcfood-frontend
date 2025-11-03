import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { getHighlightedProducts } from "@/lib/product-api";


export default async function HomePage() {
	
	const highlightedProducts = await getHighlightedProducts();
	
	return (
		<>
			<PageHero
				title="Bienvenido a McFood"
				subtitle="Comida rica, rápida y siempre fresca"
			/>
			<section className="mx-auto max-w-7xl px-4 py-10">
				<h2 className="text-2xl font-bold mb-6">Destacados</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{highlightedProducts.map((p) => (
						<ProductCard
							key={p._id}
							name={p.name}
							price={p.price}
							image={p.imageUrl}
						/>
					))}
				</div>
			</section>
		</>
	);
}

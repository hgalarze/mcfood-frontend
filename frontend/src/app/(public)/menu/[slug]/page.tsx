import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { getCategory } from "@/lib/category-api";
import { getProductsByCategory } from "@/lib/product-api";
import { getPlaceholderImageUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id: string }>;
};

export default async function CategoryPage({ params, searchParams }: PageProps) {
	
	const { id } = await searchParams;
	
	console.log("CategoryPage params:", await params);
	console.log("CategoryPage searchParams:", await searchParams);

	const category = await getCategory(id);
	const products = await getProductsByCategory(id);

	return (
		<>
			<PageHero
				title={category.name}
				subtitle="Elige tu favorito"
				imageUrl={category.imageUrl || getPlaceholderImageUrl(category.name, 1920, 400)}
			/>
			<section className="mx-auto max-w-7xl px-4 py-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{products.map((p) => (
						<ProductCard
							key={p._id}
							name={p.name}
							price={p.price}
							image={p.imageUrl || getPlaceholderImageUrl(p.name)}
						/>
					))}
				</div>
			</section>
		</>
	);
}

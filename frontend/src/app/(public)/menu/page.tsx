import { PageHero } from "@/components/page-hero";
import { CategoryCard } from "@/components/category-card";
import { getCategories } from "@/lib/category-api";
import { Category } from "@/types/category";


export default async function MenuPage() {

	const categories: Category[] = await getCategories();
	
	return (
		<>
			<PageHero title="Nuestro Menú" subtitle="Elige una categoría" />
			<section className="mx-auto max-w-7xl px-4 py-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{categories.map((c) => (
						<CategoryCard
							key={c._id}
							slug={c.name}
							id={c._id}
							name={c.name}
							image={c.imageUrl}
						/>
					))}
				</div>
			</section>
		</>
	);
}

import Image from "next/image";
import { PageHero } from "@/components/page-hero";

export default function AboutPage() {
	return (
		<>
			<PageHero
				title="Nuestra Historia"
				subtitle="Desde 2024 sirviendo calidad y sabor"
			/>
			<section className="mx-auto max-w-3xl px-4 py-10 space-y-6">
				<p>
					En McFood, creemos que la comida rápida también puede ser de
					calidad. Nacimos con la idea de ofrecer productos frescos,
					sabrosos y a un precio justo. Crecemos cada día gracias a tu
					confianza.
				</p>
				<div className="relative h-64 w-full rounded-2xl overflow-hidden">
					<Image
						src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
						alt="Nuestra cocina"
						fill
						className="object-cover"
					/>
				</div>
			</section>
		</>
	);
}

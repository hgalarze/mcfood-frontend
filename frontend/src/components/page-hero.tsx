import { getPlaceholderImageUrl } from "@/lib/utils";
import { get } from "http";
import Image from "next/image";

type Props = { title: string; subtitle?: string; imageUrl?: string };

export function PageHero({ title, subtitle, imageUrl }: Props) {
	return (
		<section className="relative h-[220px] md:h-[320px] w-full overflow-hidden">
			<Image
				src={
					imageUrl || getPlaceholderImageUrl(title, 1920, 400)
				}
				alt="Hero"
				fill
				priority
				className="object-cover"
				unoptimized={!!imageUrl}
			/>
			<div className="absolute inset-0 bg-black/45" />
			<div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
				<h1 className="text-3xl md:text-5xl font-extrabold drop-shadow">
					{title}
				</h1>
				{subtitle && (
					<p className="mt-2 max-w-2xl text-white/90">{subtitle}</p>
				)}
			</div>
		</section>
	);
}

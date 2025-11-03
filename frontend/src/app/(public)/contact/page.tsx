"use client";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function ContactPage() {
	const [sent, setSent] = useState(false);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// TODO: enviar a API (form action/server action)
		setSent(true);
	}

	return (
		<>
			<PageHero title="Contacto" subtitle="¿En qué podemos ayudarte?" />
			<section className="mx-auto max-w-3xl px-4 py-10">
				{sent ? (
					<div className="rounded-lg bg-green-50 p-4 text-green-800">
						¡Gracias! Te responderemos pronto.
					</div>
				) : (
					<form className="space-y-4" onSubmit={onSubmit}>
						<div>
							<Label htmlFor="name">Nombre</Label>
							<Input
								id="name"
								name="name"
								required
								placeholder="Tu nombre"
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									required
									placeholder="tu@email.com"
								/>
							</div>
							<div>
								<Label htmlFor="phone">Teléfono</Label>
								<Input
									id="phone"
									name="phone"
									type="tel"
									placeholder="+34 600 000 000"
								/>
							</div>
						</div>
						<div>
							<Label>Motivo</Label>
							<Select name="reason" defaultValue="pedido">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona un motivo" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="pedido">
										Consulta de pedido
									</SelectItem>
									<SelectItem value="sugerencia">
										Sugerencia
									</SelectItem>
									<SelectItem value="reclamo">
										Reclamo
									</SelectItem>
									<SelectItem value="otro">Otro</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label htmlFor="message">Comentario</Label>
							<Textarea
								id="message"
								name="message"
								rows={5}
								placeholder="Cuéntanos más..."
							/>
						</div>
						<Button type="submit" className="w-full md:w-auto">
							Enviar
						</Button>
					</form>
				)}
			</section>
		</>
	);
}

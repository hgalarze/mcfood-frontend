export function SiteFooter() {
	return (
		<footer className="border-t">
			<div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-muted-foreground">
				© {new Date().getFullYear()} McFood. Todos los derechos reservados.
			</div>
		</footer>
	);
}

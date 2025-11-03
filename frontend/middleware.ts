import { NextResponse, NextRequest } from 'next/server';

const ADMIN_PREFIX = '/admin';

const SECRET = new TextEncoder().encode(process.env.API_TOKEN_SECRET);

async function verifyJWT(token: string) {
	try {
		const { payload } = await jwtVerify(token, SECRET);
		return payload
	} catch {
		return null;
	}
}

export async function middleware(req: NextRequest) {
	const { pathname, search } = req.nextUrl;

	// Sólo protegemos /admin (y subrutas)
	if (!pathname.startsWith(ADMIN_PREFIX)) {
		return NextResponse.next();
	}

	const token = req.cookies.get('authtoken')?.value;

	if (!token) {
		// No autenticado -> a login con redirectTo
		const url = req.nextUrl.clone();
		url.pathname = '/login';
		url.search = `?redirectTo=${encodeURIComponent(pathname + search)}`;
		return NextResponse.redirect(url);
	}

	// Opcional pero recomendado: validar firma/exp/nbf, etc.
	const payload = await verifyJWT(token);
	
	if (!payload) {
		const url = req.nextUrl.clone();
		url.pathname = '/login';
		url.search = `?redirectTo=${encodeURIComponent(pathname + search)}`;
		return NextResponse.redirect(url);
	}

	// (Opcional) Chequeo de rol para /admin
	// Si en tu JWT pones claim role = 'admin'
	if (payload.role !== 'admin') {
		// 403 o redirigir; aquí redirigimos a una página de acceso denegado
		const url = req.nextUrl.clone();
		url.pathname = '/403';
		return NextResponse.rewrite(url); // o redirect a otra ruta pública
	}

	// OK: deja pasar
	return NextResponse.next();
}

export const config = {
	// Aplica sólo a /admin (incluye subrutas)
	matcher: ['/admin/:path*'],
};
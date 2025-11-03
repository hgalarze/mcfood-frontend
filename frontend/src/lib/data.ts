export type Category = { slug: string; name: string; image: string };
export type Product = {
	id: string;
	name: string;
	price: number;
	image: string;
	category: string;
};

export const categories: Category[] = [
	{
		slug: "hamburguesas",
		name: "Hamburguesas",
		image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
	},
	{
		slug: "pizzas",
		name: "Pizzas",
		image: "https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=1000&auto=format&fit=crop",
	},
	{
		slug: "bebidas",
		name: "Bebidas",
		image: "https://images.unsplash.com/photo-1711154319702-70f9e8c3a90f?q=80&w=1000&auto=format&fit=crop",
	},
	{
		slug: "postres",
		name: "Postres",
		image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1000&auto=format&fit=crop",
	},
];

export const products: Product[] = [
	{
		id: "p1",
		name: "Cheeseburger",
		price: 6.9,
		category: "hamburguesas",
		image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
	},
	{
		id: "p2",
		name: "Doble Bacon",
		price: 8.5,
		category: "hamburguesas",
		image: "https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=800&auto=format&fit=crop",
	},
	{
		id: "p3",
		name: "Margarita",
		price: 9.9,
		category: "pizzas",
		image: "https://images.unsplash.com/photo-1548365328-9f547fb09530?q=80&w=800&auto=format&fit=crop",
	},
	{
		id: "p4",
		name: "Pepperoni",
		price: 10.9,
		category: "pizzas",
		image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop",
	},
	{
		id: "p5",
		name: "Cola 500ml",
		price: 2.1,
		category: "bebidas",
		image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=800&auto=format&fit=crop",
	},
	{
		id: "p6",
		name: "Helado Vainilla",
		price: 3.5,
		category: "postres",
		image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
	},
];

export const featured = ["p1", "p4", "p6"];
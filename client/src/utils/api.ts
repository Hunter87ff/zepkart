import backpackImg from '../assets/backpack.png';
import headphonesImg from '../assets/headphones.png';
import shoesImg from '../assets/shoes.png';
import smartwatchImg from '../assets/smartwatch.png';
import watchImg from '../assets/watch.png';

export type ProductStatus = 'active' | 'draft' | 'out-of-stock';
export type OrderStatus =
	| 'pending'
	| 'confirmed'
	| 'packed'
	| 'shipped'
	| 'delivered'
	| 'cancelled';

export interface StoreProfile {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	description: string;
	returnPolicy: string;
	shippingPolicy: string;
}

export interface StoreProduct {
	id: number;
	name: string;
	sku: string;
	category: string;
	price: number;
	mrp: number;
	stock: number;
	status: ProductStatus;
	image: string;
	description: string;
	tags: string[];
	sales: number;
	createdAt: string;
	updatedAt: string;
}

export interface OrderItem {
	productId: number;
	productName: string;
	image: string;
	quantity: number;
	price: number;
}

export interface StoreOrder {
	id: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	shippingAddress: string;
	paymentMethod: 'COD' | 'UPI' | 'Card';
	paymentStatus: 'paid' | 'pending' | 'refunded';
	status: OrderStatus;
	notes: string;
	shippingCharge: number;
	total: number;
	items: OrderItem[];
	createdAt: string;
	updatedAt: string;
}

interface StoreDb {
	profile: StoreProfile;
	products: StoreProduct[];
	orders: StoreOrder[];
}

export interface DashboardSummary {
	totalProducts: number;
	activeProducts: number;
	lowStockProducts: number;
	totalOrders: number;
	pendingOrders: number;
	shippedOrders: number;
	deliveredOrders: number;
	totalRevenue: number;
}

const STORAGE_KEY = 'zepkart-store-db-v1';

const seedDb: StoreDb = {
	profile: {
		id: 'store-1',
		name: 'Nova Retail Hub',
		email: 'support@novaretailhub.com',
		phone: '+91 98765 43120',
		address: '2nd Floor, MG Road, Bengaluru, Karnataka 560001',
		description:
			'Nova Retail Hub delivers quality lifestyle and electronics products with fast shipping and dependable support.',
		returnPolicy:
			'Returns accepted within 7 days for unused items with original packaging.',
		shippingPolicy:
			'Orders ship in 24 hours. Metro delivery in 2-4 days and non-metro in 4-7 days.',
	},
	products: [
		{
			id: 301,
			name: 'Premium Wireless Headphones',
			sku: 'NOVA-HP-301',
			category: 'Electronics',
			price: 299,
			mrp: 399,
			stock: 27,
			status: 'active',
			image: headphonesImg,
			description:
				'Over-ear wireless headphones with rich bass and active noise cancellation.',
			tags: ['wireless', 'audio', 'noise-cancelling'],
			sales: 187,
			createdAt: '2026-01-05T10:00:00.000Z',
			updatedAt: '2026-03-12T08:30:00.000Z',
		},
		{
			id: 302,
			name: 'Urban Running Shoes',
			sku: 'NOVA-SH-302',
			category: 'Footwear',
			price: 85,
			mrp: 120,
			stock: 8,
			status: 'active',
			image: shoesImg,
			description:
				'Lightweight running shoes with breathable mesh and anti-slip grip.',
			tags: ['running', 'sports', 'men'],
			sales: 142,
			createdAt: '2026-01-18T10:00:00.000Z',
			updatedAt: '2026-03-14T13:20:00.000Z',
		},
		{
			id: 303,
			name: 'Smart Fitness Watch',
			sku: 'NOVA-WT-303',
			category: 'Wearables',
			price: 199,
			mrp: 250,
			stock: 0,
			status: 'out-of-stock',
			image: smartwatchImg,
			description:
				'Track steps, sleep, heart rate, and workouts with all-day battery life.',
			tags: ['fitness', 'smartwatch', 'health'],
			sales: 94,
			createdAt: '2026-02-03T10:00:00.000Z',
			updatedAt: '2026-03-10T09:00:00.000Z',
		},
		{
			id: 304,
			name: 'Waterproof Travel Backpack',
			sku: 'NOVA-BP-304',
			category: 'Bags',
			price: 45,
			mrp: 60,
			stock: 16,
			status: 'draft',
			image: backpackImg,
			description:
				'20L everyday travel backpack with water-resistant shell and padded straps.',
			tags: ['travel', 'backpack', 'waterproof'],
			sales: 0,
			createdAt: '2026-03-01T10:00:00.000Z',
			updatedAt: '2026-03-01T10:00:00.000Z',
		},
	],
	orders: [
		{
			id: 'ZPK-STORE-9001',
			customerName: 'Aarav Sharma',
			customerEmail: 'aarav.sharma@example.com',
			customerPhone: '+91 98980 12345',
			shippingAddress: 'No. 14, Indiranagar, Bengaluru 560038',
			paymentMethod: 'UPI',
			paymentStatus: 'paid',
			status: 'confirmed',
			notes: 'Gift wrap requested.',
			shippingCharge: 0,
			total: 299,
			items: [
				{
					productId: 301,
					productName: 'Premium Wireless Headphones',
					image: headphonesImg,
					quantity: 1,
					price: 299,
				},
			],
			createdAt: '2026-03-16T09:14:00.000Z',
			updatedAt: '2026-03-16T10:00:00.000Z',
		},
		{
			id: 'ZPK-STORE-9002',
			customerName: 'Mira Das',
			customerEmail: 'mira.das@example.com',
			customerPhone: '+91 91234 88811',
			shippingAddress: 'Flat 6B, Salt Lake, Kolkata 700091',
			paymentMethod: 'COD',
			paymentStatus: 'pending',
			status: 'packed',
			notes: '',
			shippingCharge: 49,
			total: 219,
			items: [
				{
					productId: 302,
					productName: 'Urban Running Shoes',
					image: shoesImg,
					quantity: 2,
					price: 85,
				},
			],
			createdAt: '2026-03-15T13:30:00.000Z',
			updatedAt: '2026-03-16T12:20:00.000Z',
		},
		{
			id: 'ZPK-STORE-9003',
			customerName: 'Ritika Mehra',
			customerEmail: 'ritika.m@example.com',
			customerPhone: '+91 90450 11120',
			shippingAddress: 'DLF Phase 3, Gurugram 122002',
			paymentMethod: 'Card',
			paymentStatus: 'paid',
			status: 'shipped',
			notes: 'Deliver after 6 PM.',
			shippingCharge: 0,
			total: 244,
			items: [
				{
					productId: 304,
					productName: 'Waterproof Travel Backpack',
					image: backpackImg,
					quantity: 1,
					price: 45,
				},
				{
					productId: 303,
					productName: 'Smart Fitness Watch',
					image: smartwatchImg,
					quantity: 1,
					price: 199,
				},
			],
			createdAt: '2026-03-14T11:20:00.000Z',
			updatedAt: '2026-03-17T09:40:00.000Z',
		},
		{
			id: 'ZPK-STORE-9004',
			customerName: 'Nikhil Verma',
			customerEmail: 'nikhil.v@example.com',
			customerPhone: '+91 98117 33300',
			shippingAddress: 'Kondapur, Hyderabad 500084',
			paymentMethod: 'UPI',
			paymentStatus: 'paid',
			status: 'delivered',
			notes: '',
			shippingCharge: 0,
			total: 120,
			items: [
				{
					productId: 304,
					productName: 'Waterproof Travel Backpack',
					image: backpackImg,
					quantity: 1,
					price: 45,
				},
				{
					productId: 302,
					productName: 'Urban Running Shoes',
					image: shoesImg,
					quantity: 1,
					price: 85,
				},
			],
			createdAt: '2026-03-10T16:15:00.000Z',
			updatedAt: '2026-03-13T12:11:00.000Z',
		},
		{
			id: 'ZPK-STORE-9005',
			customerName: 'Pooja Jain',
			customerEmail: 'pooja.j@example.com',
			customerPhone: '+91 99555 21212',
			shippingAddress: 'Civil Lines, Jaipur 302006',
			paymentMethod: 'Card',
			paymentStatus: 'refunded',
			status: 'cancelled',
			notes: 'Customer requested cancellation before dispatch.',
			shippingCharge: 0,
			total: 120,
			items: [
				{
					productId: 305,
					productName: 'Classic Wrist Watch',
					image: watchImg,
					quantity: 1,
					price: 120,
				},
			],
			createdAt: '2026-03-09T15:00:00.000Z',
			updatedAt: '2026-03-09T15:45:00.000Z',
		},
	],
};

function clone<T>(data: T): T {
	return JSON.parse(JSON.stringify(data)) as T;
}

function readDb(): StoreDb {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) {
		const seeded = clone(seedDb);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
		return seeded;
	}

	try {
		return JSON.parse(raw) as StoreDb;
	} catch {
		const seeded = clone(seedDb);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
		return seeded;
	}
}

function writeDb(db: StoreDb) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function delay<T>(data: T, ms = 220): Promise<T> {
	return new Promise((resolve) => {
		window.setTimeout(() => resolve(clone(data)), ms);
	});
}

export async function getStoreProfile(): Promise<StoreProfile> {
	return delay(readDb().profile);
}

export async function updateStoreProfile(
	payload: Partial<StoreProfile>
): Promise<StoreProfile> {
	const db = readDb();
	db.profile = { ...db.profile, ...payload };
	writeDb(db);
	return delay(db.profile);
}

export async function getStoreProducts(): Promise<StoreProduct[]> {
	return delay(readDb().products);
}

export async function getStoreProductById(
	id: number
): Promise<StoreProduct | null> {
	const product = readDb().products.find((item) => item.id === id) ?? null;
	return delay(product);
}

export async function createStoreProduct(
	payload: Omit<StoreProduct, 'id' | 'createdAt' | 'updatedAt' | 'sales'>
): Promise<StoreProduct> {
	const db = readDb();
	const maxId = db.products.reduce((max, item) => Math.max(max, item.id), 300);
	const now = new Date().toISOString();
	const product: StoreProduct = {
		...payload,
		id: maxId + 1,
		sales: 0,
		createdAt: now,
		updatedAt: now,
	};

	db.products.unshift(product);
	writeDb(db);
	return delay(product);
}

export async function updateStoreProduct(
	id: number,
	payload: Partial<StoreProduct>
): Promise<StoreProduct> {
	const db = readDb();
	const index = db.products.findIndex((item) => item.id === id);
	if (index < 0) {
		throw new Error('Product not found');
	}

	db.products[index] = {
		...db.products[index],
		...payload,
		id,
		updatedAt: new Date().toISOString(),
	};

	writeDb(db);
	return delay(db.products[index]);
}

export async function deleteStoreProduct(id: number): Promise<void> {
	const db = readDb();
	db.products = db.products.filter((item) => item.id !== id);
	writeDb(db);
	return delay(undefined);
}

export async function getStoreOrders(): Promise<StoreOrder[]> {
	return delay(readDb().orders);
}

export async function getStoreOrderById(id: string): Promise<StoreOrder | null> {
	const order = readDb().orders.find((item) => item.id === id) ?? null;
	return delay(order);
}

export async function updateStoreOrder(
	id: string,
	payload: Partial<StoreOrder>
): Promise<StoreOrder> {
	const db = readDb();
	const index = db.orders.findIndex((item) => item.id === id);
	if (index < 0) {
		throw new Error('Order not found');
	}

	db.orders[index] = {
		...db.orders[index],
		...payload,
		id,
		updatedAt: new Date().toISOString(),
	};

	writeDb(db);
	return delay(db.orders[index]);
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
	const db = readDb();
	const lowStock = db.products.filter((item) => item.stock > 0 && item.stock <= 10);
	const active = db.products.filter((item) => item.status === 'active');
	const pending = db.orders.filter((item) => item.status === 'pending');
	const shipped = db.orders.filter((item) => item.status === 'shipped');
	const delivered = db.orders.filter((item) => item.status === 'delivered');
	const revenue = db.orders
		.filter((item) => item.paymentStatus === 'paid')
		.reduce((sum, item) => sum + item.total, 0);

	return delay({
		totalProducts: db.products.length,
		activeProducts: active.length,
		lowStockProducts: lowStock.length,
		totalOrders: db.orders.length,
		pendingOrders: pending.length,
		shippedOrders: shipped.length,
		deliveredOrders: delivered.length,
		totalRevenue: revenue,
	});
}


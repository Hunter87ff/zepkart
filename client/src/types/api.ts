export interface User {
	_id: string;
	id?: string; // mapped from _id for compatibility
	name: string;
	email: string;
	phone: string;
	avatar: string;
	permissions?: {
		admin: boolean;
		manager: boolean;
		user: boolean;
		store_owner: boolean;
	};
}

export interface Store {
	_id: string;
	id?: string; // mapped from _id
	name: string;
	owner: string | User;
	description: string;
	logo: string;
	banner: string;
	contact_email: string;
	contact_phone: string;
	verified: boolean;
	rating: number;
	policies?: {
		shipping?: string;
		return?: string;
		refund?: string;
		warranty?: string;
	};
}

export interface MiscInfo {
	refund?: string;
	return?: string;
	warranty?: string;
	cod?: boolean;
	delivery_fee?: number;
}

export interface Product {
	_id: string;
	id?: string; // mapped from _id
	name: string;
	store: string | Store;
	price: number;
	discount: [number, number]; // [percentage, expiryTimestamp]
	description: string;
	images: string[];
	image?: string; // mapped from images[0]
	rating: number;
	rating_count: number;
	categories?: string[];
	tags?: string[];
	stock: number;
	misc?: MiscInfo;
	sku?: string; // Add if used in components
	mrp?: number; // Add if used in components
	sales?: number;
	createdAt?: string;
	updatedAt?: string;
	status?: 'active' | 'draft' | 'out-of-stock';
}

export type ProductStatus = 'active' | 'draft' | 'out-of-stock';

export interface CartItem {
	_id: string;
	id?: string;
	cart: string;
	product: Product;
	quantity: number;
	price_at_addition: number;
	discount: number;
	total_price: number;
}

export interface Cart {
	_id: string;
	id?: string;
	user: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
	_id: string;
	id?: string;
	user: string | User;
	amount: number;
	discount: number;
	total_amount: number;
	status: OrderStatus;
	payment_status?: string;
	address?: any;
	createdAt: string;
	updatedAt: string;
	customerName?: string; // Legacy fields if needed
	customerEmail?: string;
	items?: any[];
}

export interface OrderItem {
	_id: string;
	id?: string;
	order: string;
	product: Product;
	quantity: number;
	price_at_purchase: number;
}

export interface Wishlist {
	_id: string;
	id?: string;
	user: string;
	products: Product[];
}

export interface ApiResponse<T> {
	status: number;
	message: string;
	data: T;
}

export interface PaginatedResponse<T> {
	status: number;
	message: string;
	data: {
		[key: string]: T[] | any;
		pagination: {
			page: number;
			limit: number;
			total: number;
			pages: number;
		};
	};
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

export interface StoreProfile {
	_id?: string;
	id?: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	description: string;
	returnPolicy: string;
	shippingPolicy: string;
}

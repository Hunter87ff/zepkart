import apiClient from './api-client';
import type {
	ApiResponse,
	PaginatedResponse,
	User,
	Store,
	Product,
	Cart,
	CartItem,
	Order,
	Wishlist,
	ProductStatus,
	OrderStatus,
	DashboardSummary,
	StoreProfile,
} from '../types/api';

// --- Types & Aliases for Compatibility ---
export type { ProductStatus, OrderStatus, Order };
export type StoreProduct = Product;
export type StoreOrder = Order;
// export type { StoreProfile } from '../types/api'; // If we add it later
export type { DashboardSummary, StoreProfile };

// --- Mappers for compatibility (_id -> id, images -> image) ---

function mapUser(user: any): User {
	if (!user) return user;
	return { ...user, id: user._id || user.id };
}

function mapStore(store: any): Store {
	if (!store) return store;
	return { ...store, id: store._id || store.id };
}

function mapProduct(product: any): Product {
	if (!product) return product;
	return {
		...product,
		id: product._id || product.id,
		image: product.images?.[0] || product.image || '',
	};
}

function mapOrder(order: any): Order {
	if (!order) return order;
	return { ...order, id: order._id || order.id };
}

function mapCartItem(item: any): CartItem {
	if (!item) return item;
	return {
		...item,
		id: item._id || item.id,
		product: mapProduct(item.product),
	};
}

// --- Auth & User ---

export async function login(credentials: any): Promise<{ token: string; user: User }> {
	const res = await apiClient.post<ApiResponse<{ token: string; user: User }>>('/auth/login', credentials);
	localStorage.setItem('zepkart_token', res.data.data.token);
	return {
		token: res.data.data.token,
		user: mapUser(res.data.data.user),
	};
}

export async function register(userData: any): Promise<{ token: string; user: User }> {
	const res = await apiClient.post<ApiResponse<{ token: string; user: User }>>('/auth/register', userData);
	localStorage.setItem('zepkart_token', res.data.data.token);
	return {
		token: res.data.data.token,
		user: mapUser(res.data.data.user),
	};
}

export async function logout(): Promise<void> {
	await apiClient.post('/auth/logout');
	localStorage.removeItem('zepkart_token');
}

export async function getMyProfile(): Promise<User> {
	const res = await apiClient.get<ApiResponse<User>>('/users/');
	return mapUser(res.data.data);
}

// --- Store ---

export async function getStores(params?: any): Promise<Store[]> {
	const res = await apiClient.get<PaginatedResponse<Store>>('/stores/', { params });
	return (res.data.data.stores || []).map(mapStore);
}

export async function getStoreById(id: string): Promise<Store> {
	const res = await apiClient.get<ApiResponse<Store>>(`/stores/${id}`);
	return mapStore(res.data.data);
}

// Compatibility with Store Manager
export async function getStoreProfile(): Promise<StoreProfile> {
    // In our backend, a user can own a store. 
    // We'll fetch stores owned by the user or just the first one for simplicity in this MVP.
    const stores = await getStores({ owner: 'me' }); // backend implementation should handle this
    const store = stores[0];
    if (!store) return {} as StoreProfile;

    return {
        _id: store._id,
        id: store.id,
        name: store.name,
        email: store.contact_email || '',
        phone: store.contact_phone || '',
        address: '', // Mapped to empty as backend lacks this field
        description: store.description || '',
        returnPolicy: store.policies?.return || '',
        shippingPolicy: store.policies?.shipping || '',
    };
}

export async function updateStoreProfile(payload: StoreProfile): Promise<StoreProfile> {
    const profile = await getStoreProfile();
    const id = profile._id || profile.id;
    if (!id) throw new Error('Store not found');

    const mappedPayload = {
        name: payload.name,
        description: payload.description,
        contact_email: payload.email,
        contact_phone: payload.phone,
        policies: {
            return: payload.returnPolicy,
            shipping: payload.shippingPolicy,
        }
    };

    const updated = await updateStore(id, mappedPayload);
    // Map back to StoreProfile
    return {
        ...payload,
        _id: updated._id,
        id: updated.id,
    };
}

export async function createStore(data: any): Promise<Store> {
	const res = await apiClient.post<ApiResponse<Store>>('/stores/', data);
	return mapStore(res.data.data);
}

export async function updateStore(id: string | number, data: any): Promise<Store> {
	const res = await apiClient.post<ApiResponse<Store>>(`/stores/${id}`, data);
	return mapStore(res.data.data);
}

export async function deleteStore(id: string | number): Promise<void> {
	await apiClient.delete(`/stores/${id}`);
}

// --- Products ---

export async function getProducts(params?: any): Promise<Product[]> {
	const res = await apiClient.get<PaginatedResponse<Product>>('/products/', { params });
	return (res.data.data.products || []).map(mapProduct);
}

export async function getProductById(id: string | number): Promise<Product> {
	const res = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
	return mapProduct(res.data.data);
}

// Compatibility with Store Manager
export async function getStoreProducts(): Promise<Product[]> {
    return getProducts({ owner: 'me' });
}

export async function getStoreProductById(id: string | number): Promise<Product | null> {
    return getProductById(id);
}

export async function createStoreProduct(data: any): Promise<Product> {
    return createProduct(data);
}

export async function updateStoreProduct(id: string | number, data: any): Promise<Product> {
    return updateProduct(id, data);
}

export async function deleteStoreProduct(id: string | number): Promise<void> {
    return deleteProduct(id);
}

export async function createProduct(data: any): Promise<Product> {
	const res = await apiClient.post<ApiResponse<Product>>('/products/', data);
	return mapProduct(res.data.data);
}

export async function updateProduct(id: string | number, data: any): Promise<Product> {
	const res = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, data);
	return mapProduct(res.data.data);
}

export async function deleteProduct(id: string | number): Promise<void> {
	await apiClient.delete(`/products/${id}`);
}

// --- Cart ---

export async function getCart(): Promise<{ cart: Cart; items: CartItem[]; saved: CartItem[]; subtotal: number }> {
	const res = await apiClient.get<ApiResponse<{ cart: Cart; items: CartItem[]; saved: CartItem[]; subtotal: number }>>('/cart/');
	return {
		cart: mapCartItem(res.data.data.cart) as any,
		items: (res.data.data.items || []).map(mapCartItem),
		saved: (res.data.data.saved || []).map(mapCartItem),
		subtotal: res.data.data.subtotal,
	};
}

export async function addToCart(productId: string, quantity: number): Promise<CartItem> {
	const res = await apiClient.post<ApiResponse<CartItem>>('/cart/add', { productId, quantity });
	return mapCartItem(res.data.data);
}

export async function removeFromCart(productId: string): Promise<void> {
	await apiClient.post('/cart/remove', { productId });
}

export async function updateCartItem(productId: string, quantity: number): Promise<CartItem> {
	const res = await apiClient.post('/cart/update', { productId, quantity });
	return mapCartItem(res.data.data);
}

export async function clearCart(): Promise<void> {
	await apiClient.post('/cart/clear');
}

export async function toggleSaveForLater(productId: string): Promise<void> {
    await apiClient.post('/cart/save-later', { productId });
}

// --- Orders ---

export async function getOrders(params?: any): Promise<Order[]> {
	const res = await apiClient.get<PaginatedResponse<Order>>('/orders/', { params });
	return (res.data.data.orders || []).map(mapOrder);
}

// Compatibility with Store Manager
export async function getStoreOrders(): Promise<Order[]> {
    return getOrders();
}

export async function getStoreOrderById(id: string): Promise<Order | null> {
    const res = await getOrderById(id);
    return res.order;
}

export async function updateStoreOrder(id: string, payload: any): Promise<Order> {
    const res = await apiClient.put<ApiResponse<Order>>(`/orders/${id}`, payload);
    return mapOrder(res.data.data);
}

export async function getOrderById(id: string): Promise<{ order: Order; items: any[] }> {
	const res = await apiClient.get<ApiResponse<{ order: Order; items: any[] }>>(`/orders/${id}`);
	return {
		order: mapOrder(res.data.data.order),
		items: (res.data.data.items || []).map((item: any) => ({
			...item,
			product: mapProduct(item.product),
		})),
	};
}

export async function createOrder(): Promise<{ order: Order; items: any[]; total_amount: number }> {
	const res = await apiClient.post<ApiResponse<{ order: any; items: any[]; total_amount: number }>>('/orders/');
	return {
		order: mapOrder(res.data.data.order),
		items: res.data.data.items,
		total_amount: res.data.data.total_amount,
	};
}

// --- Wishlist ---

export async function getWishlist(): Promise<Wishlist> {
	const res = await apiClient.get<ApiResponse<Wishlist>>('/wishlist/');
	return {
		...res.data.data,
		id: res.data.data._id,
		products: (res.data.data.products || []).map(mapProduct),
	};
}

export async function addToWishlist(productId: string): Promise<Wishlist> {
	const res = await apiClient.post<ApiResponse<Wishlist>>(`/wishlist/products/${productId}`);
	return {
		...res.data.data,
		id: res.data.data._id,
		products: (res.data.data.products || []).map(mapProduct),
	};
}

export async function removeFromWishlist(productId: string): Promise<Wishlist> {
	const res = await apiClient.delete<ApiResponse<Wishlist>>(`/wishlist/products/${productId}`);
	return {
		...res.data.data,
		id: res.data.data._id,
		products: (res.data.data.products || []).map(mapProduct),
	};
}

// --- Dashboard / Legacy Adapters ---

export async function getDashboardSummary(): Promise<DashboardSummary> {
	try {
		const [productsRes, ordersRes] = await Promise.all([
			apiClient.get<PaginatedResponse<Product>>('/products/', { params: { limit: 1 } }),
			apiClient.get<PaginatedResponse<Order>>('/orders/', { params: { limit: 1 } }),
		]);

		return {
			totalProducts: productsRes.data.data.pagination.total,
			activeProducts: productsRes.data.data.pagination.total, // Approximation
			lowStockProducts: 0,
			totalOrders: ordersRes.data.data.pagination.total,
			pendingOrders: 0,
			shippedOrders: 0,
			deliveredOrders: 0,
			totalRevenue: 0,
		};
	} catch {
		return {
			totalProducts: 0,
			activeProducts: 0,
			lowStockProducts: 0,
			totalOrders: 0,
			pendingOrders: 0,
			shippedOrders: 0,
			deliveredOrders: 0,
			totalRevenue: 0,
		} as any;
	}
}

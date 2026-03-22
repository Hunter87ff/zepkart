import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, updateCartItem as apiUpdateCartItem, clearCart as apiClearCart } from '../utils/api';
import type { CartItem } from '../types/api';
import { useAuth } from './AuthContext';

interface CartContextType {
    items: CartItem[];
    loading: boolean;
    subtotal: number;
    itemCount: number;
    addToCart: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [subtotal, setSubtotal] = useState(0);
    const { isAuthenticated } = useAuth();

    const refreshCart = async () => {
        if (!isAuthenticated) {
            setItems([]);
            setSubtotal(0);
            setLoading(false);
            return;
        }

        try {
            const data = await getCart();
            setItems(data.items);
            setSubtotal(data.subtotal);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshCart();
    }, [isAuthenticated]);

    const addToCart = async (productId: string, quantity: number) => {
        await apiAddToCart(productId, quantity);
        await refreshCart();
    };

    const removeFromCart = async (productId: string) => {
        await apiRemoveFromCart(productId);
        await refreshCart();
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        await apiUpdateCartItem(productId, quantity);
        await refreshCart();
    };

    const clearCart = async () => {
        await apiClearCart();
        await refreshCart();
    };

    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const value: CartContextType = {
        items,
        loading,
        subtotal,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

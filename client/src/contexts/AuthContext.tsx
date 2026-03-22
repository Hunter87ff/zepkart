import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMyProfile, login as apiLogin, register as apiRegister, logout as apiLogout } from '../utils/api';
import type { User } from '../types/api';
import { PermissionLevels } from '../types/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: any) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    isAuthenticated: boolean;
    isStoreOwner: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initAuth() {
            const token = localStorage.getItem('zepkart_token');
            if (token) {
                try {
                    const profile = await getMyProfile();
                    setUser(profile);
                } catch (error) {
                    console.error('Failed to restore session:', error);
                    localStorage.removeItem('zepkart_token');
                }
            }
            setLoading(false);
        }
        initAuth();
    }, []);

    const login = async (credentials: any) => {
        const { user: loggedInUser } = await apiLogin(credentials);
        setUser(loggedInUser);
    };

    const register = async (userData: any) => {
        const { user: registeredUser } = await apiRegister(userData);
        setUser(registeredUser);
    };

    const logout = async () => {
        await apiLogout();
        setUser(null);
    };

    const refreshUser = async () => {
        try {
            const profile = await getMyProfile();
            setUser(profile);
        } catch (error) {
            console.error('Failed to refresh user:', error);
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        isAuthenticated: !!user,
        isStoreOwner: !!user?.permissions?.some(p => p === PermissionLevels.store_owner || p === PermissionLevels.admin),
        isAdmin: !!user?.permissions?.includes(PermissionLevels.admin),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

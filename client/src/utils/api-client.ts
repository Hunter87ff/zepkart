import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const baseURL = 'http://localhost:3001/api';

export const apiClient = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem('zepkart_token');
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		const data = error.response?.data as any;
		const message = data?.message || error.message || 'Something went wrong';

		// Handle 401 Unauthorized (token expired or invalid)
		if (error.response?.status === 401) {
			localStorage.removeItem('zepkart_token');
			// Optionally redirect to login if not already there
			if (!window.location.pathname.includes('/login')) {
				window.location.href = '/login';
			}
		}

		// Return a formatted error object
		return Promise.reject({
			status: error.response?.status || 500,
			message,
			data: data?.data || null,
		});
	}
);

export default apiClient;

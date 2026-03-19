import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import {
	getDashboardSummary,
	getStoreProfile,
	updateStoreProfile,
	type DashboardSummary,
	type StoreProfile,
} from '../../utils/api';
import {
	BadgeIndianRupee,
	Package,
	Settings,
	ShoppingBag,
	Truck,
	ClipboardList,
	CircleAlert,
	CheckCircle2,
} from 'lucide-react';

const defaultSummary: DashboardSummary = {
	totalProducts: 0,
	activeProducts: 0,
	lowStockProducts: 0,
	totalOrders: 0,
	pendingOrders: 0,
	shippedOrders: 0,
	deliveredOrders: 0,
	totalRevenue: 0,
};

export default function Store() {
	const [profile, setProfile] = useState<StoreProfile | null>(null);
	const [form, setForm] = useState<StoreProfile | null>(null);
	const [summary, setSummary] = useState<DashboardSummary>(defaultSummary);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		async function loadStore() {
			const [storeProfile, dashboard] = await Promise.all([
				getStoreProfile(),
				getDashboardSummary(),
			]);
			setProfile(storeProfile);
			setForm(storeProfile);
			setSummary(dashboard);
			setLoading(false);
		}

		loadStore();
	}, []);

	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
		if (!form) {
			return;
		}

		setSaving(true);
		setMessage('');

		try {
			const updated = await updateStoreProfile(form);
			setProfile(updated);
			setForm(updated);
			setMessage('Store profile updated successfully.');
		} catch {
			setMessage('Unable to update store profile right now.');
		} finally {
			setSaving(false);
		}
	}

	if (loading || !form || !profile) {
		return (
			<Layout>
				<div className="max-w-[1300px] mx-auto px-4 lg:px-6 py-8">
					<div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card">
						<p className="text-sm text-gray-500">Loading store dashboard...</p>
					</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="max-w-[1300px] mx-auto px-4 lg:px-6 py-8 space-y-6">
				<section className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-7 shadow-card">
					<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Seller Control Panel</h1>
							<p className="text-sm text-gray-500 mt-1">
								Manage your store info, catalog, and orders from one place.
							</p>
						</div>
						<div className="flex flex-wrap gap-2">
							<Link
								to="/store/products"
								className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
							>
								Manage Products
							</Link>
							<Link
								to="/store/orders"
								className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors"
							>
								View Orders
							</Link>
						</div>
					</div>
				</section>

				<section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
					<article className="bg-white border border-gray-100 rounded-xl p-4 shadow-card">
						<div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
							<Package size={18} />
						</div>
						<p className="text-xs text-gray-400">Products</p>
						<h3 className="text-2xl font-bold text-gray-900 mt-1">{summary.totalProducts}</h3>
						<p className="text-xs text-gray-500 mt-1">{summary.activeProducts} active listings</p>
					</article>

					<article className="bg-white border border-gray-100 rounded-xl p-4 shadow-card">
						<div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
							<CircleAlert size={18} />
						</div>
						<p className="text-xs text-gray-400">Low Stock Alerts</p>
						<h3 className="text-2xl font-bold text-gray-900 mt-1">{summary.lowStockProducts}</h3>
						<p className="text-xs text-gray-500 mt-1">Need replenishment soon</p>
					</article>

					<article className="bg-white border border-gray-100 rounded-xl p-4 shadow-card">
						<div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
							<ClipboardList size={18} />
						</div>
						<p className="text-xs text-gray-400">Total Orders</p>
						<h3 className="text-2xl font-bold text-gray-900 mt-1">{summary.totalOrders}</h3>
						<p className="text-xs text-gray-500 mt-1">{summary.pendingOrders} pending processing</p>
					</article>

					<article className="bg-white border border-gray-100 rounded-xl p-4 shadow-card">
						<div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
							<BadgeIndianRupee size={18} />
						</div>
						<p className="text-xs text-gray-400">Paid Revenue</p>
						<h3 className="text-2xl font-bold text-gray-900 mt-1">₹{summary.totalRevenue.toFixed(0)}</h3>
						<p className="text-xs text-gray-500 mt-1">From all paid orders</p>
					</article>
				</section>

				<section className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
					<form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 shadow-card">
						<div className="flex items-center gap-2 mb-5">
							<Settings size={18} className="text-gray-500" />
							<h2 className="text-lg font-bold text-gray-900">Store Information</h2>
						</div>

						<div className="grid md:grid-cols-2 gap-4">
							<label className="text-sm text-gray-600">
								Store Name
								<input
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/15 focus:border-primary"
									value={form.name}
									onChange={(e) => setForm((prev) => (prev ? { ...prev, name: e.target.value } : prev))}
									required
								/>
							</label>

							<label className="text-sm text-gray-600">
								Email
								<input
									type="email"
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/15 focus:border-primary"
									value={form.email}
									onChange={(e) => setForm((prev) => (prev ? { ...prev, email: e.target.value } : prev))}
									required
								/>
							</label>

							<label className="text-sm text-gray-600">
								Phone
								<input
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/15 focus:border-primary"
									value={form.phone}
									onChange={(e) => setForm((prev) => (prev ? { ...prev, phone: e.target.value } : prev))}
									required
								/>
							</label>

							<label className="text-sm text-gray-600 md:col-span-2">
								Business Address
								<input
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/15 focus:border-primary"
									value={form.address}
									onChange={(e) => setForm((prev) => (prev ? { ...prev, address: e.target.value } : prev))}
									required
								/>
							</label>

							<label className="text-sm text-gray-600 md:col-span-2">
								Store Description
								<textarea
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/15 focus:border-primary min-h-24"
									value={form.description}
									onChange={(e) => setForm((prev) => (prev ? { ...prev, description: e.target.value } : prev))}
								/>
							</label>

							<label className="text-sm text-gray-600">
								Return Policy
								<textarea
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/15 focus:border-primary min-h-24"
									value={form.returnPolicy}
									onChange={(e) => setForm((prev) => (prev ? { ...prev, returnPolicy: e.target.value } : prev))}
								/>
							</label>

							<label className="text-sm text-gray-600">
								Shipping Policy
								<textarea
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/15 focus:border-primary min-h-24"
									value={form.shippingPolicy}
									onChange={(e) => setForm((prev) => (prev ? { ...prev, shippingPolicy: e.target.value } : prev))}
								/>
							</label>
						</div>

						<div className="mt-5 flex items-center gap-3">
							<button
								type="submit"
								disabled={saving}
								className="px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-70"
							>
								{saving ? 'Saving...' : 'Save Profile'}
							</button>
							{message && <span className="text-sm text-gray-500">{message}</span>}
						</div>
					</form>

					<div className="space-y-4">
						<article className="bg-white border border-gray-100 rounded-xl p-5 shadow-card">
							<h3 className="text-sm font-semibold text-gray-900 mb-2">Order Pipeline</h3>
							<div className="space-y-2 text-sm text-gray-600">
								<p className="flex items-center justify-between">
									<span className="inline-flex items-center gap-2"><ShoppingBag size={15} /> Pending</span>
									<strong className="text-gray-900">{summary.pendingOrders}</strong>
								</p>
								<p className="flex items-center justify-between">
									<span className="inline-flex items-center gap-2"><Truck size={15} /> Shipped</span>
									<strong className="text-gray-900">{summary.shippedOrders}</strong>
								</p>
								<p className="flex items-center justify-between">
									<span className="inline-flex items-center gap-2"><CheckCircle2 size={15} /> Delivered</span>
									<strong className="text-gray-900">{summary.deliveredOrders}</strong>
								</p>
							</div>
						</article>

						<article className="bg-primary/5 border border-primary/10 rounded-xl p-5">
							<h3 className="text-sm font-bold text-gray-900 mb-2">Quick Actions</h3>
							<div className="space-y-2">
								<Link
									to="/store/products"
									className="block w-full text-center px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:border-primary/30 hover:text-primary transition-colors"
								>
									Add or Update Products
								</Link>
								<Link
									to="/store/orders"
									className="block w-full text-center px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:border-primary/30 hover:text-primary transition-colors"
								>
									Process New Orders
								</Link>
							</div>
						</article>
					</div>
				</section>
			</div>
		</Layout>
	);
}


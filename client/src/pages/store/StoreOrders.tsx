import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import {
	getStoreOrders,
	updateStoreOrder,
	type OrderStatus,
	type StoreOrder,
} from '../../utils/api';
import { Search } from 'lucide-react';

const statuses: Array<'all' | OrderStatus> = [
	'all',
	'pending',
	'confirmed',
	'packed',
	'shipped',
	'delivered',
	'cancelled',
];

export default function StoreOrders() {
	const [orders, setOrders] = useState<StoreOrder[]>([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');

	useEffect(() => {
		let mounted = true;

		const load = async () => {
			const data = await getStoreOrders();
			if (!mounted) {
				return;
			}

			setOrders(data);
			setLoading(false);
		};

		void load();

		return () => {
			mounted = false;
		};
	}, []);

	async function loadOrders() {
		const data = await getStoreOrders();
		setOrders(data);
		setLoading(false);
	}

	const filteredOrders = useMemo(() => {
		const q = search.toLowerCase().trim();
		return orders.filter((order) => {
			const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
			const matchesSearch =
				!q ||
				order.id.toLowerCase().includes(q) ||
				order.customerName.toLowerCase().includes(q) ||
				order.customerPhone.toLowerCase().includes(q);
			return matchesStatus && matchesSearch;
		});
	}, [orders, search, statusFilter]);

	async function changeStatus(order: StoreOrder, newStatus: OrderStatus) {
		await updateStoreOrder(order.id, { status: newStatus });
		await loadOrders();
	}

	function statusBadge(status: OrderStatus) {
		if (status === 'delivered') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
		if (status === 'cancelled') return 'bg-rose-100 text-rose-700 border-rose-200';
		if (status === 'shipped') return 'bg-blue-100 text-blue-700 border-blue-200';
		return 'bg-amber-100 text-amber-700 border-amber-200';
	}

	return (
		<Layout>
			<div className="max-w-[1300px] mx-auto px-4 lg:px-6 py-8 space-y-6">
				<section className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 shadow-card">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Store Orders</h1>
							<p className="text-sm text-gray-500 mt-1">Track and process order fulfilment across statuses.</p>
						</div>
						<Link
							to="/store"
							className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50"
						>
							Back to Dashboard
						</Link>
					</div>

					<div className="mt-5 flex flex-col md:flex-row gap-3">
						<div className="relative flex-1">
							<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
							<input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search by order ID, customer name or phone"
								className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm"
							/>
						</div>
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value as 'all' | OrderStatus)}
							className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm min-w-44"
						>
							{statuses.map((status) => (
								<option key={status} value={status}>
									{status === 'all' ? 'All Status' : status}
								</option>
							))}
						</select>
					</div>
				</section>

				<section className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden">
					{loading ? (
						<p className="p-5 text-sm text-gray-500">Loading orders...</p>
					) : filteredOrders.length === 0 ? (
						<p className="p-5 text-sm text-gray-500">No orders found for your filters.</p>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead className="bg-gray-50 text-gray-500">
									<tr>
										<th className="text-left font-semibold px-4 py-3">Order</th>
										<th className="text-left font-semibold px-4 py-3">Customer</th>
										<th className="text-left font-semibold px-4 py-3">Items</th>
										<th className="text-left font-semibold px-4 py-3">Total</th>
										<th className="text-left font-semibold px-4 py-3">Status</th>
										<th className="text-left font-semibold px-4 py-3">Quick Update</th>
										<th className="text-right font-semibold px-4 py-3">Details</th>
									</tr>
								</thead>
								<tbody>
									{filteredOrders.map((order) => (
										<tr key={order.id} className="border-t border-gray-100">
											<td className="px-4 py-3 min-w-40">
												<p className="font-semibold text-gray-900">{order.id}</p>
												<p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
											</td>
											<td className="px-4 py-3 min-w-48">
												<p className="font-medium text-gray-900">{order.customerName}</p>
												<p className="text-xs text-gray-500 mt-1">{order.customerPhone}</p>
											</td>
											<td className="px-4 py-3 text-gray-600">{order.items.length}</td>
											<td className="px-4 py-3 text-gray-800 font-semibold">₹{order.total.toFixed(2)}</td>
											<td className="px-4 py-3">
												<span className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold ${statusBadge(order.status)}`}>
													{order.status}
												</span>
											</td>
											<td className="px-4 py-3">
												<select
													value={order.status}
													onChange={(e) => changeStatus(order, e.target.value as OrderStatus)}
													className="px-2 py-1.5 rounded-md border border-gray-200 bg-white text-xs"
												>
													{statuses
														.filter((status) => status !== 'all')
														.map((status) => (
															<option key={status} value={status}>
																{status}
															</option>
														))}
												</select>
											</td>
											<td className="px-4 py-3 text-right">
												<Link
													to={`/store/orders/${order.id}`}
													className="inline-flex items-center px-3 py-1.5 rounded-md border border-gray-200 text-xs font-semibold text-gray-600 hover:text-primary hover:border-primary/30"
												>
													View
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</section>
			</div>
		</Layout>
	);
}


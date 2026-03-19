import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import {
	getStoreOrderById,
	updateStoreOrder,
	type OrderStatus,
	type StoreOrder,
} from '../../utils/api';
import { ArrowLeft, Save } from 'lucide-react';

const allStatuses: OrderStatus[] = [
	'pending',
	'confirmed',
	'packed',
	'shipped',
	'delivered',
	'cancelled',
];

export default function StoreOrderDetails() {
	const { id } = useParams();
	const [order, setOrder] = useState<StoreOrder | null>(null);
	const [status, setStatus] = useState<OrderStatus>('pending');
	const [notes, setNotes] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadOrder() {
			if (!id) {
				setLoading(false);
				return;
			}

			const data = await getStoreOrderById(id);
			if (data) {
				setOrder(data);
				setStatus(data.status);
				setNotes(data.notes);
			}
			setLoading(false);
		}

		loadOrder();
	}, [id]);

	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
		if (!order) {
			return;
		}

		const updated = await updateStoreOrder(order.id, {
			status,
			notes,
		});
		setOrder(updated);
		setMessage('Order updated successfully.');
	}

	if (loading) {
		return (
			<Layout>
				<div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
					<div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card">
						<p className="text-sm text-gray-500">Loading order details...</p>
					</div>
				</div>
			</Layout>
		);
	}

	if (!order) {
		return (
			<Layout>
				<div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
					<div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card space-y-4">
						<h1 className="text-xl font-bold text-gray-900">Order not found</h1>
						<Link to="/store/orders" className="text-sm font-semibold text-primary hover:text-primary-dark">
							Back to orders
						</Link>
					</div>
				</div>
			</Layout>
		);
	}

	const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<Layout>
			<div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8 space-y-6">
				<section className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 shadow-card">
					<Link to="/store/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-3">
						<ArrowLeft size={15} /> Back to orders
					</Link>
					<h1 className="text-2xl font-bold text-gray-900">{order.id}</h1>
					<p className="text-sm text-gray-500 mt-1">
						Placed on {new Date(order.createdAt).toLocaleString()} · Last updated {new Date(order.updatedAt).toLocaleString()}
					</p>
				</section>

				{message && (
					<div className="bg-primary/5 border border-primary/20 text-sm text-primary rounded-lg px-4 py-3">
						{message}
					</div>
				)}

				<section className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
					<div className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 shadow-card">
						<h2 className="text-lg font-bold text-gray-900 mb-4">Items</h2>

						<div className="space-y-3">
							{order.items.map((item) => (
								<article key={`${item.productId}-${item.productName}`} className="border border-gray-100 rounded-xl p-3 flex items-center gap-3">
									<img src={item.image} alt={item.productName} className="w-14 h-14 rounded-lg border border-gray-100 bg-gray-50 object-contain p-1" />
									<div className="flex-1">
										<p className="font-semibold text-gray-900 text-sm">{item.productName}</p>
										<p className="text-xs text-gray-500 mt-1">
											Qty: {item.quantity} · ₹{item.price.toFixed(2)} each
										</p>
									</div>
									<p className="font-semibold text-gray-900 text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
								</article>
							))}
						</div>

						<div className="mt-5 border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
							<p className="flex justify-between">
								<span>Subtotal</span>
								<strong className="text-gray-800">₹{subtotal.toFixed(2)}</strong>
							</p>
							<p className="flex justify-between">
								<span>Shipping</span>
								<strong className="text-gray-800">₹{order.shippingCharge.toFixed(2)}</strong>
							</p>
							<p className="flex justify-between text-base">
								<span className="font-semibold text-gray-900">Order Total</span>
								<strong className="text-gray-900">₹{order.total.toFixed(2)}</strong>
							</p>
						</div>
					</div>

					<div className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 shadow-card">
						<h2 className="text-lg font-bold text-gray-900 mb-4">Customer & Fulfilment</h2>

						<div className="space-y-2 text-sm text-gray-600 mb-5">
							<p><span className="text-gray-400">Name:</span> {order.customerName}</p>
							<p><span className="text-gray-400">Email:</span> {order.customerEmail}</p>
							<p><span className="text-gray-400">Phone:</span> {order.customerPhone}</p>
							<p><span className="text-gray-400">Address:</span> {order.shippingAddress}</p>
							<p><span className="text-gray-400">Payment:</span> {order.paymentMethod} ({order.paymentStatus})</p>
						</div>

						<form onSubmit={handleSave} className="space-y-4">
							<label className="text-sm text-gray-600 block">
								Order Status
								<select
									value={status}
									onChange={(e) => setStatus(e.target.value as OrderStatus)}
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white"
								>
									{allStatuses.map((value) => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</select>
							</label>

							<label className="text-sm text-gray-600 block">
								Internal Notes
								<textarea
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 min-h-24"
									placeholder="Packaging, delivery notes, customer requests..."
								/>
							</label>

							<button
								type="submit"
								className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
							>
								<Save size={16} /> Save Updates
							</button>
						</form>
					</div>
				</section>
			</div>
		</Layout>
	);
}


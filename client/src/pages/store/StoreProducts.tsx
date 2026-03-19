import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import {
	createStoreProduct,
	deleteStoreProduct,
	getStoreProducts,
	updateStoreProduct,
	type ProductStatus,
	type StoreProduct,
} from '../../utils/api';
import { Plus, Search, Pencil, Trash2, Eye } from 'lucide-react';

type ProductFormState = {
	id?: number;
	name: string;
	sku: string;
	category: string;
	price: string;
	mrp: string;
	stock: string;
	status: ProductStatus;
	image: string;
	description: string;
	tags: string;
};

const emptyForm: ProductFormState = {
	name: '',
	sku: '',
	category: '',
	price: '',
	mrp: '',
	stock: '',
	status: 'draft',
	image: '',
	description: '',
	tags: '',
};

export default function StoreProducts() {
	const [products, setProducts] = useState<StoreProduct[]>([]);
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState<'all' | ProductStatus>('all');
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [message, setMessage] = useState('');
	const [form, setForm] = useState<ProductFormState>(emptyForm);

	async function loadProducts() {
		const data = await getStoreProducts();
		setProducts(data);
		setLoading(false);
	}

	useEffect(() => {
		loadProducts();
	}, []);

	const filteredProducts = useMemo(() => {
		const q = search.toLowerCase().trim();
		return products.filter((item) => {
			const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
			const matchesSearch =
				!q ||
				item.name.toLowerCase().includes(q) ||
				item.sku.toLowerCase().includes(q) ||
				item.category.toLowerCase().includes(q);

			return matchesStatus && matchesSearch;
		});
	}, [products, search, statusFilter]);

	function openCreateForm() {
		setForm(emptyForm);
		setMessage('');
		setShowForm(true);
	}

	function openEditForm(product: StoreProduct) {
		setForm({
			id: product.id,
			name: product.name,
			sku: product.sku,
			category: product.category,
			price: String(product.price),
			mrp: String(product.mrp),
			stock: String(product.stock),
			status: product.status,
			image: product.image,
			description: product.description,
			tags: product.tags.join(', '),
		});
		setMessage('');
		setShowForm(true);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSaving(true);
		setMessage('');

		const payload = {
			name: form.name.trim(),
			sku: form.sku.trim(),
			category: form.category.trim(),
			price: Number(form.price),
			mrp: Number(form.mrp),
			stock: Number(form.stock),
			status: form.status,
			image: form.image.trim(),
			description: form.description.trim(),
			tags: form.tags
				.split(',')
				.map((tag) => tag.trim())
				.filter(Boolean),
		};

		try {
			if (form.id) {
				await updateStoreProduct(form.id, payload);
				setMessage('Product updated successfully.');
			} else {
				await createStoreProduct(payload);
				setMessage('Product created successfully.');
			}

			setShowForm(false);
			setForm(emptyForm);
			await loadProducts();
		} catch {
			setMessage('Unable to save product right now.');
		} finally {
			setSaving(false);
		}
	}

	async function handleDelete(id: number) {
		const isConfirmed = window.confirm('Delete this product? This action cannot be undone.');
		if (!isConfirmed) {
			return;
		}

		await deleteStoreProduct(id);
		await loadProducts();
	}

	function statusBadge(status: ProductStatus) {
		if (status === 'active') {
			return 'bg-emerald-100 text-emerald-700 border-emerald-200';
		}
		if (status === 'out-of-stock') {
			return 'bg-rose-100 text-rose-700 border-rose-200';
		}
		return 'bg-amber-100 text-amber-700 border-amber-200';
	}

	return (
		<Layout>
			<div className="max-w-[1300px] mx-auto px-4 lg:px-6 py-8 space-y-6">
				<section className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 shadow-card">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Store Products</h1>
							<p className="text-sm text-gray-500 mt-1">
								Create and manage product details, pricing, and stock.
							</p>
						</div>
						<button
							type="button"
							onClick={openCreateForm}
							className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
						>
							<Plus size={16} /> Add Product
						</button>
					</div>

					<div className="mt-5 flex flex-col md:flex-row gap-3">
						<div className="relative flex-1">
							<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
							<input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search by name, sku or category"
								className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm"
							/>
						</div>
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value as 'all' | ProductStatus)}
							className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm min-w-44"
						>
							<option value="all">All Status</option>
							<option value="active">Active</option>
							<option value="draft">Draft</option>
							<option value="out-of-stock">Out of Stock</option>
						</select>
					</div>
				</section>

				{message && (
					<div className="bg-primary/5 border border-primary/20 text-sm text-primary rounded-lg px-4 py-3">
						{message}
					</div>
				)}

				<section className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden">
					{loading ? (
						<p className="p-5 text-sm text-gray-500">Loading products...</p>
					) : filteredProducts.length === 0 ? (
						<p className="p-5 text-sm text-gray-500">No products found for your filters.</p>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead className="bg-gray-50 text-gray-500">
									<tr>
										<th className="text-left font-semibold px-4 py-3">Product</th>
										<th className="text-left font-semibold px-4 py-3">Price</th>
										<th className="text-left font-semibold px-4 py-3">Stock</th>
										<th className="text-left font-semibold px-4 py-3">Status</th>
										<th className="text-left font-semibold px-4 py-3">Updated</th>
										<th className="text-right font-semibold px-4 py-3">Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredProducts.map((product) => (
										<tr key={product.id} className="border-t border-gray-100">
											<td className="px-4 py-3 min-w-72">
												<div className="flex items-center gap-3">
													<img
														src={product.image}
														alt={product.name}
														className="w-12 h-12 rounded-lg bg-gray-50 object-contain border border-gray-100"
													/>
													<div>
														<p className="font-semibold text-gray-900">{product.name}</p>
														<p className="text-xs text-gray-500">{product.sku} · {product.category}</p>
													</div>
												</div>
											</td>
											<td className="px-4 py-3 text-gray-700">₹{product.price.toFixed(2)}</td>
											<td className="px-4 py-3 text-gray-700">{product.stock}</td>
											<td className="px-4 py-3">
												<span className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold ${statusBadge(product.status)}`}>
													{product.status}
												</span>
											</td>
											<td className="px-4 py-3 text-gray-500 whitespace-nowrap">
												{new Date(product.updatedAt).toLocaleDateString()}
											</td>
											<td className="px-4 py-3">
												<div className="flex justify-end gap-2">
													<Link
														to={`/store/products/${product.id}`}
														className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:text-primary hover:border-primary/30"
														title="View product"
													>
														<Eye size={14} />
													</Link>
													<button
														type="button"
														onClick={() => openEditForm(product)}
														className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:text-primary hover:border-primary/30"
														title="Edit product"
													>
														<Pencil size={14} />
													</button>
													<button
														type="button"
														onClick={() => handleDelete(product.id)}
														className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:text-danger hover:border-danger/30"
														title="Delete product"
													>
														<Trash2 size={14} />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</section>

				{showForm && (
					<div
						className="fixed inset-0 z-50 bg-black/45 p-4 overflow-y-auto"
						onClick={() => setShowForm(false)}
					>
						<div
							className="max-w-3xl mx-auto mt-8 bg-white rounded-2xl border border-gray-100 p-5 lg:p-6 shadow-elevated"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex items-center justify-between mb-5">
								<h2 className="text-lg font-bold text-gray-900">
									{form.id ? 'Edit Product' : 'Create Product'}
								</h2>
								<button
									type="button"
									onClick={() => setShowForm(false)}
									className="text-sm text-gray-500 hover:text-gray-800"
								>
									Close
								</button>
							</div>

							<form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
								<label className="text-sm text-gray-600 md:col-span-2">
									Product Name
									<input
										className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200"
										value={form.name}
										onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
										required
									/>
								</label>

								<label className="text-sm text-gray-600">
									SKU
									<input
										className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200"
										value={form.sku}
										onChange={(e) => setForm((prev) => ({ ...prev, sku: e.target.value }))}
										required
									/>
								</label>

								<label className="text-sm text-gray-600">
									Category
									<input
										className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200"
										value={form.category}
										onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
										required
									/>
								</label>

								<label className="text-sm text-gray-600">
									Selling Price
									<input
										type="number"
										min="1"
										step="0.01"
										className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200"
										value={form.price}
										onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
										required
									/>
								</label>

								<label className="text-sm text-gray-600">
									MRP
									<input
										type="number"
										min="1"
										step="0.01"
										className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200"
										value={form.mrp}
										onChange={(e) => setForm((prev) => ({ ...prev, mrp: e.target.value }))}
										required
									/>
								</label>

								<label className="text-sm text-gray-600">
									Stock
									<input
										type="number"
										min="0"
										className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200"
										value={form.stock}
										onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
										required
									/>
								</label>

								<label className="text-sm text-gray-600">
									Status
									<select
										className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white"
										value={form.status}
										onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as ProductStatus }))}
									>
										<option value="active">Active</option>
										<option value="draft">Draft</option>
										<option value="out-of-stock">Out of Stock</option>
									</select>
								</label>

								<label className="text-sm text-gray-600 md:col-span-2">
									Product Image URL
									<input
										className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200"
										value={form.image}
										onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
										placeholder="Paste an image URL"
										required
									/>
								</label>

								<label className="text-sm text-gray-600 md:col-span-2">
									Description
									<textarea
										className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 min-h-24"
										value={form.description}
										onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
										required
									/>
								</label>

								<label className="text-sm text-gray-600 md:col-span-2">
									Tags (comma separated)
									<input
										className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200"
										value={form.tags}
										onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
										placeholder="electronics, premium, top-seller"
									/>
								</label>

								<div className="md:col-span-2 flex items-center gap-3 mt-1">
									<button
										type="submit"
										disabled={saving}
										className="px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-dark disabled:opacity-70"
									>
										{saving ? 'Saving...' : form.id ? 'Update Product' : 'Create Product'}
									</button>
									<button
										type="button"
										onClick={() => setShowForm(false)}
										className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50"
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}


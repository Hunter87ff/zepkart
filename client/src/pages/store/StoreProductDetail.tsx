import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import {
	deleteStoreProduct,
	getStoreProductById,
	updateStoreProduct,
	type ProductStatus,
	type StoreProduct,
} from '../../utils/api';
import { ArrowLeft, Pencil, Save, Trash2 } from 'lucide-react';

export default function StoreProductDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const productId = id as string;

	const [product, setProduct] = useState<StoreProduct | null>(null);
	const [price, setPrice] = useState('');
	const [mrp, setMrp] = useState('');
	const [stock, setStock] = useState('');
	const [status, setStatus] = useState<ProductStatus>('draft');
	const [description, setDescription] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadProduct() {
			if (!productId) {
				setLoading(false);
				return;
			}

			try {
                const data = await getStoreProductById(productId);
                if (data) {
                    setProduct(data);
                    setPrice(String(data.price));
                    setMrp(String(data.mrp || data.price));
                    setStock(String(data.stock));
                    setStatus(data.status || 'draft');
                    setDescription(data.description);
                }
            } catch (error) {
                console.error('Failed to load product:', error);
            } finally {
                setLoading(false);
            }
		}

		loadProduct();
	}, [productId]);

	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
		if (!product) {
			return;
		}

		try {
            const updated = await updateStoreProduct(product._id || product.id!, {
                price: Number(price),
                mrp: Number(mrp),
                stock: Number(stock),
                status,
                description,
            });
            setProduct(updated);
            setMessage('Product information updated.');
        } catch (error) {
            console.error('Failed to update product:', error);
            setMessage('Failed to update product.');
        }
	}

	async function handleDelete() {
		if (!product) {
			return;
		}

		const isConfirmed = window.confirm('Delete this product permanently?');
		if (!isConfirmed) {
			return;
		}

		try {
            await deleteStoreProduct(product._id || product.id!);
            navigate('/store/products');
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product.');
        }
	}

	if (loading) {
		return (
			<Layout>
				<div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
					<div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card">
						<p className="text-sm text-gray-500">Loading product details...</p>
					</div>
				</div>
			</Layout>
		);
	}

	if (!product) {
		return (
			<Layout>
				<div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
					<div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-card space-y-4">
						<h1 className="text-xl font-bold text-gray-900">Product not found</h1>
						<Link to="/store/products" className="text-sm font-semibold text-primary hover:text-primary-dark">
							Back to products
						</Link>
					</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8 space-y-6">
				<section className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 shadow-card">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<Link to="/store/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-3">
								<ArrowLeft size={15} /> Back to products
							</Link>
							<h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
							<p className="text-sm text-gray-500 mt-1">SKU: {product.sku || 'N/A'} · {(product.categories || []).join(', ')}</p>
						</div>
						<button
							type="button"
							onClick={handleDelete}
							className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:text-danger hover:border-danger/30 text-sm font-semibold"
						>
							<Trash2 size={16} /> Delete Product
						</button>
					</div>
				</section>

				{message && (
					<div className="bg-primary/5 border border-primary/20 text-sm text-primary rounded-lg px-4 py-3">
						{message}
					</div>
				)}

				<section className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
					<article className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 shadow-card">
						<img 
                            src={product.image || (product.images?.[0] || '')} 
                            alt={product.name} 
                            className="w-full max-h-[340px] object-contain bg-gray-50 border border-gray-100 rounded-xl p-6" 
                        />

						<div className="mt-5 space-y-3 text-sm text-gray-600">
							<p>
								<span className="text-gray-400">Created:</span>{' '}
								{new Date(product.createdAt || '').toLocaleString()}
							</p>
							<p>
								<span className="text-gray-400">Last Updated:</span>{' '}
								{new Date(product.updatedAt || '').toLocaleString()}
							</p>
							<p>
								<span className="text-gray-400">Units Sold:</span>{' '}
								<strong className="text-gray-800">{product.sales || 0}</strong>
							</p>
							<div>
								<p className="text-gray-400 mb-1">Tags:</p>
								<div className="flex flex-wrap gap-2">
									{!product.tags || product.tags.length === 0 ? (
										<span className="text-xs text-gray-500">No tags</span>
									) : (
										product.tags.map((tag) => (
											<span key={tag} className="px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-600">
												{tag}
											</span>
										))
									)}
								</div>
							</div>
						</div>
					</article>

					<form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 shadow-card space-y-4">
						<h2 className="text-lg font-bold text-gray-900 inline-flex items-center gap-2">
							<Pencil size={16} /> Edit Listing
						</h2>

						<div className="grid md:grid-cols-2 gap-4">
							<label className="text-sm text-gray-600">
								Selling Price
								<input
									type="number"
									min="1"
									step="0.01"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200"
									required
								/>
							</label>

							<label className="text-sm text-gray-600">
								MRP
								<input
									type="number"
									min="1"
									step="0.01"
									value={mrp}
									onChange={(e) => setMrp(e.target.value)}
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200"
									required
								/>
							</label>

							<label className="text-sm text-gray-600">
								Stock
								<input
									type="number"
									min="0"
									value={stock}
									onChange={(e) => setStock(e.target.value)}
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200"
									required
								/>
							</label>

							<label className="text-sm text-gray-600">
								Status
								<select
									value={status}
									onChange={(e) => setStatus(e.target.value as ProductStatus)}
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white"
								>
									<option value="active">Active</option>
									<option value="draft">Draft</option>
									<option value="out-of-stock">Out of Stock</option>
								</select>
							</label>

							<label className="text-sm text-gray-600 md:col-span-2">
								Description
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="mt-1.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 min-h-28"
									required
								/>
							</label>
						</div>

						<button
							type="submit"
							className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
						>
							<Save size={16} /> Save Changes
						</button>
					</form>
				</section>
			</div>
		</Layout>
	);
}


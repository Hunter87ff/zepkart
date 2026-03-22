import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, Camera, ShieldCheck, ShoppingBag, MapPin, Edit3 } from 'lucide-react';
import apiClient from '../utils/api-client';

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setAvatar(user.avatar);
        }
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        setFieldErrors({});

        try {
            // hitting /users/ PUT
            await apiClient.put('/users/', { name, email, phone, avatar });
            await refreshUser();
            setMessage('Profile updated successfully!');
        } catch (error: any) {
            console.error('Update failed:', error);
            const errResponse = error.response?.data;
            if (errResponse?.status === 400 && Array.isArray(errResponse.data)) {
                const errors: Record<string, string> = {};
                errResponse.data.forEach((err: any) => {
                    if (Array.isArray(err.path) && err.path.length > 0) {
                        errors[err.path[0]] = err.message;
                    }
                });
                setFieldErrors(errors);
                setMessage('Please fix the validation errors.');
            } else {
                setMessage(errResponse?.message || 'Failed to update profile');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 max-w-[1000px] mx-auto px-4 lg:px-6 py-8 w-full">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
                    {/* Profile Summary Card */}
                    <div className="space-y-6">
                        <section className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
                            <div className="relative inline-block mb-4">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-50 mx-auto transition-transform group-hover:scale-105">
                                    <img src={avatar} alt={name} className="w-full h-full object-cover" />
                                </div>
                                <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary-dark transition-all scale-0 group-hover:scale-100 duration-200">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                            <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
                                <Mail size={14} /> {email}
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-2">
                                {user?.permissions?.map(p => {
                                    const levels: any = { 777: 'Admin', 444: 'Seller', 333: 'Member' };
                                    return levels[p] && (
                                        <span key={p} className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                                            {levels[p]}
                                        </span>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-primary" />
                                Account Activity
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <ShoppingBag size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 tracking-tight">Orders placed</p>
                                        <p className="text-xs text-gray-500">View your transaction history</p>
                                    </div>
                                    <span className="ml-auto font-bold text-gray-900">12</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 tracking-tight">Saved Addresses</p>
                                        <p className="text-xs text-gray-500">Manage delivery locations</p>
                                    </div>
                                    <span className="ml-auto font-bold text-gray-900">2</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Edit Profile Form */}
                    <section className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm h-fit">
                        <div className="flex items-center gap-2 mb-8 border-b border-gray-50 pb-6">
                            <Edit3 size={22} className="text-primary" />
                            <h2 className="text-xl font-bold text-gray-900">Edit Profile Details</h2>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                        <User size={16} className="text-gray-400" /> Full Name
                                    </span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`px-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-gray-800 ${
                                            fieldErrors.name ? 'border-rose-300 ring-rose-300' : 'border-gray-200'
                                        }`}
                                        placeholder="Enter your name"
                                        required
                                    />
                                    {fieldErrors.name && (
                                        <p className="text-[10px] text-rose-500 font-bold ml-1">{fieldErrors.name}</p>
                                    )}
                                </label>

                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                        <Mail size={16} className="text-gray-400" /> Email Address
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 cursor-not-allowed text-gray-400"
                                        placeholder="Enter your email"
                                        disabled
                                        readOnly
                                    />
                                </label>

                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                        <Phone size={16} className="text-gray-400" /> Phone Number
                                    </span>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={`px-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-gray-800 ${
                                            fieldErrors.phone ? 'border-rose-300 ring-rose-300' : 'border-gray-200'
                                        }`}
                                        placeholder="10-digit phone number"
                                        required
                                    />
                                    {fieldErrors.phone && (
                                        <p className="text-[10px] text-rose-500 font-bold ml-1">{fieldErrors.phone}</p>
                                    )}
                                </label>

                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                        <Camera size={16} className="text-gray-400" /> Avatar URL
                                    </span>
                                    <input
                                        type="url"
                                        value={avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                        className={`px-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-gray-800 ${
                                            fieldErrors.avatar ? 'border-rose-300 ring-rose-300' : 'border-gray-200'
                                        }`}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {fieldErrors.avatar && (
                                        <p className="text-[10px] text-rose-500 font-bold ml-1">{fieldErrors.avatar}</p>
                                    )}
                                </label>
                            </div>

                            <div className="pt-6 mt-6 border-t border-gray-50 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-95 disabled:opacity-50"
                                >
                                    {saving ? 'Saving Changes...' : 'Save Profile'}
                                </button>
                                {message && (
                                    <span className={`text-sm font-bold ${message.includes('success') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {message}
                                    </span>
                                )}
                            </div>
                        </form>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import loginBg from '../assets/login-bg.png';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({ name, email, phone, password });
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-[960px] bg-white rounded-2xl shadow-elevated overflow-hidden flex min-h-[580px]">
        {/* Left Panel - Branding */}
        <div className="hidden md:flex md:w-[42%] relative bg-gradient-to-b from-primary to-[#1a5dc8] flex-col justify-between p-8 text-white overflow-hidden">
          {/* Background Image */}
          <img
            src={loginBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          />

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 mb-16">
              <div className="bg-yellow text-gray-900 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                Z
              </div>
              <span className="text-lg font-bold">Zepkart</span>
            </Link>

            <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
              Shop Smart,
              <br />
              Live Better.
            </h1>
            <p className="text-white/70 text-sm leading-relaxed max-w-[300px]">
              Join millions of shoppers discovering the best deals on
              electronics, fashion, and home goods every day.
            </p>
          </div>

          {/* Testimonial */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-yellow text-xs">★★★★★</div>
              <span className="text-white/60 text-xs">
                Trusted by 2M+ users
              </span>
            </div>
            <p className="text-sm text-white/80 italic leading-relaxed">
              "The fastest delivery I've ever experienced. Zepkart is my go-to
              for everything tech."
            </p>
          </div>

          {/* Footer Links */}
          <div className="relative z-10 flex gap-4 mt-6 text-xs text-white/50">
            <a href="#" className="hover:text-white/80 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              Help Center
            </a>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-10">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              id="tab-login"
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-3 text-base font-semibold transition-colors relative ${
                isLogin ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Log In
              {isLogin && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full" />
              )}
            </button>
            <button
              id="tab-signup"
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-3 text-base font-semibold transition-colors relative ${
                !isLogin ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Sign Up
              {!isLogin && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full" />
              )}
            </button>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {isLogin ? 'Welcome back!' : 'Create an account'}
            </h2>
            <p className="text-gray-400 text-sm">
              {isLogin
                ? 'Please enter your details to sign in.'
                : 'Fill in your details to get started.'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(40,116,240,0.1)] transition-all">
                    <User size={18} className="text-gray-400 mr-3 shrink-0" />
                    <input
                      id="input-name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 text-sm text-gray-800 placeholder:text-gray-300 bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(40,116,240,0.1)] transition-all">
                    <Phone size={18} className="text-gray-400 mr-3 shrink-0" />
                    <input
                      id="input-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 text-sm text-gray-800 placeholder:text-gray-300 bg-transparent"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(40,116,240,0.1)] transition-all">
                <Mail size={18} className="text-gray-400 mr-3 shrink-0" />
                <input
                  id="input-email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-sm text-gray-800 placeholder:text-gray-300 bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(40,116,240,0.1)] transition-all">
                <Lock size={18} className="text-gray-400 mr-3 shrink-0" />
                <input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 text-sm text-gray-800 placeholder:text-gray-300 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              id="auth-submit"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-yellow hover:bg-yellow-dark text-gray-900 font-bold text-base rounded-xl transition-all duration-250 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0 disabled:shadow-none"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <button
              id="auth-google"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              id="auth-apple"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple
            </button>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
            By continuing, you agree to Zepkart's{' '}
            <a href="#" className="text-primary hover:underline">
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

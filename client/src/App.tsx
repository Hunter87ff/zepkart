import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import BecomeSellerPage from './pages/BecomeSellerPage';
import HelpCenterPage from './pages/HelpCenterPage';
import CareersPage from './pages/CareersPage';
import ShippingPage from './pages/ShippingPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import Store from './pages/store/Store';
import StoreProducts from './pages/store/StoreProducts';
import StoreProductDetail from './pages/store/StoreProductDetail';
import StoreOrders from './pages/store/StoreOrders';
import StoreOrderDetails from './pages/store/StoreOrderDetails';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/become-seller" element={<BecomeSellerPage />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          
          {/* Store Routes - Protected */}
          <Route 
            path="/store" 
            element={
              <ProtectedRoute requireStoreOwner>
                <Store />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/store/products" 
            element={
              <ProtectedRoute requireStoreOwner>
                <StoreProducts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/store/products/:id" 
            element={
              <ProtectedRoute requireStoreOwner>
                <StoreProductDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/store/orders" 
            element={
              <ProtectedRoute requireStoreOwner>
                <StoreOrders />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/store/orders/:id" 
            element={
              <ProtectedRoute requireStoreOwner>
                <StoreOrderDetails />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

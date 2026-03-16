import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import DealsOfTheDay from '../components/DealsOfTheDay/DealsOfTheDay';
import FeaturedCategories from '../components/FeaturedCategories/FeaturedCategories';
import RecommendedProducts from '../components/RecommendedProducts/RecommendedProducts';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <DealsOfTheDay />
        <FeaturedCategories />
        <RecommendedProducts />
      </main>
      <Footer />
    </>
  );
}

import fashionImg from '../../assets/fashion-category.png';
import electronicsImg from '../../assets/electronics-category.png';
import homeLivingImg from '../../assets/home-living-category.png';

const categories = [
  {
    id: 1,
    title: 'Fashion Trends',
    subtitle: 'Up to 60% off on top brands',
    image: fashionImg,
    cta: 'Explore',
    gradient: 'from-amber-900/70 to-transparent',
  },
  {
    id: 2,
    title: 'Electronics Hub',
    subtitle: 'Latest gadgets & accessories',
    image: electronicsImg,
    cta: 'Shop Now',
    gradient: 'from-teal-900/70 to-transparent',
  },
  {
    id: 3,
    title: 'Home & Living',
    subtitle: 'Refresh your space',
    image: homeLivingImg,
    cta: 'Browse',
    gradient: 'from-emerald-900/70 to-transparent',
  },
];

export default function FeaturedCategories() {
  return (
    <section id="featured-categories" className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Featured Categories
        </h2>
        <div className="w-12 h-1 bg-primary rounded-full mt-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group relative rounded-2xl overflow-hidden h-[220px] sm:h-[240px] cursor-pointer"
          >
            {/* Image */}
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              <h3 className="text-xl font-bold text-white mb-1 italic">
                {cat.title}
              </h3>
              <p className="text-white/70 text-sm mb-3">{cat.subtitle}</p>
              <button className="px-5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold rounded-lg border border-white/20 transition-all duration-250 hover:-translate-y-0.5">
                {cat.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

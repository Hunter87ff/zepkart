import { useState, useEffect } from 'react';
import heroBanner from '../../assets/hero-banner.png';

const slides = [
    {
        id: 1,
        badge: 'LIMITED TIME OFFER',
        title: 'Mega Electronics',
        subtitle: 'Summer Sale',
        description:
            'Get up to 50% off on top brands. Laptops, smartphones, and accessories at unbeatable prices.',
        image: heroBanner,
        primaryCta: 'Shop Now',
        secondaryCta: 'View Deals',
    },
    {
        id: 2,
        badge: 'NEW ARRIVALS',
        title: 'Fashion Forward',
        subtitle: 'Spring Collection',
        description:
            'Discover the latest trends in fashion. Premium brands at exclusive prices just for you.',
        image: heroBanner,
        primaryCta: 'Explore Now',
        secondaryCta: 'See Collection',
    },
    {
        id: 3,
        badge: 'SPECIAL DEALS',
        title: 'Home Essentials',
        subtitle: 'Big Savings',
        description:
            'Transform your space with our curated home & living collection. Up to 60% off on furniture.',
        image: heroBanner,
        primaryCta: 'Shop Now',
        secondaryCta: 'Browse Deals',
    },
];

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const slide = slides[currentSlide];

    return (
        <section id="hero-banner" className="px-4 lg:px-6 py-4 max-w-350 mx-auto w-full">
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-[#0a7e8c] to-[#48b8a0] min-h-70 sm:min-h-85">
                {/* Background Image */}
                <img
                    src={slide.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                />

                {/* Content */}
                <div className="relative backdrop-blur-sm bg-black/10 z-10 flex flex-col justify-center items-center text-center lg:items-start lg:text-left h-full px-4 sm:px-10 lg:px-20 py-12 lg:py-16 max-w-full">
                    <span className="inline-block bg-yellow/90 text-gray-900 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-md mb-4 uppercase tracking-wide w-fit">
                        {slide.badge}
                    </span>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-2 max-w-[15ch] lg:max-w-none">
                        {slide.title}
                    </h1>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-yellow italic mb-5 leading-tight">
                        {slide.subtitle}
                    </h2>

                    <p className="text-white/90 text-sm sm:text-base mb-8 leading-relaxed max-w-md lg:max-w-lg hidden sm:block">
                        {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button
                            id="hero-primary-cta"
                            className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold transition-all duration-250 hover:shadow-lg shadow-md active:scale-95"
                        >
                            {slide.primaryCta}
                        </button>
                        <button
                            id="hero-secondary-cta"
                            className="px-8 py-3.5 bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-xl text-sm font-bold backdrop-blur-md transition-all duration-250 active:scale-95"
                        >
                            {slide.secondaryCta}
                        </button>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide
                                    ? 'w-8 bg-yellow'
                                    : 'w-2 bg-white/40 hover:bg-white/60'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

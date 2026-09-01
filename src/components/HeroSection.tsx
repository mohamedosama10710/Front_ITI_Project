import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Apple } from 'lucide-react';
import { useGetProductsQuery } from "../store/api/productApi";

export const HeroSection: React.FC = () => {
    const { data: products = [], isLoading } = useGetProductsQuery();

    // Extract unique categories dynamically from API product data
    const dynamicCategories = Array.from(
        new Set(products.map((p) => p.category))
    ).filter(Boolean);

    // Fallback defaults in case products are loading or empty
    const defaultCategories = [
        "Woman's Fashion",
        "Men's Fashion",
        "Electronics",
        "Home & Lifestyle",
        "Medicine",
        "Sports & Outdoor",
        "Baby's & Toys",
        "Groceries & Pets",
        "Health & Beauty",
    ];

    const categories = dynamicCategories.length > 0 ? dynamicCategories : defaultCategories;

    console.log(dynamicCategories);


    return (
        <section className="pt-2 sm:pt-4 pb-6 sm:pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

                {/* Category Sidebar */}
                <aside className="lg:col-span-2 lg:border-r border-gray-200 lg:pr-6  pt-2">
                    {isLoading ? (
                        <div className="space-y-3 animate-pulse flex flex-row lg:flex-col  justify-between">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="h-5 bg-secondary rounded w-3/4"></div>
                            ))}
                        </div>
                    ) : (
                        <ul className="space-y-3 text-sm sm:text-base font-normal flex flex-row lg:flex-col  justify-between text-text-2">
                            {categories.map((category) => {
                                const hasSubcategories =
                                    category === "Woman's Fashion" || category === "Men's Fashion";

                                return (
                                    <li key={category}>
                                        <Link
                                            to={`/category/${encodeURIComponent(category.toLowerCase())}`}
                                            className="flex items-center justify-between hover:text-secondary-2 transition-colors duration-200 group py-0.5"
                                        >
                                            <span>{category}</span>
                                            {hasSubcategories && (
                                                <ChevronRight className="w-4 h-4 text-text-2 group-hover:text-secondary-2 transition-colors" />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </aside>

                {/* Hero Banner Slider Area */}
                <div className="lg:col-span-10 bg-black text-text p-6 sm:p-10 lg:p-12 rounded-sm flex flex-row items-center justify-between relative overflow-hidden min-h-[300px] sm:min-h-[340px]">

                    {/* Banner Content Left */}
                    <div className="flex flex-col items-start gap-4 z-10 max-w-md">
                        <div className="flex items-center gap-3">
                            <Apple className="w-10 h-10 fill-white text-white" />
                            <span className="text-sm sm:text-base font-light tracking-wide text-text">
                                iPhone 14 Series
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-wide text-text">
                            Up to 10% off Voucher
                        </h1>

                        <Link
                            to="/category/electronics"
                            className="inline-flex items-center gap-2 font-medium text-sm sm:text-base text-text border-b border-text pb-1 hover:text-secondary-2 hover:border-secondary-2 transition-colors group mt-2"
                        >
                            <span>Shop Now</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Banner Image Right (Placeholder / Static Frame) */}
                    <div className="mt-6 md:mt-0 flex items-center justify-center relative z-10">
                        <img
                            src="header/hero_endframe__cvklg0xk3w6e_large 2.jpg"
                            alt="iPhone 14 Promotional Banner"
                            className="max-h-[200px] sm:max-h-[260px] max-w-[496px] object-contain"
                        />
                    </div>

                    {/* Slider Pagination Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary-2 border-2 border-white cursor-pointer"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-gray-500 opacity-50 cursor-pointer hover:opacity-100 transition-opacity"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-gray-500 opacity-50 cursor-pointer hover:opacity-100 transition-opacity"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-gray-500 opacity-50 cursor-pointer hover:opacity-100 transition-opacity"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-gray-500 opacity-50 cursor-pointer hover:opacity-100 transition-opacity"></span>
                    </div>
                </div>

            </div>
        </section>
    );
};
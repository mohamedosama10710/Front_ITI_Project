import React from 'react';
import { Link } from 'react-router-dom';

export const NewArrival: React.FC = () => {
  return (
    <section className="py-8">
      {/* Header */}
      <div className="space-y-2 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-5 h-10 bg-secondary-2 rounded-sm" />
          <span className="text-secondary-2 font-semibold text-sm sm:text-base">
            Featured
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-text-2">
          New Arrival
        </h2>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[550px]">
        
        {/* Large Featured Card: PlayStation 5 */}
        <div className="relative bg-black rounded-sm overflow-hidden group flex items-end p-6 sm:p-8 min-h-[350px] lg:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80"
            alt="PlayStation 5"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="relative z-10 space-y-3 max-w-sm">
            <h3 className="text-2xl sm:text-3xl font-semibold text-text">
              PlayStation 5
            </h3>
            <p className="text-sm text-gray-300 font-normal leading-relaxed">
              Black and White version of the PS5 coming out on sale.
            </p>
            <Link
              to="/category/gaming"
              className="inline-block text-text font-medium text-base border-b border-white pb-0.5 hover:text-secondary-2 hover:border-secondary-2 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right Multi-Card Column */}
        <div className="flex flex-col gap-6">
          
          {/* Top Card: Women's Collections */}
          <div className="relative bg-[#0D0D0D] rounded-sm overflow-hidden group flex items-end p-6 min-h-[260px] flex-1">
            <img
              src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80"
              alt="Women's Collections"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="relative z-10 space-y-2 max-w-xs">
              <h3 className="text-xl sm:text-2xl font-semibold text-text">
                Women’s Collections
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-normal">
                Featured woman collections that give you another vibe.
              </p>
              <Link
                to="/category/woman's%20fashion"
                className="inline-block text-text font-medium text-sm sm:text-base border-b border-white pb-0.5 hover:text-secondary-2 hover:border-secondary-2 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Bottom Dual Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            
            {/* Speakers Card */}
            <div className="relative bg-black rounded-sm overflow-hidden group flex items-end p-6 min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80"
                alt="Speakers"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="relative z-10 space-y-1.5">
                <h3 className="text-lg font-semibold text-text">Speakers</h3>
                <p className="text-xs text-gray-300">Amazon wireless speakers</p>
                <Link
                  to="/category/electronics"
                  className="inline-block text-text font-medium text-xs sm:text-sm border-b border-white pb-0.5 hover:text-secondary-2 hover:border-secondary-2 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Perfume Card */}
            <div className="relative bg-black rounded-sm overflow-hidden group flex items-end p-6 min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80"
                alt="Perfume"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="relative z-10 space-y-1.5">
                <h3 className="text-lg font-semibold text-text">Perfume</h3>
                <p className="text-xs text-gray-300">GUCCI INTENSE OUD EDP</p>
                <Link
                  to="/category/health%20%26%20beauty"
                  className="inline-block text-text font-medium text-xs sm:text-sm border-b border-white pb-0.5 hover:text-secondary-2 hover:border-secondary-2 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
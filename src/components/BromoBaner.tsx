import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCountdown } from '@/hooks/useCountDown';

export const PromoBanner: React.FC = () => {
  // Target date set to 5 days from initialization
  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date;
  }, []);

  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-6 sm:py-10">
      <div className="relative w-full bg-black text-white rounded-sm p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden">
        
        {/* Left Column: Text & Countdown */}
        <div className="flex flex-col items-start gap-6 z-10 max-w-xl">
          <span className="text-[#00FF66] font-semibold text-sm sm:text-base">
            Categories
          </span>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-wide leading-tight text-text">
            Enhance Your <br className="hidden sm:inline" />
            Music Experience
          </h2>

          {/* Circular Countdown Indicators */}
          <div className="flex items-center gap-3 sm:gap-4 my-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-black flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm font-bold leading-none">{formatNumber(days)}</span>
              <span className="text-[10px] text-gray-600 font-medium">Days</span>
            </div>

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-black flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm font-bold leading-none">{formatNumber(hours)}</span>
              <span className="text-[10px] text-gray-600 font-medium">Hours</span>
            </div>

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-black flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm font-bold leading-none">{formatNumber(minutes)}</span>
              <span className="text-[10px] text-gray-600 font-medium">Minutes</span>
            </div>

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-black flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm font-bold leading-none">{formatNumber(seconds)}</span>
              <span className="text-[10px] text-gray-600 font-medium">Seconds</span>
            </div>
          </div>

          {/* Buy Now CTA */}
          <Link
            to="/category/electronics"
            className="bg-[#00FF66] text-black font-semibold text-sm sm:text-base px-10 py-4 rounded hover:bg-opacity-90 transition-all duration-200 mt-2"
          >
            Buy Now!
          </Link>
        </div>

        {/* Right Column: Speaker Image with Radial Glow Backdrop */}
        <div className="relative z-10 flex items-center justify-center w-full lg:w-1/2">
          {/* Ambient Blur Glow */}
          <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] bg-white/20 blur-[80px] rounded-full pointer-events-none" />

          <img
            src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700&q=80"
            alt="JBL Boombox Speaker"
            className="relative z-10 max-h-[260px] sm:max-h-[350px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>

      </div>
    </section>
  );
};
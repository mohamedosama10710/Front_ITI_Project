import React from "react";

export const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 space-y-20">
      <nav className="text-sm text-gray-500">
        Home / <span className="text-black font-medium">About</span>
      </nav>

      {/* Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Our Story</h1>
          <p className="text-base text-gray-700 leading-relaxed">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh.
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"
            alt="About"
            className="w-full h-[400px] object-cover rounded"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded border border-gray-300 text-center space-y-2">
          <h3 className="text-3xl font-bold">10.5k</h3>
          <p className="text-sm">Sellers active our site</p>
        </div>
        <div className="p-6 rounded border bg-[#DB4444] text-white text-center space-y-2">
          <h3 className="text-3xl font-bold">33k</h3>
          <p className="text-sm">Monthly Product Sale</p>
        </div>
        <div className="p-6 rounded border border-gray-300 text-center space-y-2">
          <h3 className="text-3xl font-bold">45.5k</h3>
          <p className="text-sm">Customer active in our site</p>
        </div>
        <div className="p-6 rounded border border-gray-300 text-center space-y-2">
          <h3 className="text-3xl font-bold">25k</h3>
          <p className="text-sm">Anual gross sale in our site</p>
        </div>
      </section>

      {/* Team */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="bg-[#F5F5F5] h-[350px] rounded overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
              alt="Tom Cruise"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-xl font-bold">Tom Cruise</h3>
          <p className="text-sm text-gray-500">Founder & Chairman</p>
        </div>

        <div className="space-y-3">
          <div className="bg-[#F5F5F5] h-[350px] rounded overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
              alt="Emma Watson"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-xl font-bold">Emma Watson</h3>
          <p className="text-sm text-gray-500">Managing Director</p>
        </div>

        <div className="space-y-3">
          <div className="bg-[#F5F5F5] h-[350px] rounded overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
              alt="Will Smith"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-xl font-bold">Will Smith</h3>
          <p className="text-sm text-gray-500">Product Designer</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

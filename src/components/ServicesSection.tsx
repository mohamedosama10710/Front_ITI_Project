import React from 'react';
import { Truck, Headset, ShieldCheck } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

export const ServicesSection: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: '1',
      icon: Truck,
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
    },
    {
      id: '2',
      icon: Headset,
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
    },
    {
      id: '3',
      icon: ShieldCheck,
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days',
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className="flex flex-col items-center text-center gap-4 group"
            >
              {/* Double Circle Icon Badge */}
              <div className="w-20 h-20 rounded-full bg-gray-300/60 flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-black text-white flex items-center justify-center">
                  <IconComponent className="w-8 h-8" />
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-1">
                <h3 className="font-semibold text-lg sm:text-xl text-text-2 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-sm text-text-1 font-normal">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
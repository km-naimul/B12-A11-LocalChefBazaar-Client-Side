import React from 'react';
import { FaMobileAlt, FaUtensils, FaMotorcycle } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Order a menu",
    desc: "Our website offers a weekly menu. There is always something new to try!",
    Icon: FaMobileAlt,
  },
  {
    id: 2,
    title: "Freshly Cook",
    desc: "Let the food come to you directly from our kitchen. No traffic problem, no time wasted.",
    Icon: FaUtensils,
  },
  {
    id: 3,
    title: "Delivered to you",
    desc: "We deliver your meals to your place so that your hectic schedule is not disrupted.",
    Icon: FaMotorcycle, //className='bg-red-600 rounded-box max-w-7xl m-5 '
  },
];


const Service = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4 bg-red-600 rounded-box mt-4">
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map(({ id, title, desc, Icon }) => (
          <div
            key={id}
            className="flex flex-col items-center text-center"
          >
            {/* Illustration style circle */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-pink-50 flex items-center justify-center shadow-sm">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow">
                  <Icon className="text-4xl text-pink-500" />
                </div>
              </div>

              {/* Step number badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border-4 border-pink-100 bg-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                {id}
              </div>
            </div>

            {/* Title & text */}
            <h3 className="mt-6 text-[20px] font-semibold text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-white max-w-xs">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
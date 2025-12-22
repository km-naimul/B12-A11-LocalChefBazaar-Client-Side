import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";

import bannerImg1 from "../../../assets/chef-holding-tray-food-with-smile-it_1097192-88921-removebg-preview.png";
import bannerImg2 from "../../../assets/chef-preparing-food-in-the-kitchen-at-the-restaurant-professional-chef-cooking-gourmet-chef-cooking-in-a-commercial-kitchen-ai-generated-free-photo-removebg-preview.png";
import bannerImg4 from "../../../assets/woman-chef-serving-fresh-salad-2J3F0P6-removebg-preview.png";

import slide1 from "../../../assets/black-white-1765104225477-removebg-preview.png";
import slide2 from "../../../assets/black-white-1765104247803-removebg-preview.png";
import slide3 from "../../../assets/black-white-1765104266999-removebg-preview.png";
import slide5 from "../../../assets/black-white-1765104284453.png";
import slide6 from "../../../assets/black-white-1765104292488-removebg-preview.png";
import slide7 from "../../../assets/black-white-1765104301921.png";
import slide8 from "../../../assets/black-white-1765104311960-removebg-preview.png";
import slide9 from "../../../assets/black-white-1765104322124.png";
import slide10 from "../../../assets/ChatGPT_Image_Dec_7__2025__04_35_14_PM-removebg-preview.png";
import slide11 from "../../../assets/ChatGPT_Image_Dec_7__2025__04_42_09_PM-removebg-preview.png";

const logos = [
  slide1,
  slide2,
  slide3,
  slide5,
  slide6,
  slide7,
  slide8,
  slide9,
  slide10,
  slide11,
];

const Banner = () => {
  return (
    <div>
    
      <div className="bg-[#fcf1f1] px-4 lg:px-0">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between py-5 gap-8">

          {/* TEXT */}
          <div className="text-center lg:text-left lg:mt-2 lg:mx-30">
            <h3 className="text-4xl sm:text-5xl lg:text-[80px] font-bold leading-tight ">
              <span className="font-normal">Eat</span>
              <span className="mx-2 text-[#e10101]">Healthy,</span>
            </h3>

            <h3 className="text-4xl sm:text-5xl lg:text-[95px] font-bold leading-tight">
              <span className="font-normal">Live</span>
              <span className="mx-2 text-[#e10101]">Long,</span>
            </h3>

            <h3 className="text-4xl sm:text-5xl lg:text-[80px] font-bold leading-tight">
              <span className="font-normal">Live</span>
              <span className="mx-2 text-[#e10101]">Strong!</span>
            </h3>

            <p className="text-sm sm:text-base mt-4 text-gray-700 max-w-md mx-auto lg:mx-0">
              We cook and deliver the tastiest healthy food right away to your
              designated location.
            </p>
          </div>

         
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showArrows={false}
            >
              <div>
                <img src={bannerImg1} className="object-contain h-[300px] mx-auto" />
              </div>
              <div>
                <img src={bannerImg2} className="object-contain h-[300px] mx-auto" />
              </div>
              <div>
                <img src={bannerImg4} className="object-contain h-[300px] mx-auto" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-3">
        <h3 className="text-center text-sm sm:text-lg font-bold text-gray-500 mb-3">
          Our Satisfied Customers
        </h3>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                className="h-10 sm:h-12 object-contain opacity-70"
              />
            ))}

            {logos.map((logo, index) => (
              <img
                key={`dup-${index}`}
                src={logo}
                className="h-10 sm:h-12 object-contain opacity-70"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

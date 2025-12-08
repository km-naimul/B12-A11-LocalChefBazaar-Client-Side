import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";

import bannerImg1 from '../../../assets/chef-holding-tray-food-with-smile-it_1097192-88921-removebg-preview.png'
import bannerImg2 from '../../../assets/chef-preparing-food-in-the-kitchen-at-the-restaurant-professional-chef-cooking-gourmet-chef-cooking-in-a-commercial-kitchen-ai-generated-free-photo-removebg-preview.png'
import bannerImg4 from '../../../assets/woman-chef-serving-fresh-salad-2J3F0P6-removebg-preview.png'

import slide1 from '../../../assets/black-white-1765104225477-removebg-preview.png'
import slide2 from '../../../assets/black-white-1765104247803-removebg-preview.png'
import slide3 from '../../../assets/black-white-1765104266999-removebg-preview.png'
import slide5 from '../../../assets/black-white-1765104284453.png'
import slide6 from '../../../assets/black-white-1765104292488-removebg-preview.png'
import slide7 from '../../../assets/black-white-1765104301921.png'
import slide8 from '../../../assets/black-white-1765104311960-removebg-preview.png'
import slide9 from '../../../assets/black-white-1765104322124.png'
import slide10 from '../../../assets/ChatGPT_Image_Dec_7__2025__04_35_14_PM-removebg-preview.png'
import slide11 from '../../../assets/ChatGPT_Image_Dec_7__2025__04_42_09_PM-removebg-preview.png'

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
            <div className='flex justify-between bg-[#fcf1f1]'>
                <div className=" text-[80px] font-bold mt-10 mx-30">
                    <h3 >
                        <span className='font-normal '>Eat </span>

                        <span className='mx-5 text-[#e10101]'>Healthy,</span>
                    </h3>
                    <h3 className='-mt-10'>
                        <span className='font-normal '>Live</span>

                        <span className='mx-5 text-[#e10101]'>Long,</span>
                    </h3>
                    <h3 className='-mt-10'>
                        <span className='font-normal '>Live</span>

                        <span className='mx-5 text-[#e10101]'>Strong!</span>
                    </h3>

                    <p className='text-[16px] font-normal '>
                        We cook and deliver the tastiest healthy food right away to  <br />
                        your designated location.
                    </p>


                </div>

                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    className="w-100 h-102 object-contain mx-auto mt-5 justify-end items-end"
                >
                    <div>
                        <img src={bannerImg1} />
                    </div>
                    <div>
                        <img src={bannerImg2} />
                    </div>

                    <div>
                        <img src={bannerImg4} />
                    </div>
                </Carousel>
            </div>

            <div className=' bg-gray-50'>
                <h3 className='text-center text-[20px] font-bold text-gray-500 '>
                    Our Satisfied Customer&apos;s
                </h3>

                {/* এখানে framer motion slider */}
                <div className="mt-2 overflow-hidden ">
                    <motion.div
                        className="flex gap-20 items-center mb-2"
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
                                alt={`logo-${index}`}
                                className="h-15 w-auto object-contain opacity-500 hover:opacity-100 transition"
                            />
                        ))}

                        {/* smooth infinite effect er jonno duplicate */}
                        {logos.map((logo, index) => (
                            <img
                                key={`dup-${index}`}
                                src={logo}
                                alt={`logo-dup-${index}`}
                                className="h-15 w-auto object-contain opacity-280 hover:opacity-100 transition"
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>


    );
};

export default Banner;

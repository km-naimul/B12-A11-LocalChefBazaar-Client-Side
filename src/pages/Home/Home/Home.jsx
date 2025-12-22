// src/pages/Home/Home/Home.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Banner from "../Banner/Banner";
import MealsSection from "../MealsSection/MealsSection";
import Service from "../Service/Service";
import Reviews from "../Reviews/Reviews";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Home = () => {
  const axiosSecure = useAxiosSecure();

  // 🔥 FETCH ALL REVIEWS FOR HOME PAGE
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["home-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  return (
    <div>
      <Banner />
      <MealsSection />

      {/* 🔥 Reviews Section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          What Our Customers Say
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading reviews...</p>
        ) : (
          <Reviews reviews={reviews} />
        )}
      </section>

      <Service />
    </div>
  );
};

export default Home;

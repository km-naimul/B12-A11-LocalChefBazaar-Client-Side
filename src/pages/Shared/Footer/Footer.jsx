import React from "react";
import Logo from "../../../components/Logo/Logo";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#fcf1f1] text-gray-700 mt-1">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Top: logo + description + social icons */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between border-b border-red-100 pb-8">
          <div className="max-w-2xl space-y-3">
            <Logo className="items-start justify-start text-start"/>
            

            <h3 className="text-xl font-semibold">
              Order food from the best home chefs with LocalChefBazaar
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              LocalChefBazaar connects you with nearby home cooks so you can
              enjoy fresh, homemade meals every day. Discover new dishes, order
              in seconds, and get your food delivered hot and on time.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex flex-col items-start gap-3">
            <span className="text-sm font-semibold text-gray-700">
              Follow us
            </span>
            <div className="flex gap-3">
              {/* X / Twitter */}
              <button className="w-10 h-10 border border-red-400 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </button>

              {/* YouTube */}
              <button className="w-10 h-10 border border-red-400 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </button>

              {/* Facebook */}
              <button className="w-10 h-10 border border-red-400 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom grid: contact, working hours, links */}
        <div className="grid gap-8 md:grid-cols-4 text-sm">
          {/* Contact details */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Contact Details</h4>
            <p>Phone: +880 1234-567890</p>
            <p>Email: support@localchefbazaar.com</p>
            <p>Address: Dhaka, Bangladesh</p>
          </div>

          {/* Working hours */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Working Hours</h4>
            <p>Sat – Thu: 10:00 AM – 11:00 PM</p>
            <p>Friday: 3:00 PM – 11:00 PM</p>
          </div>

          {/* About / general links */}
          <div className="space-y-1">
            <h4 className="font-semibold text-gray-800">About</h4>
            <p>Whether you’re a fan of local delicacies like Biryani, Kacchi, Khichuri, Chui jhal, Kala Bhuna, or prefer Western favorites such as Burgers, Pizzas, Pasta, and Fried Chicken, Foodi ensures the best restaurants cater to your cravings within your budget. </p>
          </div>

          {/* Legal / terms */}
          <div className="space-y-1">
            <h4 className="font-semibold text-gray-800">Terms & Conditions</h4>
            <p>The Platforms may be used by (i) natural persons who have reached 18 years of age and (ii) corporate legal entities, e.g companies. Where applicable, these Terms shall be subject to country-specific provisions as set out herein.</p>
          </div>
        </div>

        {/* Copyright line */}
        <div className="border-t border-red-100 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            Copyright © {year} ChefBazaar Industries Ltd. All rights reserved.
          </p>
          <p>Love &amp; care from your local home chefs ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

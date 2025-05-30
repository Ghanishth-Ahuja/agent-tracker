import React from "react";
import { FaInstagram, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="bg-gray-800 text-white px-6 py-10 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <p>113-A Namrata Aawas Bajrang Nagar, Kota Rajasthan</p>
          <p>Email: ahujaghanishth@gmail.com</p>
          <p>Phone: +91 63765 09914</p>
        </div>

  

        <div className="flex flex-col items-start gap-4">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <div className="flex space-x-4 text-2xl">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-400" />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp className="hover:text-green-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-blue-400" />
            </a>
          </div>
          <button
            className="mt-2 bg-gray-600 px-4 py-2 text-sm rounded hover:bg-gray-500"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            Go to Top
          </button>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; 2025 Your Website. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;

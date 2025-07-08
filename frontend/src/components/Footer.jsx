import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="my-10 mt-40 text-sm">
      {/* Grid Section */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14">
        <div>
          <img src={assets.logo} className="mb-5 w-40" alt="" />
          <p className="w-full md:w-2/3 text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam,
            voluptatum.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-800">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-1 text-gray-800">
            <li>1800114000</li>
            <li>contact@originals.com</li>
          </ul>
        </div>
      </div>

      {/* Centered Copyright Section */}
      <div className="mt-10">
        <hr />
        <p className="py-5 text-xl text-center text-gray-500">
          © 2025 originals.com - All Rights Reserved
        </p>
        <p className="text-center text-3xl text-[#8B0000] text-bold">
          Created and Developed By Raj Mishra
        </p>
      </div>
    </div>
  );
}

export default Footer

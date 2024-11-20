import React from "react";
import SubscriptionForm from "../components/SubscriptionForm";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 ">
      <SubscriptionForm />
      <div className="mt-6 text-center px-6">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Cosmic Journey. All Rights Reserved.
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Built with dedication by the Cosmic Journey Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const AfterLogout = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(/blog/alien1.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="bg-white shadow-lg w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 md:w-2/3">
            <img
              src="./Favicon.jpg"
              alt="Cosmic Journey Logo"
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Your Cosmic Journey Has Just Begun!
            </h1>
            <p className="text-gray-600 mb-4">
              Thank you for being a part of this stellar adventure! Your
              presence adds to the vast expanse of knowledge and possibilities.
            </p>
            <p className="text-gray-600 mb-4">
              Cosmic Journey is your platform to explore new frontiers, read
              fascinating stories, and connect with fellow explorers.
            </p>
            <p className="text-gray-600 font-semibold">
              The universe is waiting — we can’t wait for you to see what’s
              next!
            </p>
          </div>
          <div className="bg-gray-100 p-8 flex flex-col justify-center md:w-1/3">
            <Link
              to="/signin"
              className="block w-full bg-blue-600 text-white px-6 py-3 text-center text-lg font-semibold hover:bg-blue-700 transition duration-300 mb-4"
            >
              Log In Again
            </Link>
            <Link
              to="/"
              className="block w-full bg-gray-300 text-gray-800 px-6 py-3 text-center text-lg font-semibold hover:bg-gray-400 transition duration-300"
            >
              Return to the Ground
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterLogout;

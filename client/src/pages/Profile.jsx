import React from "react";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { subscribe } from "../actions/subscriptionActions";
import SubscriptionForm from "../components/SubscriptionForm";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("User")) || {};

  const handleLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("Loggedin");
    window.location.href = "/afterlogout";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-5xl mx-auto text-gray-900">
      <div className="bg-gray-50 sm:bg-white w-full p-6 sm:border sm:border-gray-300 sm:shadow-md">
        {user.picture && (
          <img
            src={`${user.picture.trim()}`}
            alt="Profile"
            referrerPolicy="no-referrer"
            className="w-32 h-32 object-cover mx-auto border border-gray-300"
          />
        )}
        <div className="mt-4 mb-4 text-center">
          <h1 className="text-xl font-semibold">{user.name || "No Name"}</h1>
          <p className="text-sm text-gray-600">{user.email || "No Email"}</p>
        </div>

        <SubscriptionForm />
        <button
          onClick={handleLogout}
          className="w-full mt-6 px-4 py-2 mb-4 flex justify-center items-center bg-red-500 text-white font-medium text-sm border border-red-600 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
        >
          Logout
          <LogOut className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Profile;

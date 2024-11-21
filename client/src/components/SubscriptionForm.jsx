import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribe, unsubscribe } from "../actions/subscriptionActions";

const SubscriptionForm = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.subscription);
  const user = JSON.parse(localStorage.getItem("User"));

  const handleSubscribe = (e) => {
    e.preventDefault();
    user ? dispatch(subscribe(user?.email)) : alert("Please login first");
  };

  const handleUnsubscribe = () => {
    user ? dispatch(unsubscribe(user?.email)) : alert("Please login first");
  };

  return (
    <div
      style={{
        backgroundImage: `url(/footer.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
      className="text-white py-8 px-6 max-w-7xl mx-auto sm:bg-fixed"
    >
      <div className="max-w-3xl mx-auto text-center p-5 bg-black bg-opacity-70">
        <h3 className="text-xl font-semibold mb-4 uppercase">
          Join the Cosmic Journey
        </h3>
        <p className="text-sm text-gray-200 mb-6">
          Be the first to explore the latest discoveries and theories about the
          universe. Sign up for our newsletter today!
        </p>

        <form onSubmit={handleSubscribe} className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-base font-semibold py-3 border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition-all duration-300"
          >
            Subscribe
          </button>
        </form>

        {message ? (
          <p className="mt-4 text-blue-400 text-sm">
            {message}{" "}
            <span
              className="underline cursor-pointer"
              onClick={handleUnsubscribe}
            >
              Click to Unsubscribe.
            </span>
          </p>
        ) : (
          location.pathname === "/profile" && ( // show unsubscribe link only on profile page
            <p
              className="mt-4 text-blue-400 text-sm underline cursor-pointer"
              onClick={handleUnsubscribe}
            >
              Click to Unsubscribe.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default SubscriptionForm;

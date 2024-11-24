import React from "react";
import NavbarArticle from "../components/NavbarArticle";
import Footer from "../components/Footer";

const Credits = () => {
  return (
    <>
      <NavbarArticle />
      <div className="flex flex-col min-h-[50vh]">
        <a href="https://www.flaticon.com/free-icons/clock" title="clock icons">
          Clock icons created by Freepik - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/eye-password"
          title="eye password icons"
        >
          Eye password icons created by FACH - Flaticon
        </a>
      </div>
      <Footer />
    </>
  );
};

export default Credits;

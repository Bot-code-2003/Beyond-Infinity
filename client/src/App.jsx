import React from "react";
import { Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import BlogLandingPage from "./pages/BlogLandingPage";
import MarkdownEditor from "./components/MarkdownEditor";
import ClickedArticle from "./pages/ClickedArticle";
import NavbarArticle from "./components/NavbarArticle";
import Signin from "./pages/Signin";
import Articles from "./pages/Articles";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Profile from "./pages/Profile";
import AfterLogout from "./pages/AfterLogout";
import EmailComponent from "./components/EmailComponent";
import Footer from "./components/Footer";
import { Helmet } from "react-helmet";

const App = () => {
  const user = localStorage.getItem("User");
  const handleSuccess = (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    localStorage.setItem("User", JSON.stringify(decodedToken));
    localStorage.setItem("Loggedin", true);
    window.location.href = "/";
  };
  return (
    <div className="bg-gray-50">
      {!user && (
        <div className="hidden">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        </div>
      )}
      <Routes>
        <Route path="/sendEmail" element={<EmailComponent />} />
        <Route path="/" element={<BlogLandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/editor" element={<MarkdownEditor />} />
        <Route path="/afterlogout" element={<AfterLogout />} />
        <Route
          path="/profile"
          element={
            <>
              <NavbarArticle />
              <Profile />
            </>
          }
        />
        <Route
          path="/article/:slug"
          element={
            <>
              <NavbarArticle />
              <ClickedArticle />
              <Footer />
            </>
          }
        />
        <Route
          path="/articles"
          element={
            <>
              <Articles />
              <Footer />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <NavbarArticle />
              <Signin />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

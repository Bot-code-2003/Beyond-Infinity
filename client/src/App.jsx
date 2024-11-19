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

const App = () => {
  return (
    <div className="bg-gray-50">
      <div className="hidden">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      </div>
      <Routes>
        <Route path="/" element={<BlogLandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/editor" element={<MarkdownEditor />} />
        <Route
          path="/article/:slug"
          element={
            <>
              <NavbarArticle />
              <ClickedArticle />
            </>
          }
        />
        <Route path="/articles" element={<Articles />} />
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

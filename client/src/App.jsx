import React from "react";
import { Routes, Route } from "react-router-dom";
import ContactUs from "./Pages/Contact";
import BlogLandingPage from "./Pages/BlogLandingPage";
import MarkdownEditor from "./components/MarkdownEditor";
import ClickedArticle from "./Pages/ClickedArticle";
import NavbarArticle from "./components/NavbarArticle";
import Articles from "./Pages/Articles";

const App = () => {
  return (
    <div className="bg-gray-50">
      <Routes>
        <Route path="/" element={<BlogLandingPage />} />
        <Route path="/contact" element={<ContactUs />} />
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
      </Routes>
    </div>
  );
};

export default App;

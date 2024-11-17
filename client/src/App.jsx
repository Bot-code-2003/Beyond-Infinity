import React from "react";
import { Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import BlogLandingPage from "./pages/BlogLandingPage";
import MarkdownEditor from "./components/MarkdownEditor";
import ClickedArticle from "./pages/ClickedArticle";
import NavbarArticle from "./components/NavbarArticle";
import Articles from "./pages/Articles";

const App = () => {
  return (
    <div className="bg-gray-50">
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
      </Routes>
    </div>
  );
};

export default App;

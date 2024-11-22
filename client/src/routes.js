import BlogLandingPage from "./pages/BlogLandingPage";
import Contact from "./pages/Contact";
import MarkdownEditor from "./components/MarkdownEditor";
import ClickedArticle from "./pages/ClickedArticle";
import Articles from "./pages/Articles";

export default [
  { path: "/", component: BlogLandingPage },
  { path: "/contact", component: Contact },
  { path: "/editor", component: MarkdownEditor },
  { path: "/articles", component: Articles },
  { path: "/article/:slug", component: ClickedArticle },
];

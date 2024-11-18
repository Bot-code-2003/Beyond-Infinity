import React, { useEffect } from "react";
import MarkdownRender from "../components/MarkdownRender";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getArticles, getArticle } from "../actions/articleActions"; // Assuming you have this action to fetch articles
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const ClickedArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  console.log("slug", slug);

  // Get the list of articles from the Redux store
  const { articles } = useSelector((state) => state.articles);
  console.log("Clicked Article articles", articles);

  // If articles are not loaded yet, show loading state
  if (!articles) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(getArticle(slug));
    }
  });

  const { clickedArticle } = useSelector((state) => state.articles);

  // Get the article based on the slug from the URL params
  const article = articles.find((article) => article.slug === slug);

  const displayedArticle = clickedArticle || article;
  // console.log("article", article);
  // If the article is not found, show a not found message
  if (!displayedArticle) {
    return <div>Article not found</div>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-100">
      <div
        onClick={() => window.history.back() || navigate("/")}
        className="sm:fixed py-2 px-4 cursor-pointer hover:underline inline-block border-2 border-black mt-2 ml-2"
      >
        <ArrowBackIcon /> Back
      </div>

      <MarkdownRender
        markdownContent={displayedArticle.markdown}
        title={displayedArticle.title}
        description={displayedArticle.description}
        articleHeaderImage={displayedArticle.articleHeaderImage}
        imageCredit={displayedArticle.imageCredit}
      />
    </div>
  );
};

export default ClickedArticle;

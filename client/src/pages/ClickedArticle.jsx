import React, { useEffect } from "react";
import MarkdownRender from "../components/MarkdownRender";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getArticles, getArticle } from "../actions/articleActions"; // Assuming you have this action to fetch articles
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ClickedArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const { articles, clickedArticle } = useSelector((state) => state.articles);

  useEffect(() => {
    if (!articles || articles.length === 0) {
      // Fetch the article only if the articles list is empty
      dispatch(getArticle(slug));
    }
  }, [articles, slug, dispatch]);

  useEffect(() => {
    // Scroll to the top when the component loads
    window.scrollTo(0, 0);
  }, []);

  // Determine the displayed article
  const articleFromList = articles?.find((article) => article.slug === slug);
  const displayedArticle = articleFromList || clickedArticle;

  // Handle loading and not found states
  if (!articles && !clickedArticle) {
    return <div>Loading...</div>;
  }
  if (!displayedArticle) {
    return <div>Article not found</div>;
  }

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

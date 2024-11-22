import React, { useEffect, useState } from "react";
import MarkdownRender from "../components/MarkdownRender";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getArticle, incrementViews } from "../actions/articleActions"; // Assuming you have this action to fetch articles
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Helmet } from "react-helmet";

const ClickedArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  console.log("slug", slug);

  // Get the list of articles from the Redux store
  const { articles } = useSelector((state) => state.articles);
  // console.log("Clicked Article page articles", articles);

  // If articles are not loaded yet, show loading state
  if (!articles) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(getArticle(slug));
      dispatch(incrementViews(slug));
    }
  }, [articles.length, dispatch, slug]);

  const { clickedArticle } = useSelector((state) => state.articles);

  // Get the article based on the slug from the URL params
  const article = articles.find((article) => article.slug === slug);

  const displayedArticle = article ? article : clickedArticle;

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
      <Helmet>
        <title>{displayedArticle.title}</title>
        <meta
          name="description"
          content={displayedArticle.description?.slice(0, 100)}
        />
        <meta name="keywords" content={displayedArticle.keywords || ""} />

        {/* Open Graph tags for social media */}
        <meta property="og:title" content={displayedArticle.title} />
        <meta
          property="og:description"
          content={displayedArticle.description}
        />
        <meta
          property="og:image"
          content={displayedArticle.articleHeaderImage}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={displayedArticle.title} />
        <meta
          name="twitter:description"
          content={displayedArticle.description}
        />
        <meta
          name="twitter:image"
          content={displayedArticle.articleHeaderImage}
        />
      </Helmet>
      <div
        onClick={() => window.history.back() || navigate("/")}
        className="bg-white fixed py-2 px-4 cursor-pointer hover:underline inline-block border-2 border-black mt-2 ml-2"
      >
        <ArrowBackIcon /> Back
      </div>

      {displayedArticle && (
        <MarkdownRender
          markdownContent={displayedArticle.markdown}
          title={displayedArticle.title}
          description={displayedArticle.description}
          articleHeaderImage={displayedArticle.articleHeaderImage}
          imageCredit={displayedArticle.imageCredit}
          slug={displayedArticle.slug}
        />
      )}
    </div>
  );
};

export default ClickedArticle;

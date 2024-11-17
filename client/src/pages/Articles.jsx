import React, { useEffect, useState } from "react";
import NavbarArticle from "../components/NavbarArticle";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../actions/articleActions";
import ArticleCard from "../components/ArticleCard";

const Articles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (articles.length === 0) {
          await dispatch(getArticles());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, articles.length]);

  return (
    <div>
      <NavbarArticle />
      {/* Show loading skeleton until articles are fetched */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ArticleCard key={index} loading={true} />
            ))
          : articles.map((article) => (
              <ArticleCard
                key={article._id}
                article={article}
                loading={false}
              />
            ))}
      </div>
    </div>
  );
};

export default Articles;

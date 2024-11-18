import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton"; // Install using npm install react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Optional CSS import
import { useNavigate } from "react-router-dom";
import { incrementViews } from "../actions/articleActions";

const ArticleCard = ({ article, loading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const articleClick = (slug) => {
    dispatch(incrementViews(slug));
  };

  if (loading) {
    // Skeleton loader for the card
    return (
      <div className="flex flex-col h-full bg-white shadow-lg p-4">
        <Skeleton height={150} width="100%" className="mb-4" />
        <Skeleton height={20} width="80%" className="mb-2" />
        <Skeleton height={15} width="90%" className="mb-2" />
        <Skeleton height={15} width="70%" />
        <div className="flex justify-between mt-4">
          <Skeleton height={15} width="30%" />
          <Skeleton height={15} width="40%" />
        </div>
      </div>
    );
  }

  return (
    // <div className="">
    <Link
      to={`/article/${article.slug}`}
      onClick={() => articleClick(article.slug)}
      className=" flex flex-col h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <img
        className="w-full h-56 object-cover"
        src={article.articleHeaderImage}
        alt={article.title}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {article.title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {article.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <VisibilityIcon style={{ fontSize: 16 }} />
            <span>{article.views || 0} Views</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>•</span>
            <p>{moment(article.createdAt).fromNow()}</p>
          </div>
        </div>
      </div>
    </Link>
    // </div>
  );
};

export default ArticleCard;

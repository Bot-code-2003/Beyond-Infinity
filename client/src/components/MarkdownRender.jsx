import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Lottie from "lottie-react";
import LoadingAnimation from "../assets/lotties/Animation - 1729259117182.json";
import SubscriptionForm from "./SubscriptionForm";
import { Helmet } from "react-helmet";

export default function MarkdownRender({
  markdownContent,
  title,
  description,
  articleHeaderImage,
  imageCredit,
  slug, // New prop for generating share links
}) {
  if (!markdownContent || !title) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Lottie animationData={LoadingAnimation} loop={true} className="" />
      </div>
    );
  }

  console.log("Slug", slug);

  const baseUrl = "https://cosmicjourney.vercel.app/article";
  const articleUrl = `${baseUrl}/${slug}`;
  console.log("articleUrl", articleUrl);

  const shareText = encodeURIComponent(
    `${title} - Read more on Cosmic Journey: ${articleUrl}`
  );

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${articleUrl}&text=${shareText}`,
    reddit: `https://www.reddit.com/submit?url=${articleUrl}&title=${encodeURIComponent(
      title
    )}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`,
  };

  const ShareButtons = () => (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Share this article:</h3>
      <div className="flex space-x-4">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 text-sm bg-blue-500 text-white  hover:bg-blue-600"
        >
          Share on Twitter
        </a>
        <a
          href={shareLinks.reddit}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 text-sm bg-orange-500 text-white  hover:bg-orange-600"
        >
          Share on Reddit
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 text-sm bg-green-500 text-white  hover:bg-green-600"
        >
          Share on WhatsApp
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 text-sm bg-blue-700 text-white  hover:bg-blue-800"
        >
          Share on LinkedIn
        </a>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Article URL:{" "}
        <a href={articleUrl} className="text-blue-600 hover:underline">
          {articleUrl}
        </a>
      </p>
    </div>
  );

  return (
    <div className="min-h-screen font-mono bg-white">
      <Helmet>
        {/* Open Graph tags for social media */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image:secure_url" content={articleHeaderImage} />
        <meta property="og:image:width" content="2500" />
        <meta property="og:image:height" content="1330" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={articleHeaderImage} />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <article>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-md italic text-gray-500">{description}</p>
            )}
            {articleHeaderImage && (
              <div>
                <img
                  src={articleHeaderImage}
                  alt=""
                  className="w-full h-auto object-cover mt-6"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Image credit: {imageCredit}
                </p>
              </div>
            )}
            <SubscriptionForm />
            <ShareButtons /> {/* Share buttons below the header */}
          </header>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold mt-8 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-semibold mt-6 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-medium mt-4 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-4 leading-relaxed text-gray-700" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 mb-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-5 mb-4" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-1 text-gray-700" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => {
                const { src, alt } = props;

                return (
                  <div className="my-4">
                    <img className="w-full h-auto" {...props} alt={alt || ""} />
                    {alt && (
                      <p className="text-sm text-gray-500 mt-2">
                        Image credit: {alt}
                      </p>
                    )}
                  </div>
                );
              },

              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code
                    className="bg-gray-100 px-1 py-0.5 text-sm"
                    {...props}
                  />
                ) : (
                  <pre className="bg-gray-100 p-3 overflow-x-auto text-sm my-4">
                    <code {...props} />
                  </pre>
                ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-4">
                  <table
                    className="min-w-full divide-y divide-gray-200"
                    {...props}
                  />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th
                  className="px-3 py-2 bg-gray-100 text-left text-xs font-medium uppercase"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className="px-3 py-2 whitespace-nowrap text-sm"
                  {...props}
                />
              ),
              mark: ({ node, ...props }) => (
                <mark className="bg-yellow-100 px-1 py-0.5" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-black" {...props} />
              ),
            }}
          >
            {markdownContent}
          </ReactMarkdown>
          {/* <div className="mt-8">
            <button className="px-4 py-2 bg-gray-200 text-gray-700  shadow-sm hover:bg-gray-300">
              Like
            </button>
          </div> */}
          <ShareButtons /> {/* Share buttons at the end */}
        </article>
      </div>
    </div>
  );
}

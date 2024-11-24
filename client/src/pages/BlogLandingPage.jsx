import React, { useEffect, useState } from "react"; // Importing useState here
import { useDispatch, useSelector } from "react-redux";
import { getArticles, getMostViewdArticles } from "../actions/articleActions";
import ArticleCard from "../components/ArticleCard";
import NavbarArticle from "../components/NavbarArticle";
import { Link } from "react-router-dom";

import { X } from "lucide-react";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const ArticleGrid = ({ articles, loading }) => (
  <div>
    {loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <ArticleCard key={index} loading={true} />
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} loading={false} />
        ))}
      </div>
    )}
  </div>
);

const MostViewedArticleGrid = ({ mostViewedArticles, loading }) => (
  <div>
    {loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <ArticleCard key={index} loading={true} />
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mostViewedArticles.map((article) => (
          <ArticleCard key={article._id} article={article} loading={false} />
        ))}
      </div>
    )}
  </div>
);

const HeroSection = () => (
  <div
    className="sm:bg-fixed relative bg-cover bg-center bg-no-repeat h-[60vh] flex items-center justify-center text-white"
    style={{
      backgroundImage: "url(/blog/alien2.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      // backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundBlendMode: "overlay",
    }}
  >
    <div className="absolute inset-0 bg-black opacity-10 "></div>
    <div className="relative z-10 text-center max-w-3xl mx-auto py-4 px-4">
      <h1 className="text-4xl md:text-3xl font-bold mb-4">
        Welcome to Cosmic Journey.
      </h1>
      <p className="text-xl mb-8">
        Cosmic Journey explores the wonders of space and the paradoxes that
        challenge our understanding of reality.
      </p>
      <Link
        to="/articles"
        className="inline-block bg-white text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-blue-600 hover:text-white"
      >
        Dive in
      </Link>
    </div>
  </div>
);

const AboutSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="container mx-auto px-4 py-8 sm:bg-fixed"
      style={{
        backgroundImage: "url(/blog/about.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <h1 className="text-4xl font-bold mb-4 text-white">About Me</h1>
      <div className="bg-white p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-3 flex flex-col justify-between">
            <p className={`text-lg mb-4 ${isExpanded ? "" : "line-clamp-6"}`}>
              Hi, I'm the owner of{" "}
              <a
                href="https://dev-labs.vercel.app"
                target="_blank"
                className="text-blue-600 underline"
              >
                Dev Labs
              </a>
              , a platform to showcase your creativity. I'm deeply passionate
              about science fiction, which inspired me to start this blog on
              space theories and paradoxes. Growing up, I was always fascinated
              by the wonders of the universe and the mysteries surrounding our
              fate. I spent countless hours watching channels like Kurzgesagt in
              a Nutshell, What If, and Destiny. These channels ignited my
              curiosity about the forces that shape our lives and how the
              universe itself is the ultimate deciding factor in our journey.
              <br />
              <br />
              Through this blog, I hope to explore these profound ideas and
              engage with like-minded individuals who share the same curiosity
              about space and the mind-bending paradoxes that come with it. I
              want to create a space for discussions and exploration of these
              mysteries.
            </p>
            {/* Read More / Show Less Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="sm:hidden text-blue-600 underline mt-0"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>

          <div className="md:col-span-1 flex justify-center items-stretch">
            <img
              className="w-full max-h-56 object-cover object-top shadow-lg"
              src="https://honeywell.scene7.com/is/image/honeywell/AeroBT-Astronaut-on-a-bench_2880x1440:1-1-square?wid=1245&hei=1245&dpr=off"
              alt="Your Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BlogLandingPage() {
  const dispatch = useDispatch();
  const { articles, mostViewedArticles } = useSelector(
    (state) => state.articles
  );

  // const loggedIn = localStorage.getItem("Loggedin");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const check = localStorage.getItem("Loggedin");
    if (check) {
      setLoggedIn(true);
    }
  }, []);

  const [isloading, setLoading] = useState(true); // Correct usage of useState inside the component

  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        if (articles.length === 0) {
          await dispatch(getArticles());
          await dispatch(getMostViewdArticles());
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Cosmic Journey</title>
        <meta
          name="description"
          content="Cosmic Journey explores the wonders of space and the paradoxes that challenge our understanding of reality."
        />
        <meta
          name="keywords"
          content="space, paradoxes, understanding, reality, science fiction, cosmic journey, astronomy, physics, universe, galaxies"
        />
      </Helmet>
      <div className="mb-4">
        <NavbarArticle />
      </div>
      {loggedIn && (
        <div className="z-50 fixed top-5 right-1/2 transform translate-x-1/2 flex gap-3 justify-between items-center bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white py-3 sm:px-6 px-3 shadow-md max-w-xs">
          <h1>Login Successful</h1>
          <button
            onClick={() => (
              localStorage.removeItem("Loggedin"), setLoggedIn(false)
            )}
            className="text-white bg-transparent border-0 hover:text-gray-200 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 py-4">
        <HeroSection />
      </div>
      <main className="container mx-auto px-4 py-6">
        {/* Latest Articles Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-center mb-6 flex items-center justify-center space-x-4">
            <img
              src="/blog/3d-alarm.png"
              alt="Alarm icon"
              className="w-12 h-12 sm:w-10 sm:h-10"
            />
            <span className="text-xl sm:text-3xl underline">
              Latest Articles
            </span>
            <img
              src="/blog/3d-alarm.png"
              alt="Alarm icon"
              className="w-12 h-12 sm:w-10 sm:h-10"
            />
          </h1>

          <ArticleGrid articles={articles.slice(0, 3)} loading={isloading} />
        </div>

        {/* Most Viewed Articles Section */}
        <div>
          <h1 className="text-3xl font-semibold text-center mb-6 flex items-center justify-center space-x-4">
            <img
              src="/blog/eye.png"
              alt="Eye icon"
              className="w-12 h-12 sm:w-10 sm:h-10"
            />
            <span className="text-xl sm:text-3xl underline">
              Most Viewed Articles
            </span>
            <img
              src="/blog/eye.png"
              alt="Eye icon"
              className="w-12 h-12 sm:w-10 sm:h-10"
            />
          </h1>

          <MostViewedArticleGrid
            mostViewedArticles={mostViewedArticles}
            loading={isloading}
          />
        </div>
      </main>

      <div className="container mx-auto px-4 py-4">
        <AboutSection /> {/* About section added here */}
      </div>
      <Footer />
    </div>
  );
}

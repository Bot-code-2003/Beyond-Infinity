import React, { useEffect, useState } from "react"; // Importing useState here
import { useDispatch, useSelector } from "react-redux";
import Loading from "../assets/lotties/Animation - 1729259117182.json";
import Lottie from "lottie-react";
import { getArticles } from "../actions/articleActions";
import ArticleCard from "../components/ArticleCard";
import NavbarArticle from "../components/NavbarArticle";
import { Link } from "react-router-dom";

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

const HeroSection = () => (
  <div
    className="relative bg-cover bg-center bg-no-repeat h-[60vh] flex items-center justify-center text-white"
    style={{
      backgroundImage: "url(/blog/alien2.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundBlendMode: "overlay",
    }}
  >
    <div className="absolute inset-0 bg-black opacity-10 "></div>
    <div className="relative z-10 text-center max-w-3xl mx-auto py-4 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
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

const Footer = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Dev Labs. All Rights Reserved.
      </p>
      <p className="text-sm mt-2">Built with passion by the Dev Labs Team</p>
    </div>
  </footer>
);

const AboutSection = () => (
  <div
    className="container mx-auto px-4 py-8"
    style={{
      backgroundImage: "url(/blog/about.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundBlendMode: "overlay",
    }}
  >
    <h1 className="text-4xl font-bold mb-4 text-white">About Me</h1>
    <div className="bg-white p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3 flex flex-col justify-between">
          <p className="text-lg mb-4">
            Hi, I'm the owner of{" "}
            <a
              href="https://dev-labs.vercel.app"
              target="_blank"
              className="text-blue-600 underline"
            >
              Dev Labs
            </a>
            , a platform to showcase your creativity. I'm deeply passionate
            about science fiction, which inspired me to start this blog on space
            theories and paradoxes. Growing up, I was always fascinated by the
            wonders of the universe and the mysteries surrounding our fate. I
            spent countless hours watching channels like Kurzgesagt in a
            Nutshell, What If, and Destiny. These channels ignited my curiosity
            about the forces that shape our lives and how the universe itself is
            the ultimate deciding factor in our journey.
          </p>
          <p className="text-lg">
            Through this blog, I hope to explore these profound ideas and engage
            with like-minded individuals who share the same curiosity about
            space and the mind-bending paradoxes that come with it.
          </p>
        </div>
        <div className="md:col-span-1 flex justify-center items-stretch">
          {" "}
          {/* Ensure image stretches to match content height */}
          <img
            className="w-full max-h-56 object-cover object-top shadow-lg" // Ensure image fills the height of the parent
            src="https://honeywell.scene7.com/is/image/honeywell/AeroBT-Astronaut-on-a-bench_2880x1440:1-1-square?wid=1245&hei=1245&dpr=off" // Replace with your actual image path
            alt="Your Image"
          />
        </div>
      </div>
    </div>
  </div>
);

export default function BlogLandingPage() {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.articles);

  const [isloading, setLoading] = useState(true); // Correct usage of useState inside the component

  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        if (articles.length === 0) {
          await dispatch(getArticles());
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
      <div className="mb-4">
        <NavbarArticle />
      </div>
      <div className="container mx-auto px-4 py-4">
        <HeroSection />
      </div>
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Latest Articles</h1>
        <ArticleGrid articles={articles.slice(0, 3)} loading={isloading} />
      </main>
      <div className="container mx-auto px-4 py-4">
        <AboutSection /> {/* About section added here */}
      </div>
      <Footer />
    </div>
  );
}

import axios from "axios";

const API = axios.create({
  baseURL: "https://beyond-infinity-server.vercel.app",
  // baseURL: "http://localhost:5000",
});

export const incrementViews = (slug) => async (dispatch) => {
  try {
    await API.patch("/article/incViews", { slug });
    dispatch({ type: "INCREMENT_VIEWS", payload: slug });
  } catch (error) {
    console.log(error);
  }
};

export const getArticle = (slug) => async (dispatch) => {
  try {
    console.log("getArticle action called", slug);

    const { data } = await API.get(`/article/getArticle/${slug}`);
    console.log("getArticle action called", data);

    dispatch({ type: "GET_ARTICLE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getArticles = () => async (dispatch) => {
  try {
    const { data } = await API.get("/article/getArticles");
    dispatch({ type: "GET_ARTICLES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const submitArticle =
  (
    title,
    description,
    markdown,
    articleHeaderImage,
    imageCredit,
    slug,
    keywords
  ) =>
  async (dispatch) => {
    // console.log(
    //   "submitArticle action called",
    //   title,
    //   description,
    //   markdown,
    //   articleHeaderImage,
    //   imageCredit,
    //   slug,
    //   keywords
    // );

    const { data } = await API.post("/article/submit", {
      title,
      description,
      markdown,
      articleHeaderImage,
      imageCredit,
      slug,
      keywords,
    });

    // console.log("Recieved data: ", data);
  };

export const getMostViewdArticles = () => async (dispatch) => {
  try {
    const { data } = await API.get("/article/getMostViewdArticles");
    dispatch({ type: "GET_MOST_VIEWD_ARTICLES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

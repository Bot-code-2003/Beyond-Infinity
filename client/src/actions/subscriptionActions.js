import axios from "axios";

const API = axios.create({
  baseURL: "https://beyond-infinity-server.vercel.app",
});
// const API = axios.create({ baseURL: "http://localhost:5000" });

// Subscribe action
export const subscribe = (email) => async (dispatch) => {
  try {
    const { data } = await API.post("/subscription/subscribe", { email });

    dispatch({
      type: "SUBSCRIBE",
      payload: { message: data.message },
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "SUBSCRIBE_ERROR",
      payload: error.response
        ? error.response.data.message
        : "Something went wrong",
    });
  }
};

export const unsubscribe = (email) => async (dispatch) => {
  try {
    const { data } = await API.post("/subscription/unsubscribe", { email });

    dispatch({
      type: "UNSUBSCRIBE_SUCCESS",
      payload: { message: data.message },
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "UNSUBSCRIBE_ERROR",
      payload: error.response
        ? error.response.data.message
        : "Something went wrong",
    });
  }
};

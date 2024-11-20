const initialState = {
  message: "",
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBSCRIBE":
      return {
        ...state,
        message: action.payload.message,
      };
    case "UNSUBSCRIBE_SUCCESS":
      return {
        ...state,
        message: action.payload.message,
      };
    case "SUBSCRIBE_ERROR":
    case "UNSUBSCRIBE_ERROR":
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default subscriptionReducer;

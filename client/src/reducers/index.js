import { combineReducers } from "redux";

import articles from "./articles.js";
import subscription from "./subscription.js";

export default combineReducers({ articles, subscription });

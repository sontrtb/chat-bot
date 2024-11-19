import { combineReducers } from "redux";
import chatBotSlice from "./slices/chatBotSlice";

const rootReducer = combineReducers({
  chatBot: chatBotSlice.reducer,
});

export default rootReducer;

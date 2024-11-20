import { combineReducers } from "redux";
import chatBotSlice from "./slices/chatBotSlice";
import userSlice from "./slices/userSlice";
import messageTypingSlice from "./slices/mesageTyping";

const rootReducer = combineReducers({
  chatBot: chatBotSlice.reducer,
  user: userSlice.reducer,
  messageTyping: messageTypingSlice.reducer
});

export default rootReducer;

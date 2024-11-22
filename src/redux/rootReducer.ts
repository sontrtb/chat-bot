import { combineReducers } from "redux";
import chatBotSlice from "./slices/chatBotSlice";
import userSlice from "./slices/userSlice";
import messageTypingSlice from "./slices/mesageTyping";
import themeSlice from "./slices/themeSlice";
import listchatBotSlice from "./slices/chatListBotSlice";

const rootReducer = combineReducers({
  chatBot: chatBotSlice.reducer,
  listChatBot: listchatBotSlice.reducer,
  user: userSlice.reducer,
  messageTyping: messageTypingSlice.reducer,
  theme: themeSlice.reducer
});

export default rootReducer;

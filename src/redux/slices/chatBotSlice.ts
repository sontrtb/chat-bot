import { IBot } from "@/types/chatbot";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IChatBotState {
  chatbot?: IBot;
  listChatbot: IBot[]
}

const initState: IChatBotState = {
  chatbot: undefined,
  listChatbot: []
};

const chatBotSlice = createSlice({
  name: "chatbot",
  initialState: initState,
  reducers: {
    setChatBot: (state, action: PayloadAction<IBot>) => {
      return { ...state, chatbot: action.payload };
    },
    setListChatBot: (state, action: PayloadAction<IBot[]>) => {
      return { ...state, listChatbot: action.payload };
    },
  },
});
export const { setChatBot, setListChatBot } = chatBotSlice.actions;
export default chatBotSlice;

import { IBot } from "@/types/chatbot";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IChatBotState {
  chatbot?: IBot
}

const initState: IChatBotState = {
  chatbot: undefined
};

const chatBotSlice = createSlice({
  name: "chatbot",
  initialState: initState,
  reducers: {
    setChatBot: (state, action: PayloadAction<IBot>) => {
      return { ...state, chatbot: action.payload };
    },
  },
});
export const { setChatBot } = chatBotSlice.actions;
export default chatBotSlice;

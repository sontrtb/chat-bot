import { IBot } from "@/types/chatbot";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import All from "@/assets/bot/all.png"

export interface IChatBotState {
  chatbot: IBot
}

const initState: IChatBotState = {
  chatbot: {
    id: "all",
    name: "Tất cả model",
    icon: All,
    description: "Tất cả model",
    model: "all",
    service: "all"
  }
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

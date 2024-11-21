import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IChatBotState {
  chatbot: string
}

const initState: IChatBotState = {
  chatbot: "all"
};

const chatBotSlice = createSlice({
  name: "chatbot",
  initialState: initState,
  reducers: {
    setChatBot: (state, action: PayloadAction<string>) => {
      return { ...state, chatbot: action.payload };
    },
  },
});
export const { setChatBot } = chatBotSlice.actions;
export default chatBotSlice;

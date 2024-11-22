import { IBot } from "@/types/chatbot";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IListChatBotState {
  listchatbot: IBot[]
}

const initState: IListChatBotState = {
  listchatbot: []
};

const listchatBotSlice = createSlice({
  name: "listchatbot",
  initialState: initState,
  reducers: {
    setListChatBot: (state, action: PayloadAction<IBot[]>) => {
      return { ...state, listchatbot: action.payload };
    },
  },
});
export const { setListChatBot } = listchatBotSlice.actions;
export default listchatBotSlice;

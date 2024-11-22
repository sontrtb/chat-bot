import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store";
import {  setListChatBot } from "../slices/chatListBotSlice";
import { IBot } from "@/types/chatbot";

const useSetListChatBot = (): ((bots: IBot[]) => void) => {
  const dispatch = useDispatch();
  const setListChatBotStore = (bots: IBot[]): void => {
    dispatch(setListChatBot(bots));
  };
  return setListChatBotStore;
};

const useGetListChatBot = (): IBot[] => {
  const chatBot = useSelector((state: RootState) => state.listChatBot);
  return chatBot.listchatbot;
};


export { useGetListChatBot, useSetListChatBot };

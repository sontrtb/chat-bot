import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store";
import {  setChatBot } from "../slices/chatBotSlice";
import { IBot } from "@/types/chatbot";

const useSetChatBot = (): ((chatBot: IBot) => void) => {
  const dispatch = useDispatch();
  const setChatBotStore = (chatBot: IBot): void => {
    dispatch(setChatBot(chatBot));
  };
  return setChatBotStore;
};

const useGetCurrentChatBot = (): IBot | undefined => {
  const chatBot = useSelector((state: RootState) => state.chatBot);
  return chatBot.chatbot;
};


export { useGetCurrentChatBot, useSetChatBot };

import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store";
import {  setChatBot } from "../slices/chatBotSlice";

const useSetChatBot = (): ((chatBot?: string) => void) => {
  const dispatch = useDispatch();
  const setChatBotStore = (chatBot?: string): void => {
    dispatch(setChatBot(chatBot));
  };
  return setChatBotStore;
};

const useGetCurrentChatBot = (): string | undefined => {
  const chatBot = useSelector((state: RootState) => state.chatBot);
  return chatBot.chatbot;
};


export { useGetCurrentChatBot, useSetChatBot };

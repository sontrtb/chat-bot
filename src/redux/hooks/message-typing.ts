import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store";
import {  setMessageTyping, setMessageTypingDone, IMessTypingState } from "../slices/mesageTyping";

const useSetMessageTyping = (): ((message: IMessTypingState) => void) => {
  const dispatch = useDispatch();
  const setMessageTypingStore = (message: IMessTypingState): void => {
    dispatch(setMessageTyping(message));
  };
  return setMessageTypingStore;
};

const useSetMessageTypingDone = (): (() => void) => {
  const dispatch = useDispatch();
  const setMessageTypingDoneStore = (): void => {
    dispatch(setMessageTypingDone());
  };
  return setMessageTypingDoneStore;
};

const useGetCurrentMessageTyping = (): IMessTypingState => {
  const messageTyping = useSelector((state: RootState) => state.messageTyping);
  return messageTyping;
};


export { useSetMessageTyping, useSetMessageTypingDone, useGetCurrentMessageTyping };

import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IMessTypingState {
    isTyping?: boolean;
    message?: string;
    messageId?: string;
}

const initState: IMessTypingState = {
    isTyping: false,
};

const messageTypingSlice = createSlice({
    name: "messageTyping",
    initialState: initState,
    reducers: {
        setMessageTyping: (state, action: PayloadAction<IMessTypingState>) => {
            return { ...state, message: action.payload.message, messageId: action.payload.messageId,isTyping: true };
        },
        setMessageTypingDone: (state) => {
            return { ...state, message: undefined, messageId: undefined,isTyping: false };
        },
    },
});
export const { setMessageTyping, setMessageTypingDone } = messageTypingSlice.actions;
export default messageTypingSlice;
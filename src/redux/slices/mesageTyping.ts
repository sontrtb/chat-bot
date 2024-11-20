import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IMessTypingState {
    isTyping: boolean;
    message: string | undefined;
}

const initState: IMessTypingState = {
    isTyping: false,
    message: undefined
};

const messageTypingSlice = createSlice({
    name: "messageTyping",
    initialState: initState,
    reducers: {
        setMessageTyping: (state, action: PayloadAction<string | undefined>) => {
            return { ...state, message: action.payload, isTyping: true };
        },
        setMessageTypingDone: (state) => {
            return { ...state, message: undefined, isTyping: false };
        },
    },
});
export const { setMessageTyping, setMessageTypingDone } = messageTypingSlice.actions;
export default messageTypingSlice;
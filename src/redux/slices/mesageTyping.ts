import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IMessTypingState {
    isTyping?: boolean;
    message?: string;
    messageId?: string;
    fileName?: string;
    fileData?: string;
}

const initState: IMessTypingState = {
    isTyping: false,
};

const messageTypingSlice = createSlice({
    name: "messageTyping",
    initialState: initState,
    reducers: {
        setMessageTyping: (state, action: PayloadAction<IMessTypingState>) => {
            return {
                ...state,
                message: action.payload.message,
                messageId: action.payload.messageId,
                fileName: action.payload.fileName,
                fileData: action.payload.fileData,
                isTyping: true
            };
        },
        setMessageTypingDone: (state) => {
            return {
                ...state,
                message: undefined,
                messageId: undefined,
                fileName: undefined,
                fileData: undefined,
                isTyping: false
            };
        },
    },
});
export const { setMessageTyping, setMessageTypingDone } = messageTypingSlice.actions;
export default messageTypingSlice;
export enum ERoleMessage {
    USER = "user",
    ASSISTANT = "assistant"
}

export interface IMessage {
    id: number;
    conId?: string;
    logTime?: string;
    message: string;
    userId: string;
    messageId: string;
    replyToId?: string;
    role: ERoleMessage
}

export interface IMessageDisplay {
    user: IMessage[],
    assistant: {
        [k: string]: IMessage[]
    }[]
}
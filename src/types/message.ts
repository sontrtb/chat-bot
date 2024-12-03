export enum ERoleMessage {
    USER = "user",
    ASSISTANT = "assistant"
}

export enum ELastMessage {
    LAST = 1,
    NON_LAST = 0
}

export interface IMessage {
    id: number;
    conId?: string;
    logTime?: string;
    message: string;
    userId: string;
    messageId: string;
    replyToId?: string;
    role: ERoleMessage;
    isLast?: ELastMessage;
}

export interface IMessageDisplay {
    user: IMessage[],
    assistant: {
        [k: string]: IMessage[]
    }[]
}
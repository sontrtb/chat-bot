import { IMessage } from "@/types/message";
import rootApi from "./api";

export interface ISendMessBody {
    message: string;
    conId: string,
    target: string,
    replyToId: string
}

export interface IHistory {
    id: string;
    summary: string;
    userId: string
}

const path = {
    history: "/c/cons",
    sendMess: "/c/chat",
    mesages: "c/his/",
    createNewChat: "/c/con"
};

const sendMess = async (data: ISendMessBody): Promise<unknown> => {
    return await rootApi(
        {
            url: path.sendMess,
            method: "post",
            data,
        },
    );
};

const getHistory = async (): Promise<IHistory[]> => {
    return await rootApi(
        {
            url: path.history,
            method: "get",
        },
    );
};

const getMesages = async (id: string): Promise<IMessage[]> => {
    return await rootApi(
        {
            url: path.mesages + id,
            method: "get",
        },
    );
};

const createNewChat = async (): Promise<string> => {
    return await rootApi(
        {
            url: path.createNewChat,
            method: "get",
        },
    );
};

export { sendMess, getHistory, getMesages, createNewChat };

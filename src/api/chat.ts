import rootApi from "./api";

export interface ISendMessBody {
    message: string;
}

export interface IHistory {
    id: string;
    summary: string;
    userId: string
}

const path = {
    history: "/c/cons",
    sendMess: "/c/chat",
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

export { sendMess, getHistory };

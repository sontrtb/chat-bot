import rootApi from "./api";

export interface ISendMessBody {
    message: string;
}

const path = {
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

export { sendMess };

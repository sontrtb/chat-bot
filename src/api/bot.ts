import { IBot } from "@/types/chatbot";
import rootApi from "./api";

const path = {
  getListBot: "/c/ms",
};

const getListBot = async (): Promise<IBot[]> => {
  return await rootApi(
    {
      url: path.getListBot,
      method: "get",
    },
  );
};

export { getListBot };

import { IUser } from "@/types/user";
import rootApi from "./api";

export interface ILoginBody {
  username: string;
  password: string;
}


const path = {
  login: "/u/signin",
};

const login = async (data: ILoginBody): Promise<IUser> => {
  return await rootApi(
    {
      url: path.login,
      method: "post",
      data,
    },
    { withToken: false },
  );
};

export { login };

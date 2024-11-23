import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store";
import {  setUser } from "../slices/userSlice";
import { IUser } from "@/types/user";

const useSetUser = (): ((user: IUser) => void) => {
  const dispatch = useDispatch();
  const setUsertStore = (user: IUser): void => {
    dispatch(setUser(user));
  };
  return setUsertStore;
};

const useGetUser = (): IUser | undefined => {
  const user = useSelector((state: RootState) => state.user);
  return user.user;
};

const useLogoutUser = () => {
  const logout = () => {
    localStorage.clear();
  }
  return logout;
};

export { useSetUser, useGetUser, useLogoutUser };
 
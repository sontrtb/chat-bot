import { IUser } from "@/types/user";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUserState {
  user: IUser | undefined
}

const initState: IUserState = {
  user: undefined
};

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | undefined>) => {
      return { ...state, user: action.payload };
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice;

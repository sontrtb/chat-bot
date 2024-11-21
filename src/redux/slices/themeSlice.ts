import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IThemeState {
  theme: string
}

const initState: IThemeState = {
  theme: "light"
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      return { ...state, theme: action.payload };
    },
  },
});
export const { setTheme } = themeSlice.actions;
export default themeSlice;

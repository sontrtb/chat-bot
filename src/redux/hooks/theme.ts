import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store";
import {  setTheme } from "../slices/themeSlice";

const useSetTheme = (): ((theme: string) => void) => {
  const dispatch = useDispatch();
  const setThemeStore = (theme: string): void => {
    dispatch(setTheme(theme));
  };
  return setThemeStore;
};

const useGetCurrentTheme = (): string => {
  const theme = useSelector((state: RootState) => state.theme);
  return theme.theme;
};


export { useGetCurrentTheme, useSetTheme };

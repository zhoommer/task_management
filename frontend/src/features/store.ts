import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import projectReducer from "./project/projectSlice";
import dialogReducer from "./dialog/dialogSlice";
import taskReducer from "./task/taskSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    task: taskReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "./types";


type InitialState = {
  loading: boolean;
  tasks: Task[];
}

const initialState: InitialState = {
  loading: false,
  tasks: [],
}

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    }
  },
})


export default taskSlice.reducer;
export const { setLoading, setTasks, addTask } = taskSlice.actions;

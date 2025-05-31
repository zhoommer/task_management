import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "./types";

type InitialState = {
  loading: boolean;
  waitingTasks: Task[];
  inProgressTasks: Task[];
  testTasks: Task[];
  doneTasks: Task[];
  taskDetailDialogStatus: boolean;
  taskDetailState: Task | null;
}

const initialState: InitialState = {
  loading: false,
  waitingTasks: [],
  inProgressTasks: [],
  testTasks: [],
  doneTasks: [],
  taskDetailDialogStatus: false,
  taskDetailState: null,
}

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWaitingTask: (state, action: PayloadAction<Task[]>) => {
      state.waitingTasks = action.payload;
    },
    setInProgressTasks: (state, action: PayloadAction<Task[]>) => {
      state.inProgressTasks = action.payload;
    },
    setTestTasks: (state, action: PayloadAction<Task[]>) => {
      state.testTasks = action.payload;
    },
    setDoneTasks: (state, action: PayloadAction<Task[]>) => {
      state.doneTasks = action.payload;
    },
    removeTask: (state, action: PayloadAction<{ taskId: number; status: "waiting" | "inprogress" | "test" | "done" }>) => {
      const { status, taskId } = action.payload;

      if (status === 'waiting') {
        state.waitingTasks = state.waitingTasks.filter((task) => task.id !== taskId);
      }
      if (status === 'inprogress') {
        state.inProgressTasks = state.inProgressTasks.filter((task) => task.id !== taskId);
      }
      if (status === 'test') {
        state.testTasks = state.testTasks.filter((task) => task.id !== taskId);
      }
      if (status === 'done') {
        state.doneTasks = state.doneTasks.filter((task) => task.id !== taskId);
      }
    },
    openTaskDetail: (state) => {
      state.taskDetailDialogStatus = true;
    },
    closeTaskDetail: (state) => {
      state.taskDetailDialogStatus = false;
    },
    setTaskDetail: (state, action: PayloadAction<Task>) => {
      state.taskDetailState = action.payload;
    }
  },
});

export default taskSlice.reducer;
export const {
  setLoading,
  setWaitingTask,
  setInProgressTasks,
  setTestTasks,
  setDoneTasks,
  removeTask,
  openTaskDetail,
  closeTaskDetail,
  setTaskDetail,
} = taskSlice.actions;

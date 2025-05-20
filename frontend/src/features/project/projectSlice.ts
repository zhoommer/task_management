import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "./types";


interface InitialState {
  loading: boolean;
  projects: Project[];
}

const initialState: InitialState = {
  loading: false,
  projects: [],
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    }
  },
});

export default projectSlice.reducer;
export const { setLoading, setProjects, addProject } = projectSlice.actions;

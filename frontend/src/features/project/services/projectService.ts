import axiosClient from "@/api/axiosClient"
import type { Project } from "../types";


export const projectService = {
  async getAll(): Promise<{ message: string; data: Project[] }> {
    const response = await axiosClient.get<{ message: string; data: Project[] }>('project');
    return response.data;
  }
}

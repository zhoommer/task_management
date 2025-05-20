import axiosClient from "@/api/axiosClient"
import type { Project } from "../types";


export const projectService = {
  async getAll(): Promise<{ message: string; data: Project[] }> {
    const response = await axiosClient.get<{ message: string; data: Project[] }>('/project');
    return response.data;
  },

  async create(body: { name: string; description: string }): Promise<{ message: string; data: Project }> {
    const response = await axiosClient.post<{ message: string; data: Project }>('/project', body);
    return response.data;
  }
}

import axiosClient from "@/api/axiosClient";
import type { CreateTaskBody, CreateTaskResponse, Response } from "../types";


export const taskService = {
  async getAll(projectId?: string, status?: 'waiting' | 'inprogress' | 'test' | 'done'): Promise<Response> {
    const response = await axiosClient.get<Response>(`/task?projectId=${projectId}&status=${status}`);
    return response.data;
  },

  async create(formData: CreateTaskBody): Promise<{ message: string; data: CreateTaskResponse }> {
    const response = await axiosClient.post<{ message: string; data: CreateTaskResponse }>('/task', formData);
    return response.data;
  }
}




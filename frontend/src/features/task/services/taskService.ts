import axiosClient from "@/api/axiosClient";
import type { CreateTaskBody, CreateTaskResponse, Response, Task } from "../types";


export const taskService = {
  async getAll(userId?: string, projectId?: string, status?: 'waiting' | 'inprogress' | 'test' | 'done'): Promise<Response> {
    const response = await axiosClient.get<Response>(`/task?userId=${userId}&projectId=${projectId}&status=${status}`);
    return response.data;
  },

  async create(formData: CreateTaskBody): Promise<{ message: string; data: CreateTaskResponse }> {
    const response = await axiosClient.post<{ message: string; data: CreateTaskResponse }>('/task', formData);
    return response.data;
  },

  async updateStatus(taskId: number, columnStatus: 'waiting' | 'inprogress' | 'test' | 'done'): Promise<{ message: string; data: Task }> {
    const response = await axiosClient.patch<{ message: string; data: Task }>(`/task/${taskId}`, { status: columnStatus });
    return response.data;
  },

  async delete(id: number): Promise<Task> {
    const response = await axiosClient.delete<Task>(`/task/${id}`);
    return response.data;
  }
}




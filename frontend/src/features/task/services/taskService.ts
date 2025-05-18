import axiosClient from "@/api/axiosClient";
import type { Response } from "../types";


export const taskService = {
  async getAll(projectId?: string, status?: 'waiting' | 'inprogress' | 'test' | 'done'): Promise<Response> {
    const response = await axiosClient.get<Response>(`/task?projectId=${projectId}&status=${status}`);
    return response.data;
  },

  async getTaskAssignmentByTaskId(taskId: string) {
    const response = await axiosClient.get(`/assignment/${taskId}`);
    return response.data;
  }
}




import axiosClient from "@/api/axiosClient";
import type { User } from "@/features/auth/types";


export const userService = {
  async getAll(): Promise<{ message: string; data: User[] }> {
    const response = await axiosClient.get<{ message: string; data: User[] }>('/users');
    return response.data;
  }
}

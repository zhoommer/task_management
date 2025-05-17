import axiosClient from "@/api/axiosClient";
import type { Response } from "../types";


export const authService = {
  async login(credentials: { email: string; passwordHash: string }): Promise<Response> {
    const response = await axiosClient.post<Response>('/auth/login', credentials);

    return response.data;
  }
}

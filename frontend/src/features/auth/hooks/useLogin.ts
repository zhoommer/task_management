import { useState } from "react";
import { authService } from "../services/authService";
import { type InitialState } from "../types";
import { useAuthProvider } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function useLogin() {
  const navigate = useNavigate();

  const { loading, setLoading, setAuthenticated } = useAuthProvider();

  const [formState, setFormState] = useState<InitialState>({
    email: '',
    passwordHash: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await authService.login(formState);

      localStorage.setItem('token', response.data.token);

      localStorage.setItem('user', JSON.stringify(response.data.user));

      localStorage.setItem('avatarName', response.data.avatarName);

      setAuthenticated(true);

      toast.success('Tekrar hoşgeldiniz.');

      navigate('/?user=&project=');

    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleChange,
    handleSubmit,
  }
}

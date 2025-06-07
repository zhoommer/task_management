import { authService } from "../services/authService";
import { useAuthProvider } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export default function useLogin() {
  const navigate = useNavigate();

  const { loading, setLoading, setAuthenticated } = useAuthProvider();

  const FormSchema = z.object({
    email: z.string().email('Geçerli bir e-posta adresi girin.'),
    passwordHash: z.string()
    // .min(6, 'Parola en az 6 karakter olmalıdır.'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);

      const response = await authService.login(data);

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
    register,
    handleSubmit,
    errors,
    onSubmit,
  }
}

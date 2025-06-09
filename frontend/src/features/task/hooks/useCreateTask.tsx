import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskService } from "../services/taskService";
import { projectService } from "@/features/project/services/projectService";
import { userService } from "@/features/user/services/userService";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { setProjects } from "@/features/project/projectSlice";
import { setUsers } from "@/features/user/userSlice";
import { parse } from "date-fns";
import { addTask } from "../taskSlice";


export default function useCreateTask() {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { users } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false)

  const FormSchema = z.object({
    title: z.string({
    }).min(1, 'Zorunlu alan'),
    description: z.string({
      required_error: "Zorunlu alan",
    }).min(1, 'Zorunlu alan'),
    priority: z.enum(["low", "medium", "high", "critical"], {
      required_error: "Zorunlu alan",
    }),
    dueDate: z.string()
      .refine((val) => val.length > 0, {
        message: "Zorunlu alan",
      })
      .transform((val) => {
        const parsed = parse(val, "yyyy-MM-dd'T'HH:mm", new Date());
        return parsed.toISOString(); // ISO 8601 UTC string
      }),
    projectId: z.string({
      required_error: "Zorunlu alan",
    }).min(1, "Proje seçiniz"),
    assignedUserId: z.string({
      required_error: "Zorunlu alan",
    }).min(1, 'Kullanıcı seçiniz')
  });


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  useEffect(() => {
    if (!projects) {
      const fetchProject = async () => {
        const response = await projectService.getAll();
        dispatch(setProjects(response.data));
      }
      fetchProject();
    }
  }, [projects, dispatch])

  useEffect(() => {
    if (!users) {
      const fetchUsers = async () => {
        const response = await userService.getAll();
        dispatch(setUsers(response.data));
      }

      fetchUsers();
    }
  }, [dispatch, users]);

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      ...data, projectId: Number(data.projectId),
    }

    try {
      setLoading(true);
      const response = await taskService.create(formData);
      toast.success(`${response.data.title} başarılı bir şekilde oluşturuldu`);
      // dispatch(addTask(response.data));
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error(`Bir hata oluştu: ${error}`);
    } finally {
      setLoading(false);
    }
  }
  return {
    loading,
    users,
    projects,
    form,
    handleSubmit
  }
}

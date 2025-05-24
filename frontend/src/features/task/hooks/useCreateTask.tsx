import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskService } from "../services/taskService";
import { projectService } from "@/features/project/services/projectService";
import { userService } from "@/features/user/services/userService";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { closeDialog } from "@/features/dialog/dialogSlice";
import { setProjects } from "@/features/project/projectSlice";
import { setUsers } from "@/features/user/userSlice";


export default function useCreateTask() {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { users } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false)

  const FormSchema = z.object({
    title: z.string({
      required_error: "Zorunlu alan",
    }),
    description: z.string({
      required_error: "Zorunlu alan",
    }),
    priority: z.enum(["low", "medium", "high", "critical"], {
      required_error: "Zorunlu alan",
    }),
    dueDate: z.date({
      required_error: "Zorunlu alan",
    }),
    projectId: z.string({
      required_error: "Zorunlu alan",
    }),
    assignedUserId: z.string({
      required_error: "Zorunlu alan",
    })
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
      dispatch(closeDialog());
    } catch (error) {
      console.log(error);
      toast.error(`Bir hata oluştu: ${error}`,)
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

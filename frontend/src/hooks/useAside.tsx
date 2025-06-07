import { useEffect, useState } from "react";
import { projectService } from "@/features/project/services/projectService";
import { userService } from "@/features/user/services/userService";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { addProject, setProjects } from "@/features/project/projectSlice";
import { setUsers } from "@/features/user/userSlice";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function useAside() {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { users } = useAppSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const project = searchParams.get('project') || '';
  const user = searchParams.get('user') || '';

  const activeProject = (id: number): string => {
    if (Number(project) === id) return 'active__item';
    return '';
  }

  const activeUser = (id: string): string => {
    if (user === id) return 'active__item';
    return '';
  }

  const handleClick = (key: 'user' | 'project' | 'status', value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(Object.fromEntries(params.entries()));
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userService.getAll();
      dispatch(setUsers(response.data));
    }
    fetchUsers();
  }, [dispatch])

  useEffect(() => {
    const fetchAllProjects = async () => {
      const response = await projectService.getAll();
      dispatch(setProjects(response.data));
    }

    fetchAllProjects();
  }, [dispatch])

  const toggleProjectForm = () => {
    setShowForm(!showForm)
  }

  const FormSchema = z.object({
    name: z.string({
      required_error: 'Zorunlu alan',
    }).min(1, 'Zorunlu alan'),
    description: z.string({
      required_error: 'Zorunlu alan',
    }).min(1, 'Zorunlu alan'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const response = await projectService.create(data);
      dispatch(addProject(response.data));
      toast.success('Proje başarıyla eklendi.');
    } catch (error) {
      console.log(error);
      toast.error('Proje eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    activeProject,
    activeUser,
    handleClick,
    projects,
    users,
    showForm,
    toggleProjectForm,
    register,
    handleSubmit,
    errors,
    reset,
    onSubmit,
  }
}

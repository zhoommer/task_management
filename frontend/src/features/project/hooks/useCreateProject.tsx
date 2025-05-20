import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { projectService } from "../services/projectService";
import { toast } from "react-toastify";

export default function useCreateProject() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<{ name: string; description: string }>({
    name: '',
    description: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormState({ ...formState, [name]: value })
  }


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await projectService.create(formState);
      toast.success(`${response.data.name} başarılı bir şekilde oluşturuldu.`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }



  return {
    loading,
    handleChange,
    handleSubmit,
  }
}

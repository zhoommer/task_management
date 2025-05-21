import FormDialog from "@/components/formDialog";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userService } from "@/features/user/services/userService";
import type { User } from "@/features/user/types";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { projectService } from "@/features/project/services/projectService";
import type { Project } from "@/features/project/types";
import { taskService } from "../services/taskService";
import { toast } from "react-toastify";



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
})


const CreateTask = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUser] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  useEffect(() => {
    const fetchProject = async () => {
      const response = await projectService.getAll();
      setProjects(response.data);
    }

    fetchProject();
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userService.getAll();
      setUser(response.data);
    }

    fetchUsers();
  }, []);

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      ...data, projectId: Number(data.projectId),
    }

    try {
      const response = await taskService.create(formData);
      toast.success(`${response.data.title} başarılı bir şekilde oluşturuldu`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormDialog title="Görev Ekle">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div>
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proje</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Proje seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          projects.map((project, index) => (
                            <SelectItem key={index} value={String(project.id)}>{project.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlık</FormLabel>
                    <Input onChange={field.onChange} placeholder="Başlık giriniz" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Öncelik Derecesi</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Düşük</SelectItem>
                        <SelectItem value="medium">Orta</SelectItem>
                        <SelectItem value="high">Yüksek</SelectItem>
                        <SelectItem value="critical">Kritik</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="assignedUserId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kullanıcı</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Kullanıcı seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          users.map((user, index) => (
                            <SelectItem key={index} value={String(user.id)}>{user.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <>
                    <FormLabel>Bitiş Tarihi</FormLabel>
                    <FormControl>
                      <DatePickerDemo onChange={field.onChange} selectedDate={field.value} />
                    </FormControl>
                  </>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea onChange={field.onChange} placeholder="Açıklama giriniz" />
                    </FormControl>
                  </>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <Button type="submit">Kaydet</Button>
          </div>
        </form>
      </Form>
    </FormDialog>
  )
}

export default CreateTask;

import FormDialog from "@/components/formDialog";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import useCreateTask from "../hooks/useCreateTask";


const CreateTask = () => {
  const { loading, users, projects, form, handleSubmit } = useCreateTask();

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
                    <FormControl>
                      <Input onChange={field.onChange} placeholder="Başlık giriniz" />
                    </FormControl>
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
            <Button type="submit" disabled={loading}>Kaydet</Button>
          </div>
        </form>
      </Form>
    </FormDialog>
  )
}

export default CreateTask;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateProject from "../hooks/useCreateProject";


const CreateProject = () => {
  const { loading, handleChange, handleSubmit } = useCreateProject();

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label>Proje Adı</Label>
        <Input type="text" name="name" placeholder="Proje adı giriniz" onChange={handleChange} />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Açıklama</Label>
        <Textarea name="description" placeholder="Açıklama yazınız" onChange={handleChange} />
      </div>

      <div className="flex justify-end">
        <Button className="bg-blue-700 hover:bg-blue-800" type="submit" disabled={loading}>Kaydet</Button>
      </div>
    </form>
  )
}

export default CreateProject;

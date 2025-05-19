import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateTask = () => {
  return (
    <form>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <Label>Başlık</Label>
          <Input type="text" name="title" placeholder="Başlık giriniz" />
        </div>
        <div>
          <Label>Öncelik Derecesi</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue className="text-zinc-200">Seçiniz</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="low">Düşük</SelectItem>
                <SelectItem value="medium">Orta</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
                <SelectItem value="critical">Kritik</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Bitiş Tarihi</Label>
          <DatePickerDemo />
        </div>
      </div>
    </form>
  )
}

export default CreateTask;

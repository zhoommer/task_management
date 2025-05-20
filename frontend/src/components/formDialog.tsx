import { useAppSelector } from "@/features/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"


type FormDialogProps = {
  title: string;
  children: React.ReactNode;
}


const FormDialog = ({ title, children }: FormDialogProps) => {
  const { isOpen } = useAppSelector((state) => state.dialog);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default FormDialog;

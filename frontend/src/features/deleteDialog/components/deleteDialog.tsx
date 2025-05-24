import type { Task } from "@/features/task/types"
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/features/store"
import { closeDeleteDialog } from "../deleteDialogSlice";


const DeleteDialog = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();
  const { show } = useAppSelector((state) => state.deleteDialog);

  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Silmek istediğinize emin misiniz?</AlertDialogTitle>
          <AlertDialogDescription>
            {task.title} silinecek. Yine de devam etmek istiyor musunuz?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dispatch(closeDeleteDialog())}>İptal</AlertDialogCancel>
          <AlertDialogAction>Devam</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog;

import { openDialog } from "@/features/dialog/dialogSlice";
import { useAppDispatch } from "@/features/store";
import { PlusIcon } from "lucide-react"

const AddTaskButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="absolute bottom-10 right-10 rounded-full bg-blue-500 w-10 h-10 flex justify-center items-center text-white hover:rotate-45 transition-all"
      onClick={() => dispatch(openDialog())}
    >
      <PlusIcon />
    </button>
  )
}

export default AddTaskButton;

import { useAppSelector } from "@/features/store";
import useTaskCard from "../hooks/useTaskCard";


const TaskDetail = () => {

  const { taskDetailDialogStatus, taskDetailState } = useAppSelector((state) => state.task);

  const { users } = useAppSelector((state) => state.user);

  const { priorityLevel } = useTaskCard();


  return (
    <div>Task Detail</div>
  )
}

export default TaskDetail;

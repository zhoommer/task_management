import type { Task } from "../types";
import useTaskCard from "../hooks/useTaskCard";
import { taskService } from "../services/taskService";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppDispatch } from "@/features/store";
import { removeTask } from "../taskSlice";
import { useColorThemeProvider } from "@/context/colorThemeContext";
import { getAvatarName } from "@/lib/getAvatarName";


const TaskCard = ({ task }: { task: Task }) => {
  const { theme } = useColorThemeProvider();
  const dispatch = useAppDispatch();
  const { priorityLevel } = useTaskCard();
  const [loading, setLoading] = useState<boolean>(false);


  const handleDelete = async () => {
    try {
      setLoading(true);
      await taskService.delete(task.id);
      toast.success(`${task.title} silindi.`);
      dispatch(removeTask({ taskId: task.id, status: task.status }))
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div className={`card ${theme}`}>
        <div className={`card__header ${theme}`}>
          <h4>{task.title}</h4>
          <div className="card__user">{getAvatarName(task.assignments[0].user.name)}</div>
        </div>
        <div className={`card__content ${theme}`}>
          <p>{task.description}</p>
        </div>
        <div className={`card__footer ${theme}`}>
          <span>
            {
              task.createdAt.split('T')[0]
              + ' / ' +
              task.createdAt.split('T')[1].split('.')[0]
            }
          </span>
          {priorityLevel(task.priority)}
        </div>
      </div>
    </>
  )
}

export default TaskCard;

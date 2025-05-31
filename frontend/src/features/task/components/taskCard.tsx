import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Task } from "../types";
import useTaskCard from "../hooks/useTaskCard";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ExternalLink, SquarePen, Trash } from "lucide-react";
import { taskService } from "../services/taskService";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppDispatch } from "@/features/store";
import { openTaskDetail, removeTask, setTaskDetail } from "../taskSlice";
import { getAvatarName } from "@/lib/getAvatarName";


const TaskCard = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();
  const { priorityLevel, cardGradient } = useTaskCard();
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
      <ContextMenu>
        <ContextMenuTrigger disabled={loading}>
          <Card
            className={`bg-gradient-to-r ${cardGradient(task.status)} opacity-70 rounded p-3 mt-2 hover:opacity-100 transition-all cursor-pointer`}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>
                  {task.title}
                </span>
                <Avatar className="bg-purple-300 text-zinc-100 flex justify-center items-center">
                  <AvatarFallback className="text-black">{getAvatarName(task.assignments[0].user.name)}</AvatarFallback>
                </Avatar>
              </CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <span className="text-sm font-medium">
                {task.createdAt.split("T")[0] + ' / ' + task.createdAt.split('T')[1].split(".")[0]}
              </span>
              {priorityLevel(task.priority)}
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="flex justify-between"
            onClick={() => {
              dispatch(openTaskDetail());
              dispatch(setTaskDetail(task));
            }}
          >
            Aç
            <ExternalLink />
          </ContextMenuItem>
          <ContextMenuItem className="flex justify-between">
            Düzenle
            <SquarePen />
          </ContextMenuItem>
          <ContextMenuItem
            className="flex justify-between"
            onClick={handleDelete}
          >
            Sil
            <Trash />
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  )
}

export default TaskCard;

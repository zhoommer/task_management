import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Task } from "../types";
import useTaskCard from "../hooks/useTaskCard";


const TaskCard = ({ task }: { task: Task }) => {
  const { priorityLevel, cardGradient } = useTaskCard();

  return (
    <Card
      className={`bg-gradient-to-r ${cardGradient(task.status)} opacity-70 rounded p-3 mt-2 hover:opacity-100 transition-all cursor-pointer`}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {task.title}
          </span>
          <Avatar className="bg-purple-300 text-zinc-100 flex justify-center items-center">
            <AvatarFallback className="text-black">{task.assignments[0].user.name.split(' ')[0][0] + task.assignments[0].user.name.split(' ').at(-1)[0]}</AvatarFallback>
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
  )
}

export default TaskCard;

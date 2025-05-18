import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Task } from "../types";


// Oncelik durumlarina gore farkli renklerde <span></span> olusturur.
const priorityLevel = (priority: 'low' | 'medium' | 'high' | 'critical') => {
  switch (priority) {
    case priority = 'low':
      return <span className="bg-green-300 rounded text-xs px-2 py-1">Düşük</span>
    case priority = 'medium':
      return <span className="bg-yellow-300 rounded text-xs px-2 py-1">Orta</span>
    case priority = 'high':
      return <span className="bg-orange-300 rounded text-xs px-2 py-1">Yüksek</span>
    case priority = 'critical':
      return <span className="bg-red-300 rounded px-2 py-1">Kritik</span>
    default:
      break;
  }
}

// Task durumuna gore farkli gradient renklerini doner.
const cardGradient = (status: 'waiting' | 'inprogress' | 'test' | 'done') => {
  switch (status) {
    case status = 'waiting':
      return 'from-orange-300 to-red-400';
    case status = 'inprogress':
      return 'from-yellow-300 to-orange-400';
    case status = 'test':
      return 'from-blue-300 to-purple-400';
    case status = 'done':
      return 'from-sky-300 to-green-300';
    default:
      break;
  }
}

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Card className={`bg-gradient-to-r ${cardGradient(task.status)} opacity-50 rounded p-3 mt-2 hover:opacity-100 transition-all cursor-pointer`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {task.title}
          </span>
          <Avatar className="bg-purple-300 text-zinc-100 flex justify-center items-center">
            <AvatarFallback className="text-black">{task.createdBy.name.split(" ")[0][0] + task.createdBy.name.split(" ").at(-1)[0]}</AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <span>
          {task.createdAt.split("T")[0] + ' / ' + task.createdAt.split('T')[1].split(".")[0]}
        </span>
        {priorityLevel(task.priority)}
      </CardContent>
    </Card>)
}

export default TaskCard;

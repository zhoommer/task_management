import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { taskService } from "../services/taskService";
import type { Task } from "../types";


export default function useWaitingTask() {

  const [loading, setLoading] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [searchParams] = useSearchParams();

  const projectId = searchParams.get('projectId') || '';

  const [taskList, setTaskList] = useState(tasks || []);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)


  useEffect(() => {
    setTaskList(tasks || [])
  }, [tasks])

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedList = [...taskList];
    const [removed] = updatedList.splice(draggedIndex, 1);
    updatedList.splice(index, 0, removed);
    setDraggedIndex(index);
    setTaskList(updatedList);
  };

  const handleDrop = () => {
    setDraggedIndex(null);
    // Optionally: persist new order here
  };

  useEffect(() => {
    const fetchWaitingTasks = async () => {
      try {
        setLoading(true);
        const response = await taskService.getAll(projectId, 'waiting');
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchWaitingTasks();
  }, [projectId])

  return {
    loading,
    taskList,
    handleDragStart,
    handleDragOver,
    handleDrop,
  }
}

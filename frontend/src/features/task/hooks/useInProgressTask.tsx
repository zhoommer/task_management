import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { taskService } from "../services/taskService";
import type { Task } from "../types";



export default function useInProgressTask() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchParams] = useSearchParams();

  const projectId = searchParams.get('projectId') || '';


  useEffect(() => {
    const fetchInProgressTasks = async () => {
      try {
        setLoading(true);
        const response = await taskService.getAll(projectId, 'inprogress');
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchInProgressTasks();

  }, [projectId]);



  return {
    loading,
    tasks
  }
}

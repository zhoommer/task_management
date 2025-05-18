import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { taskService } from "../services/taskService";
import type { Task } from "../types";


export default function useTestTask() {
  const [loading, setLoading] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [searchParams] = useSearchParams();

  const projectId = searchParams.get('projectId') || '';

  useEffect(() => {
    const fetchTestTasks = async () => {
      try {
        setLoading(true);
        const response = await taskService.getAll(projectId, 'waiting');
        setTasks(response.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchTestTasks();
  }, [projectId])

  return {
    loading,
    tasks,
  }
}

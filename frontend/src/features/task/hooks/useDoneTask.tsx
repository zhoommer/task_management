import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { taskService } from "../services/taskService";
import type { Task } from "../types";


export default function useDoneTask() {
  const [loading, setLoading] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [searchParams] = useSearchParams();

  const projectId = searchParams.get('projectId') || '';

  useEffect(() => {
    const fetchDonesTasks = async () => {
      try {
        setLoading(true);
        const response = await taskService.getAll(projectId, 'done');
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonesTasks();
  }, [projectId]);

  return {
    loading,
    tasks,
  }
}

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { taskService } from "../services/taskService";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { setTestTasks } from "../taskSlice";


export default function useTestTask() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const { testTasks } = useAppSelector((state) => state.task);

  const [searchParams] = useSearchParams();

  const project = searchParams.get('project') || '';
  const user = searchParams.get('user') || '';

  const [taskList, setTaskList] = useState(testTasks || []);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setTaskList(testTasks || [])
  }, [testTasks])

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
    const fetchTestTasks = async () => {
      try {
        setLoading(true);
        const response = await taskService.getAll(user, project, 'test');
        dispatch(setTestTasks(response.data));
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchTestTasks();
  }, [user, project])

  return {
    loading,
    taskList,
    handleDragStart,
    handleDragOver,
    handleDrop,
  }
}

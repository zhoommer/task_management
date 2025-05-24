import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { taskService } from "../services/taskService";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { setDoneTasks } from "../taskSlice";


export default function useDoneTask() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const { doneTasks } = useAppSelector((state) => state.task);

  const [searchParams] = useSearchParams();

  const project = searchParams.get('project') || '';
  const user = searchParams.get('user') || '';

  const [taskList, setTaskList] = useState(doneTasks || []);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setTaskList(doneTasks || [])
  }, [doneTasks])

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
  };

  useEffect(() => {
    const fetchDoneTasks = async () => {
      try {
        setLoading(true);
        const response = await taskService.getAll(user, project, 'done');
        dispatch(setDoneTasks(response.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoneTasks();
  }, [user, project]);

  return {
    loading,
    taskList,
    handleDragStart,
    handleDragOver,
    handleDrop
  }
}

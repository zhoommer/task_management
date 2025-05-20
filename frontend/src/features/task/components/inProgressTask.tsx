import { useEffect, useState } from "react";
import TaskCard from "./taskCard";
import useInProgressTask from "../hooks/useInProgressTask";
import Loading from "@/components/ui/loading";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedDiv from "@/components/animatedDiv";

const InProgressTask = () => {
  const { loading, tasks } = useInProgressTask();
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
  if (loading) return <Loading />

  return (
    <div className="rounded-xl bg-gradient-to-b from-yellow-200 to-orange-200 p-3">
      <div className="rounded-lg p-2 bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center gap-2">
        <h3 className="text-zinc-200">Devam Eden</h3>
        <span className="bg-purple-300 rounded-full w-5 h-5 p-2 text-xs text-zinc-900 flex justify-center items-center">{tasks ? tasks.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
    </div>
  )
}

export default InProgressTask;

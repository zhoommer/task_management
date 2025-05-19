import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import useTestTask from "../hooks/useTestTask";
import TaskCard from "./taskCard";
import { motion, AnimatePresence } from "framer-motion";

const TestTask = () => {
  const { loading, tasks } = useTestTask();
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
    <div className="border border-b-0 border-t-0 border-zinc-800 rounded-xl hover:shadow-[0_0_8px_rgba(139,92,246,0.8)] p-3">
      <div className="rounded-lg p-2 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center gap-2">
        <h3 className="text-zinc-200">Test</h3>
        <span className="bg-purple-300 rounded-full w-5 h-5 p-2 text-xs text-zinc-900 flex justify-center items-center">{tasks ? tasks.length : 0}</span>
      </div>
      <AnimatePresence>
        {taskList?.map((task, index) => (
          <motion.div
            key={task.id ?? index}
            layout
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0.7 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={e => handleDragOver(e, index)}
            onDrop={handleDrop}
            style={{ cursor: "grab" }}
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TestTask;

import TaskCard from "@/features/task/components/taskCard";
import type { Task } from "@/features/task/types";
import { motion, AnimatePresence } from "framer-motion";

type AnimatedDivProps = {
  taskList: Task[];
  onDragStart: (index: number) => void;
  onDragOver: (e: any, index: number) => void;
  onDrop: any;
}


const AnimatedDiv = ({ taskList, onDragStart, onDragOver, onDrop }: AnimatedDivProps) => {
  return (
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
          onDragStart={() => onDragStart(index)}
          onDragOver={e => onDragOver(e, index)}
          onDrop={onDrop}
          style={{ cursor: "grab" }}
        >
          <TaskCard task={task} />
        </motion.div>
      ))}
    </AnimatePresence>)
}

export default AnimatedDiv;

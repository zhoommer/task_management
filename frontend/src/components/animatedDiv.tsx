import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/features/task/components/taskCard";
import type { Task } from "@/features/task/types";

type AnimatedDivProps = {
  taskList: Task[];
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop: () => void;
}


const TRANSITION = { type: "spring", stiffness: 500, damping: 30 };
const INITIAL = { scale: 0.95, opacity: 0.7 };
const ANIMATE = { scale: 1, opacity: 1 };
const EXIT = { scale: 0.95, opacity: 0.7 };
const STYLE = { cursor: "grab" };

const MemoizedTaskCard = React.memo(TaskCard);

const AnimatedDiv = ({ taskList, onDragStart, onDragOver, onDrop }: AnimatedDivProps) => {

  const handleDragStart = useCallback(
    (index: number) => () => onDragStart(index),
    [onDragStart]
  );
  const handleDragOver = useCallback(
    (index: number) => (e: React.DragEvent<HTMLDivElement>) => onDragOver(e, index),
    [onDragOver]
  );

  return (
    <AnimatePresence>
      {taskList?.map((task, index) => (
        <motion.div
          key={task.id}
          layout
          initial={INITIAL}
          animate={ANIMATE}
          exit={EXIT}
          transition={TRANSITION}
          draggable
          onDragStart={handleDragStart(index)}
          onDragOver={handleDragOver(index)}
          onDrop={onDrop}
          style={STYLE}
        >
          <MemoizedTaskCard task={task} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default AnimatedDiv;

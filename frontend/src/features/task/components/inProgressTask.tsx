import useInProgressTask from "../hooks/useInProgressTask";
import AnimatedDiv from "@/components/animatedDiv";
import { useColorThemeProvider } from "@/context/colorThemeContext";
import { Loader2 } from "lucide-react";

const InProgressTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useInProgressTask();

  const { theme } = useColorThemeProvider();



  if (loading) return <Loader2 className="spin__loading" />

  return (
    <div className={`task__card__container ${theme}`}>
      <div className={`task__header ${theme}`}>
        <h3 className={`task__title inProgress__title ${theme}`}>Devam Eden</h3>
        <span className={`task__count inProgress__count`}>{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
    </div>
  )
}

export default InProgressTask;

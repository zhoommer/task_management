import useDoneTask from "../hooks/useDoneTask";
import AnimatedDiv from "@/components/animatedDiv";
import { useColorThemeProvider } from "@/context/colorThemeContext";
import { Loader2 } from "lucide-react";

const DoneTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useDoneTask();

  const { theme } = useColorThemeProvider();
  if (loading) return <Loader2 className="spin__loading" />

  return (
    <div
      className={`task__card__container ${theme}`}
    >
      <div className={`task__header ${theme}`}>
        <h3 className={`task__title done__title ${theme}`}>Biten</h3>
        <span className={`task__count done__count ${theme}`}>{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
    </div>
  )
}

export default DoneTask;

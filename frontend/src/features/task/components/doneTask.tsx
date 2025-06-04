import useDoneTask from "../hooks/useDoneTask";
import Loading from "@/components/ui/loading";
import AnimatedDiv from "@/components/animatedDiv";
import { useColorThemeProvider } from "@/context/colorThemeContext";

const DoneTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useDoneTask();

  const { theme } = useColorThemeProvider();
  if (loading) return <Loading />

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

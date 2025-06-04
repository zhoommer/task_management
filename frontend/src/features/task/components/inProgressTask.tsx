import useInProgressTask from "../hooks/useInProgressTask";
import Loading from "@/components/ui/loading";
import AnimatedDiv from "@/components/animatedDiv";
import { useColorThemeProvider } from "@/context/colorThemeContext";

const InProgressTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useInProgressTask();

  const { theme } = useColorThemeProvider();



  if (loading) return <Loading />

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

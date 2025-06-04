import useWaitingTask from "../hooks/useWaitingTask";
import Loading from "@/components/ui/loading";
import AnimatedDiv from "@/components/animatedDiv";
import { useColorThemeProvider } from "@/context/colorThemeContext";

const WaitingTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useWaitingTask();

  const { theme } = useColorThemeProvider();

  if (loading) return <Loading />;

  return (
    <div className={`task__card__container ${theme}`}>
      <div className={`task__header ${theme}`}>
        <h3 className={`task__title waiting__title ${theme}`}>Bekleyen</h3>
        <span className={`task__count waiting__count ${theme}`}>{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
    </div>
  )
}

export default WaitingTask;

import Loading from "@/components/ui/loading";
import useTestTask from "../hooks/useTestTask";
import AnimatedDiv from "@/components/animatedDiv";
import { useColorThemeProvider } from "@/context/colorThemeContext";

const TestTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useTestTask();

  const { theme } = useColorThemeProvider();

  if (loading) return <Loading />

  return (
    <div className={`task__card__container ${theme}`}>
      <div className={`task__header ${theme}`}>
        <h3 className={`task__title test__title`}>Test</h3>
        <span className={`task__count test__count`}>{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
    </div>
  )
}

export default TestTask;

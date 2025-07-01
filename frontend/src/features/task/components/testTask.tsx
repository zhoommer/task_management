import useTestTask from "../hooks/useTestTask";
import AnimatedDiv from "@/components/animatedDiv";
import { Loader2 } from "lucide-react";

const TestTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useTestTask();


  if (loading) return <Loader2 className="spin__loading" />

  return (
    <div className='task__card__container'>
      <div className='task__header'>
        <h3 className='task__title test__title'>Test</h3>
        <span className='task__count test__count'>{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={async () => handleDrop('test')} />
    </div>
  )
}

export default TestTask;

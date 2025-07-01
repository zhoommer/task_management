import useInProgressTask from "../hooks/useInProgressTask";
import AnimatedDiv from "@/components/animatedDiv";
import { Loader2 } from "lucide-react";

const InProgressTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useInProgressTask();




  if (loading) return <Loader2 className="spin__loading" />

  return (
    <div className='task__card__container'>
      <div className='task__header'>
        <h3 className='task__title inProgress__title'>Devam Eden</h3>
        <span className='task__count inProgress__count'>{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={async () => handleDrop('inprogress')} />
    </div>
  )
}

export default InProgressTask;

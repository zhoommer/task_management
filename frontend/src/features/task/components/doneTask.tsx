import useDoneTask from "../hooks/useDoneTask";
import AnimatedDiv from "@/components/animatedDiv";
import { Loader2 } from "lucide-react";

const DoneTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useDoneTask();

  if (loading) return <Loader2 className="spin__loading" />

  return (
    <div
      className='task__card__container'
    >
      <div className='task__header'>
        <h3 className='task__title done__title'>Biten</h3>
        <span className='task__count done__count'>{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={async () => handleDrop('done')} />
    </div>
  )
}

export default DoneTask;

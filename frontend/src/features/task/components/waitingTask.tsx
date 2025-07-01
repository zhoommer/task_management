import useWaitingTask from "../hooks/useWaitingTask";
import AnimatedDiv from "@/components/animatedDiv";
import { Loader2 } from "lucide-react";

const WaitingTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useWaitingTask();


  if (loading) return <Loader2 className="spin__loading" />;

  return (
    <div className='task__card__container'>
      <div className='task__header'>
        <h3 className='task__title waiting__title'>Bekleyen</h3>
        <span className='task__count waiting__count'>{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={async () => handleDrop('waiting')} />
    </div>
  )
}

export default WaitingTask;

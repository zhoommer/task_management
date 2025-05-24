import useWaitingTask from "../hooks/useWaitingTask";
import Loading from "@/components/ui/loading";
import AnimatedDiv from "@/components/animatedDiv";

const WaitingTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useWaitingTask();

  if (loading) return <Loading />;

  return (
    <div className="rounded-xl bg-gradient-to-b from-orange-50 to-red-50 p-3 overflow-y-scroll h-[90vh] hide-scrollbar">
      <div className="rounded-lg p-2 bg-gradient-to-r from-orange-200 to-red-300 flex items-center justify-center gap-2">
        <h3 className="text-red-950">Bekleyen</h3>
        <span className="bg-red-300 rounded-full w-5 h-5 p-2 text-xs text-red-950 flex justify-center items-center">{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
    </div>
  )
}

export default WaitingTask;

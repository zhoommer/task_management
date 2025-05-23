import useInProgressTask from "../hooks/useInProgressTask";
import Loading from "@/components/ui/loading";
import AnimatedDiv from "@/components/animatedDiv";

const InProgressTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useInProgressTask();



  if (loading) return <Loading />

  return (
    <div className="rounded-xl bg-gradient-to-b from-yellow-50 to-orange-50 p-3 overflow-y-scroll h-[90vh]">
      <div className="rounded-lg p-2 bg-gradient-to-r from-yellow-200 to-orange-300 flex items-center justify-center gap-2">
        <h3 className="text-orange-950">Devam Eden</h3>
        <span className="bg-orange-300 rounded-full w-5 h-5 p-2 text-xs text-orange-950 flex justify-center items-center">{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
    </div>
  )
}

export default InProgressTask;

import useDoneTask from "../hooks/useDoneTask";
import Loading from "@/components/ui/loading";
import AnimatedDiv from "@/components/animatedDiv";

const DoneTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useDoneTask();

  if (loading) return <Loading />

  return (
    <div
      className="rounded-xl bg-gradient-to-b from-sky-50 to-green-50 p-3 overflow-y-scroll h-[90vh]"
    >
      <div className="rounded-lg p-2 bg-gradient-to-r from-sky-200 to-green-300 flex items-center justify-center gap-2">
        <h3 className="text-green-950">Biten</h3>
        <span className="bg-green-400 rounded-full w-5 h-5 p-2 text-xs text-green-950 flex justify-center items-center">{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
    </div>
  )
}

export default DoneTask;

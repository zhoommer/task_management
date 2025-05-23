import Loading from "@/components/ui/loading";
import useTestTask from "../hooks/useTestTask";
import AnimatedDiv from "@/components/animatedDiv";

const TestTask = () => {
  const { loading, taskList, handleDragStart, handleDragOver, handleDrop } = useTestTask();

  if (loading) return <Loading />

  return (
    <div className="rounded-xl bg-gradient-to-b from-blue-50 to-purple-50 p-3 overflow-y-scroll h-[90vh]">
      <div className="rounded-lg p-2 bg-gradient-to-r from-blue-200 to-purple-300 flex items-center justify-center gap-2">
        <h3 className="text-purple-950">Test</h3>
        <span className="bg-purple-300 rounded-full w-5 h-5 p-2 text-xs text-purple-950 flex justify-center items-center">{taskList ? taskList.length : 0}</span>
      </div>
      <AnimatedDiv taskList={taskList} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} />
    </div>
  )
}

export default TestTask;

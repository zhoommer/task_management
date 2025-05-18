import Loading from "@/components/ui/loading";
import useTestTask from "../hooks/useTestTask";
import TaskCard from "./taskCard";

const TestTask = () => {
  const { loading, tasks } = useTestTask();

  if (loading) return <Loading />

  return (
    <div className="border border-b-0 border-t-0 border-zinc-800 rounded-xl hover:shadow-[0_0_8px_rgba(139,92,246,0.8)] p-3">
      <div className="rounded-lg p-2 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center gap-2">
        <h3 className="text-zinc-200">Test</h3>
        <span className="bg-purple-300 rounded-full w-5 h-5 p-2 text-xs text-zinc-900 flex justify-center items-center">{tasks ? tasks.length : 0}</span>
      </div>
      {
        tasks?.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))
      }
    </div>
  )
}

export default TestTask;

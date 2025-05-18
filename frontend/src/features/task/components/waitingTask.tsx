import useWaitingTask from "../hooks/useWaitingTask";

import TaskCard from "./taskCard";

import Loading from "@/components/ui/loading";

const WaitingTask = () => {
  const { loading, tasks } = useWaitingTask();

  if (loading) return <Loading />;

  return (
    <div className="border border-b-0 border-t-0 border-zinc-800 rounded-xl shadow-sm hover:shadow-red-500 transition-all p-3">
      <div className="rounded-lg p-2 bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center gap-2">
        <h3 className="text-zinc-200">Bekleyen</h3>
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

export default WaitingTask;

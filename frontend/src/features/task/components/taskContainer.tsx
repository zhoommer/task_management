import CreateTask from "./createTask";
import DoneTask from "./doneTask";
import InProgressTask from "./inProgressTask";
import TaskDetail from "./taskDetail";
import TestTask from "./testTask";
import WaitingTask from "./waitingTask";


const TaskContainer = () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 gap-3 h-[90dvh] m-2">
      <WaitingTask />
      <InProgressTask />
      <TestTask />
      <DoneTask />
      <CreateTask />
      <TaskDetail />
    </div>
  )
}

export default TaskContainer;

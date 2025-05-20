import CreateTask from "./createTask";
import DoneTask from "./doneTask";
import InProgressTask from "./inProgressTask";
import TestTask from "./testTask";
import WaitingTask from "./waitingTask";


const TaskContainer = () => {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 h-[90dvh] m-2">
      <WaitingTask />
      <InProgressTask />
      <TestTask />
      <DoneTask />
      <CreateTask />
    </div>
  )
}

export default TaskContainer;

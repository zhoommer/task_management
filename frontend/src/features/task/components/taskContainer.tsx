import DoneTask from "./doneTask";
import InProgressTask from "./inProgressTask";
import TestTask from "./testTask";
import WaitingTask from "./waitingTask";


const TaskContainer = () => {

  return (
    <div className="task__container">
      <WaitingTask />
      <InProgressTask />
      <TestTask />
      <DoneTask />
    </div>
  )
}

export default TaskContainer;

import CreateTask from "./createTask";
import DoneTask from "./doneTask";
import InProgressTask from "./inProgressTask";
import TaskDetail from "./taskDetail";
import TestTask from "./testTask";
import WaitingTask from "./waitingTask";


const TaskContainer = () => {

  return (
    <div className="task__container">
      <WaitingTask />
      <InProgressTask />
      <TestTask />
      <DoneTask />
      {/* <CreateTask /> */}
      {/* <TaskDetail /> */}
    </div>
  )
}

export default TaskContainer;

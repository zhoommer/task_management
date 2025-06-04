import useCreateTask from "../hooks/useCreateTask";


const CreateTask = () => {
  const { loading, users, projects, form, handleSubmit } = useCreateTask();

  return (
    <div>Create Task</div>
  )
}

export default CreateTask;

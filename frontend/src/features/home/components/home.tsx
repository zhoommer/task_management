import TaskContainer from "@/features/task/components/taskContainer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/?user=&project=");
  }, []);

  return (
    <TaskContainer />
  )
}

export default HomePage;

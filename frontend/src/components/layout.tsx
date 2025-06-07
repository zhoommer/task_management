import CreateTask from "@/features/task/components/createTask";
import Aside from "./aside";
import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='container'>
      <Navbar />
      <div className="main">
        <Aside />
        <section>{children}</section>
        <CreateTask />
      </div>
    </div>
  )
}

export default Layout;

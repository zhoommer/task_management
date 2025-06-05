import Aside from "./aside";
import Navbar from "./navbar";
import CreateTaskButton from "./ui/buttons/createTaskButton";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='container'>
      <Navbar />
      <div className="main">
        <Aside />
        <section>{children}</section>
        <CreateTaskButton />
      </div>
    </div>
  )
}

export default Layout;

import { useColorThemeProvider } from "@/context/colorThemeContext";
import Aside from "./aside";
import Navbar from "./navbar";
import CreateTaskButton from "./ui/buttons/createTaskButton";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useColorThemeProvider();
  return (
    <div className={`container ${theme}`}>
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

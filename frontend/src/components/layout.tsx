import { useColorThemeProvider } from "@/context/colorThemeContext";
import Aside from "./aside";
import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useColorThemeProvider();
  return (
    <div className={`container ${theme}`}>
      <Navbar />

      <div className="main">
        <Aside />
        <section>{children}</section>
      </div>
    </div>
  )
}

export default Layout;

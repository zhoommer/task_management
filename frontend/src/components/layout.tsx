import Aside from "./aside";
import Navbar from "./navbar";



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh bg-gradient-to-br from-gray-900 to-zinc-900">
      <nav>
        <Navbar />
      </nav>

      <div className="flex">
        <aside className="w-[200px]">
          <Aside />
        </aside>
        <section className="grow">{children}</section>
      </div>
    </div>
  )
}

export default Layout;

import Navbar from "./navbar";



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh bg-gradient-to-br from-gray-900 to-zinc-900">
      <nav>
        <Navbar />
      </nav>

      <div className="flex">
        <aside className="w-[200px] border">Aside</aside>

        <section className="grow">{children}</section>
      </div>

      <footer>Footer</footer>
    </div>
  )
}

export default Layout;

import Aside from "./aside";
import Navbar from "./navbar";
import AddTaskButton from "@/features/task/components/addButton";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="header">
      <Navbar />

      <div className="main">
        <Aside />
        {/* <Dialog> */}
        {/*   <DialogTrigger className="flex justify-center items-center bg-blue-300 hover:bg-blue-400 text-white gap-2 py-1 rounded-lg"> */}
        {/*     Proje Ekle */}
        {/*     <PlusIcon /> */}
        {/*   </DialogTrigger> */}
        {/*   <DialogContent> */}
        {/*     <DialogHeader> */}
        {/*       <DialogTitle>Proje Ekle</DialogTitle> */}
        {/*       <CreateProject /> */}
        {/*     </DialogHeader> */}
        {/*   </DialogContent> */}
        {/* </Dialog> */}

        <section>{children}</section>
        <AddTaskButton />
      </div>
    </div>
  )
}

export default Layout;

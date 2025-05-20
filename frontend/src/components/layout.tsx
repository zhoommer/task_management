import { PlusIcon } from "lucide-react";
import Aside from "./aside";
import Navbar from "./navbar";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import CreateProject from "@/features/project/components/createProject";
import AddTaskButton from "@/features/task/components/addButton";



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh">
      <nav>
        <Navbar />
      </nav>

      <div className="flex">
        <aside className="flex flex-col w-[200px] py-3 mt-2">
          <Aside />

          <Dialog>
            <DialogTrigger className="flex bg-blue-400 hover:bg-blue-500 text-white justify-center items-center gap-2 py-1 rounded-lg">
              Proje Ekle
              <PlusIcon />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Proje Ekle</DialogTitle>
                <CreateProject />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </aside>

        <section className="grow">{children}</section>

        <AddTaskButton />
      </div>
    </div>
  )
}

export default Layout;

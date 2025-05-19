import { PlusIcon } from "lucide-react";
import Aside from "./aside";
import Navbar from "./navbar";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import CreateTask from "@/features/task/components/createTask";



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh bg-gradient-to-br from-gray-900 to-zinc-900">
      <nav>
        <Navbar />
      </nav>

      <div className="flex">
        <aside className="flex flex-col w-[200px] py-3 rounded-xl bg-gray-950 mt-2">
          <Aside />

          <Dialog>
            <DialogTrigger className="text-zinc-200 flex justify-center items-center gap-2 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-green-500 opacity-50 hover:opacity-100">
              Proje Ekle
              <PlusIcon />
            </DialogTrigger>
            <DialogContent className="bg-gray-950 border-gray-800">
              <DialogHeader className="text-zinc-200">
                <DialogTitle>Proje Ekle</DialogTitle>
                <CreateTask />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </aside>

        <section className="grow">{children}</section>
      </div>
    </div>
  )
}

export default Layout;

import { projectService } from "@/features/project/services/projectService";
import { userService } from "@/features/user/services/userService";
import { useEffect } from "react";
import { Accordion, AccordionItem } from "./ui/accordion";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { setProjects } from "@/features/project/projectSlice";
import { setUsers } from "@/features/user/userSlice";


const Aside = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { users } = useAppSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();

  const project = searchParams.get('project') || '';

  const user = searchParams.get('user') || '';

  const activeProject = (id: number): boolean => {
    if (Number(project) === id) return true;
    return false;
  }

  const activeUser = (id: string): boolean => {
    if (user === id) return true;
    return false
  }

  const handleClick = (key: 'user' | 'project' | 'status', value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(Object.fromEntries(params.entries()));
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userService.getAll();
      dispatch(setUsers(response.data));
    }
    fetchUsers();
  }, [dispatch])

  useEffect(() => {
    const fetchAllProjects = async () => {
      const response = await projectService.getAll();
      dispatch(setProjects(response.data));
    }

    fetchAllProjects();
  }, [dispatch])

  return (
    <Accordion type="single" collapsible className="h-full">
      <AccordionItem value="projects">
        <AccordionTrigger className="w-full rounded bg-gradient-to-r from-blue-200 to-blue-300 text-blue-950 relative p-2">
          <span>
            Projeler
          </span>
          <span className="absolute top-1 right-1 bg-blue-500 text-white w-5 h-5 p-2 flex justify-center items-center rounded-full" style={{ fontSize: '10px' }}>{projects.length}</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col">
          <button
            onClick={() => handleClick('project', '')}
            className={`text-sm p-2 shadow-sm ${activeProject(Number('')) ? 'bg-blue-400 text-white' : ''} transition-all`}
          >
            Hepsi
          </button>
          {
            projects.map((project, index) => (
              <button key={index}
                onClick={() => handleClick('project', String(project.id))}
                className={`text-sm p-2 shadow-sm ${activeProject(project.id) ? 'bg-blue-400 text-white' : ''} transition-all`}
              >
                {project.name}
              </button>
            ))
          }
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="users">
        <AccordionTrigger className="w-full rounded bg-gradient-to-r from-blue-200 to-blue-300 text-blue-950 relative p-2">
          <span>
            Kullanıcılar
          </span>
          <span className="absolute top-1 right-1 bg-blue-500 text-white w-5 h-5 p-2 flex justify-center items-center rounded-full" style={{ fontSize: '10px' }}>{users.length}</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col">
          <button
            onClick={() => handleClick('user', '')}
            className={`text-sm p-2 shadow-sm ${activeUser('') ? 'bg-blue-400 text-white' : ''} transition-all`}
          >
            Hepsi
          </button>
          {
            users.map((user, index) => (
              <button key={index} onClick={() => handleClick('user', user.id)}
                className={`text-sm p-2 shadow-sm ${activeUser(user.id) ? 'bg-blue-400 text-white' : ''} transition-all`}>
                {user.name}
              </button>
            ))
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Aside;

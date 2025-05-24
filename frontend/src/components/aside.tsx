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

  const projectId = searchParams.get('projectId') || '';

  const activeLink = (id: number): boolean => {
    if (Number(projectId) === id) return true;
    return false;
  }

  const handleClick = (key: 'userId' | 'projectId' | 'status', value: string) => {
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
          <span className="absolute top-1 right-1 bg-blue-500 text-white w-5 h-5 rounded-full text-xs">{projects.length}</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col">
          {
            projects.map((project, index) => (
              <button key={index}
                onClick={() => handleClick('projectId', String(project.id))}
                className={`text-sm p-2 shadow-sm ${activeLink(project.id) ? 'bg-blue-400 text-white' : ''} transition-all`}
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
          <span className="absolute top-1 right-1 bg-blue-500 text-white w-5 h-5 rounded-full text-xs">{users.length}</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col">
          {
            users.map((user, index) => (
              <button key={index} onClick={() => handleClick('userId', user.id)} className="text-sm p-2 shadow-sm">{user.name}</button>
            ))
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Aside;

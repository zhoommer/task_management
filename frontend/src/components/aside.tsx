import { projectService } from "@/features/project/services/projectService";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem } from "./ui/accordion";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { setProjects } from "@/features/project/projectSlice";


const Aside = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const [searchParams] = useSearchParams();

  const projectId = searchParams.get('projectId') || '';

  const activeLink = (id: number): boolean => {
    if (Number(projectId) === id) return true;
    return false;
  }


  useEffect(() => {
    const fetchAllProjects = async () => {
      const response = await projectService.getAll();
      dispatch(setProjects(response.data));
    }

    fetchAllProjects();
  }, [])

  return (
    <Accordion type="single" collapsible className="h-full">
      <AccordionItem value="projects" className="">
        <AccordionTrigger className="w-full rounded bg-gradient-to-r from-blue-600 to-blue-900 text-white relative p-2">
          <span>
            Projeler
          </span>
          <span className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs">{projects.length}</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col">
          {
            projects.map((project, index) => (
              <Link to={{ pathname: '', search: `?projectId=${project.id}` }} key={index}
                className={`text-sm p-2 shadow-sm ${activeLink(project.id) ? 'bg-gradient-to-r from-blue-400 to-blue-700 text-white' : ''} transition-all`}
              >
                {project.name}
              </Link>
            ))
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Aside;

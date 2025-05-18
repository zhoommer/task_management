import { projectService } from "@/features/project/services/projectService";
import type { Project } from "@/features/project/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem } from "./ui/accordion";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import { useSearchParams } from "react-router-dom";




const Aside = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchParams] = useSearchParams();

  const projectId = searchParams.get('projectId') || '';

  const activeLink = (id: number): boolean => {
    if (Number(projectId) === id) return true;
    return false;
  }


  useEffect(() => {
    const fetchAllProjects = async () => {
      const response = await projectService.getAll();
      setProjects(response.data);
    }

    fetchAllProjects();
  }, [])

  return (
    <Accordion type="single" collapsible className="bg-gray-950 text-zinc-200 h-full">
      <AccordionItem value="projects" className="bg-gradient-to-r from-blue-500 to-purple-600">
        <AccordionTrigger className="rounded w-full border-b relative p-1">
          <span>
            Projeler
          </span>
          <span className="absolute top-1 right-1 bg-red-500 w-4 h-4 rounded-full text-xs">{projects.length}</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col">
          {
            projects.map((project, index) => (
              <Link to={{ pathname: '', search: `?projectId=${project.id}` }} key={index}
                className={`text-sm opacity-50 p-2 border-b border-zinc-800 hover:opacity-100 ${activeLink(project.id) ? 'bg-blue-500 opacity-100' : ''} transition-all`}
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

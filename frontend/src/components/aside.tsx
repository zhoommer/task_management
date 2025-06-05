import { projectService } from "@/features/project/services/projectService";
import { userService } from "@/features/user/services/userService";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { setProjects } from "@/features/project/projectSlice";
import { setUsers } from "@/features/user/userSlice";
import { Plus } from "lucide-react";


const Aside = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { users } = useAppSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();

  const project = searchParams.get('project') || '';
  const user = searchParams.get('user') || '';

  const activeProject = (id: number): string => {
    if (Number(project) === id) return 'active__item';
    return '';
  }

  const activeUser = (id: string): string => {
    if (user === id) return 'active__item';
    return '';
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
    <aside>
      <ul className='aside__menu'>
        <li className='aside__menu__item'>
          <details className='aside__menu__list' open>
            <summary className='aside__menu__list__title'>Projeler</summary>
            <ol>
              <li className={`aside__menu__list__item ${activeProject(Number(''))}`}>
                <button onClick={() => handleClick('project', '')}>Hepsi</button>
              </li>
              {
                projects.map((project, index) => (
                  <li key={index} className={`aside__menu__list__item ${activeProject(project.id)}`}>
                    <button onClick={() => handleClick('project', String(project.id))}>{project.name}</button>
                  </li>
                ))
              }
            </ol>
          </details>

          <details open>
            <summary className='aside__menu__list__title'>Kullanıcılar</summary>
            <ol>
              <li className={`aside__menu__list__item ${activeUser('')}`}>
                <button onClick={() => handleClick('user', '')}>Hepsi</button>
              </li>
              {
                users.map((user, index) => (
                  <li key={index} className={`aside__menu__list__item ${activeUser(user.id)}`}>
                    <button onClick={() => handleClick('user', user.id)}>{user.name}</button>
                  </li>
                ))
              }
            </ol>
          </details>
        </li>

        <li className="add__project__item">
          <button>
            Proje Ekle
            <Plus />
          </button>
        </li>
      </ul>
    </aside>
  )
}

export default Aside;

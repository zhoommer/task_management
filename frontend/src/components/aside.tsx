import useAside from "@/hooks/useAside";
import { Plus } from "lucide-react";

const Aside = () => {
  const {
    loading,
    activeProject,
    activeUser,
    handleClick,
    projects,
    users,
    showForm,
    toggleProjectForm,
    register,
    handleSubmit,
    errors,
    onSubmit
  } = useAside();
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
          <button onClick={toggleProjectForm} className="add__project__button">
            Proje Ekle
            <Plus />
          </button>
        </li>

        <div className="add__project__container" style={{ display: showForm ? 'block' : 'none' }}>
          <form className="add__project__form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                className={`input__label${errors.name ? ' input__label--error' : ''}`}
                htmlFor="name">
                Proje Adı
              </label>
              <input
                aria-invalid={errors.name ? 'true' : 'false'}
                {...register('name')}
                className={`input${errors.name ? ' input--error' : ''}`}
                placeholder="Proje adı giriniz"
              />
            </div>
            <div>
              <label
                className={`input__label${errors.description ? ' input__label--error' : ''}`}
                htmlFor="description">
                Açıklama
              </label>
              <input
                aria-invalid={errors.description ? 'true' : 'false'}
                {...register('description')}
                className={`input${errors.description ? ' input--error' : ''}`}
                name="description"
                placeholder="Proje açıklaması giriniz"
              />
            </div>

            <div>
              <button type="submit" className="add__project__button" style={{ cursor: loading ? 'progress' : 'default' }} disabled={loading}>Ekle</button>
            </div>
          </form>
        </div>
      </ul>
    </aside>
  )
}

export default Aside;

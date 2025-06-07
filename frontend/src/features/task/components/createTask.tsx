import useCreateTask from "@/features/task/hooks/useCreateTask";
import { ChevronRightCircle, Plus } from "lucide-react";
import { useState } from "react";



const CreateTask = () => {
  const { loading, users, projects, form, handleSubmit } = useCreateTask();

  const [showForm, setShowForm] = useState<boolean>(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <button className="create__task__button" onClick={toggleForm} disabled={loading}>
        <Plus />
      </button>

      <div className="create__task__container" style={{ display: showForm ? 'block' : 'none' }}>
        <form className="create__task__form" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="create__task__form__item">
            <label
              htmlFor="title"
              className={`input__label${form.formState.errors.title ? ' input__label--error' : ''}`}
            >
              Başlık
            </label>
            <input
              {...form.register('title')}
              type="text"
              aria-invalid={form.formState.errors.title ? 'true' : 'false'}
              className={`input${form.formState.errors.title ? ' input--error' : ''}`}
              name="title"
              placeholder="Görev başlığı girin"
            />
          </div>

          <div className="create__task__form__item">
            <label
              htmlFor="projectId"
              className={`input__label${form.formState.errors.assignedUserId ? ' input__label--error' : ''}`}
            >
              Proje Seçiniz
            </label>
            <select
              {...form.register('projectId')}
              name="projectId"
              className={`input${form.formState.errors.projectId ? ' error' : ''}`}
            >
              <option value="">Proje Seçiniz</option>
              {
                projects && projects.map((project, index) => (
                  <option key={index} value={project.id}>
                    {project.name}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="create__task__form__item">
            <label
              htmlFor="assignedUserId"
              className={`input__label${form.formState.errors.assignedUserId ? ' input__label--error' : ''}`}
            >
              Kullanıcı Atama
            </label>
            <select
              {...form.register('assignedUserId')}
              name="assignedUserId"
              className={`input${form.formState.errors.assignedUserId ? ' error' : ''}`}
            >
              <option value="">Kullanıcı Seçiniz</option>
              {
                users && users.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.name}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="create__task__form__item">
            <label
              htmlFor="priority"
              className={`input__label${form.formState.errors.priority ? ' input__label--error' : ''}`}
            >
              Öncelik Durumu
            </label>
            <select
              {...form.register('priority')}
              name="priority"
              aria-invalid={form.formState.errors.priority ? 'true' : 'false'}
              className={`input${form.formState.errors.priority ? ' error' : ''}`}
            >
              <option value=''>Öncelik durumu seçin</option>
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek</option>
              <option value="critical">Kritik</option>
            </select>
          </div>

          <div className="create__task__form__item">
            <label
              htmlFor="dueDate"
              className={`input__label${form.formState.errors.dueDate ? ' input__label--error' : ''}`}
            >
              Bitiş Tarihi
            </label>
            <input
              {...form.register('dueDate')}
              aria-invalid={form.formState.errors.dueDate ? 'true' : 'false'}
              type="datetime-local"
              name="dueDate"
              className={`input${form.formState.errors.dueDate ? ' input--error' : ''}`}
            />
          </div>

          <div className="create__task__form__item">
            <label
              htmlFor="description"
              className={`input__label${form.formState.errors.description ? ' input__label--error' : ''}`}
            >
              Açıklama
            </label>
            <textarea
              {...form.register('description')}
              aria-invalid={form.formState.errors.description ? 'true' : 'false'}
              className={`input${form.formState.errors.description ? ' input--error' : ''}`}
              name="description"
            />
          </div>


          <div className="create__task__form__action">
            <button
              type="submit"
              style={{ cursor: loading ? 'progress' : 'default' }}
              disabled={loading}
            >
              Kaydet
            </button>
          </div>
        </form>

        <button className="create__task__form__close" onClick={toggleForm}>
          <ChevronRightCircle />
        </button>
      </div>
    </>
  )
}

export default CreateTask;

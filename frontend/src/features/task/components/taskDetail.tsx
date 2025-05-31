import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/features/store";

const TaskDetail = () => {

  const { taskDetailDialogStatus, taskDetailState } = useAppSelector((state) => state.task);

  const { users } = useAppSelector((state) => state.user);

  return (
    <Dialog open={taskDetailDialogStatus}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            contentEditable
            suppressContentEditableWarning
            onInput={(event: React.FormEvent<HTMLDivElement>) => console.log(event.currentTarget.textContent)}
          >
            {taskDetailState?.title}


          </DialogTitle>
          <DialogDescription className="flex justify-between">
            <div
              contentEditable
              suppressContentEditableWarning
              onInput={(event: React.FormEvent<HTMLDivElement>) => console.log(event.currentTarget.textContent)}
            >
              {taskDetailState?.description}
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={taskDetailState?.assignments[0].user.name} />
                </SelectTrigger>
                <SelectContent>
                  {
                    users.map((user, index) => (
                      <SelectItem value={user.id} key={index}>{user.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div>
            <span>Bitis Tarihi: </span>
            <span>{taskDetailState?.dueDate}</span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TaskDetail;

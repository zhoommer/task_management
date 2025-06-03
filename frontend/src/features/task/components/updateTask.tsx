import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/features/store";


const UpdateTask = () => {

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
          <DialogDescription className="flex justify-between gap-2">
            <div
              contentEditable
              suppressContentEditableWarning
              onInput={(event: React.FormEvent<HTMLDivElement>) => console.log(event.currentTarget.textContent)}
            >
              {taskDetailState?.description}
            </div>
            <div>
              <Select>
                <SelectTrigger className="max-w-[8rem]">
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
        <DialogFooter className="flex justify-between items-center">
          <div className="text-stone-400">
            <span className="font-semibold">Bitiş Tarihi: </span>
            <span>{taskDetailState?.dueDate.split('T')[0]}</span>
          </div>
          <div>
            <Button type="submit">Kaydet</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTask;

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { useEffect } from "react";
import { userService } from "../services/userService";
import { setUsers } from "../userSlice";




const UserFilter = () => {
  const { users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userService.getAll();
      dispatch(setUsers(response.data));
    }
    fetchUsers();
  }, [dispatch])

  return (
    <div className="flex gap-3">
      {
        users.map((user, index) => (
          <Avatar key={index}>
            <AvatarFallback>{user.name.at(0)}</AvatarFallback>
          </Avatar>
        ))
      }
    </div>
  )
}

export default UserFilter;

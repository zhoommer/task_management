import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { LogOut, Settings, User } from 'lucide-react';
import { toast } from 'react-toastify';



const Navbar = () => {
  const navigate = useNavigate();

  const avatarName = localStorage.getItem('avatarName');

  const logOut = async () => {
    localStorage.clear();
    toast.info('Çıkış yapılıyor');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    navigate('/auth/login');
  }

  return (
    <div className="flex justify-around items-center border-b border-b-zinc-300 bg-gradient-to-r from-zinc-100 to-gray-100 py-5">
      <div>
        <Link to={'/?user=&project='} className="link-btn-gradient bg-clip-text text-transparent text-3xl font-bold transition duration-300 hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">Task Master</Link>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='cursor-pointer'>
            <Avatar className='drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]'>
              <AvatarFallback>{avatarName}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className='text-center'>Menü</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Button variant='link' className='w-full shadow-sm hover:bg-zinc-100'>
              <Link to={'#'} className='w-full flex justify-center items-center gap-2'>
                Profile
                <User />
              </Link>
            </Button>
            <Button variant='link' className='w-full mt-1 shadow-sm hover:bg-zinc-100'>
              <Link to={'#'} className='w-full flex justify-center items-center gap-2'>
                Ayarlar
                <Settings />
              </Link>
            </Button>
            <Button variant='link' className='w-full mt-1 shadow-sm hover:bg-zinc-100' onClick={logOut}>
              <Link to={'#'} className='w-full flex justify-center items-center gap-2'>
                Çıkış
                <LogOut />
              </Link>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navbar;

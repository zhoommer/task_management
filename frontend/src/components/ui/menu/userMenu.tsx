import { LogOut, Settings2, UserRoundIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const UserMenu = () => {
  const navigate = useNavigate();

  const avatarName = localStorage.getItem('avatarName');

  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => setOpen(!open);

  const logOut = async () => {
    localStorage.clear();
    toast.info('Çıkış yapılıyor');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    navigate('/auth/login');
  }

  return (
    <div className="user__menu__container">
      <button className="user__menu__button" onClick={toggleMenu}>{avatarName}</button>
      <ul className="user__menu" style={{ display: open ? 'block' : 'none' }}>
        <li className="user__menu__item">
          <Link className="user__menu__link" to={'#'}>
            <UserRoundIcon size={16} />
            Profil
          </Link>
        </li>
        <li className="user__menu__item">
          <Link className="user__menu__link" to={'#'}>
            <Settings2 size={16} />
            Ayarlar
          </Link>
        </li>
        <li className="user__menu__item">
          <Link className="user__menu__link" to={'#'} onClick={() => logOut()}>
            <LogOut size={16} />
            Çıkış
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default UserMenu;

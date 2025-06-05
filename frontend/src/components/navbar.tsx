import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useColorThemeProvider } from '@/context/colorThemeContext';
import { Moon, Sun } from 'lucide-react';


const Navbar = () => {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useColorThemeProvider();

  const avatarName = localStorage.getItem('avatarName');

  const logOut = async () => {
    localStorage.clear();
    toast.info('Çıkış yapılıyor');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    navigate('/auth/login');
  }

  return (
    <nav className={`${theme}`}>
      <ul className='navbar'>
        <li className='navbar__item'>
          <Link to={'/'} className='navbar__link'>
            <h1 className={`brand__name ${theme}`}></h1>
          </Link>
        </li>
        <li className='navbar__item'>
          <div>{avatarName}</div>
          <button className='theme__switch__button' onClick={() => toggleTheme()}>
            {
              theme === 'light'
                ? <Sun className='sun' />
                : <Moon className='moon' />
            }
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;

import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import UserMenu from './ui/menu/userMenu';
import { useThemeProvider } from '@/context/colorThemeContext';


const Navbar = () => {
  const { theme, setTheme } = useThemeProvider();

  return (
    <nav>
      <ul className='navbar'>
        <li className='navbar__item'>
          <Link to={'/'} className='navbar__link'>
            <h1 className='brand__name'></h1>
          </Link>
        </li>
        <li className='navbar__item'>
          <UserMenu />
          <button className='theme__switch__button' onClick={() => setTheme(theme === 'light' ? 'dark' : "light")}>
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

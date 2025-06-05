import { Link } from 'react-router-dom';
import { useColorThemeProvider } from '@/context/colorThemeContext';
import { Moon, Sun } from 'lucide-react';
import UserMenu from './ui/menu/userMenu';


const Navbar = () => {
  const { theme, toggleTheme } = useColorThemeProvider();

  return (
    <nav className={`${theme}`}>
      <ul className='navbar'>
        <li className='navbar__item'>
          <Link to={'/'} className='navbar__link'>
            <h1 className={`brand__name ${theme}`}></h1>
          </Link>
        </li>
        <li className='navbar__item'>
          <UserMenu />
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

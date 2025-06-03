import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useColorThemeProvider } from '@/context/colorThemeContext';


const Navbar = () => {
  const navigate = useNavigate();

  const { theme } = useColorThemeProvider();

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
          <Link to={'/'}>
            <h1 className={`brand__name ${theme}`}></h1>
          </Link>
        </li>
        <li className='navbar__item'>user menu</li>
      </ul>
    </nav>
  )
}

export default Navbar;

import { motion } from 'framer-motion';
import { Lock, User, LogIn, PlusCircle, Loader2 } from 'lucide-react';
import useLogin from '../hooks/useLogin';
import { useColorThemeProvider } from '@/context/colorThemeContext';

const LoginPage = () => {
  const { loading, handleChange, handleSubmit } = useLogin();

  const { theme } = useColorThemeProvider();

  return (
    <form onSubmit={handleSubmit} className={`login__form ${theme}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className={`login__form__container ${theme}`}
      >
        <div className={`login__form__header ${theme}`}>
          <h1 className="login__form__title">
            TaskMaster
          </h1>
          <p className={`login__form__text ${theme}`}>Tekrar hoşgeldiniz! Görevlerinizi yönetmek için giriş yapınız.</p>
        </div>

        <div className="form__item">
          <label htmlFor="email" className={`input__label ${theme}`}>
            <User className="input__label__icon" />
            Email
          </label>
          <input
            id='passwordHash'
            name="email"
            type="email"
            placeholder="Enter your email"
            className={`input ${theme}`}
            onChange={handleChange}
          />
        </div>
        <div className="form__item">
          <label htmlFor="password" className={`input__label ${theme}`}>
            <Lock className="input__label__icon" />
            Parola
          </label>

          <input
            id='passwordHash'
            name='passwordHash'
            type="password"
            placeholder="Enter your password"
            className={`input ${theme}`}
            onChange={handleChange}
          />
        </div>

        <div className="form__action__container">
          <div className="forgot__password__container">
            <a href="#" className={`forgot__password__link ${theme}`}>
              Şifremi unuttum?
            </a>
          </div>

          <div className="form__action">
            <button
              type='submit'
              disabled={loading}
              className='login__button'
            >
              Giriş
              {
                loading ? <Loader2 className='spin__loading' /> : <LogIn className='login__button__icon' />
              }
            </button>
            <button
              type='button'
              className='register__button'
            >
              <PlusCircle className="register__button__icon" />
              Kayıt Ol
            </button>
          </div>
        </div>
      </motion.div>
    </form >
  );
};

export default LoginPage;


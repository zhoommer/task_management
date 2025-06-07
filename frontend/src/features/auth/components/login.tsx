import { motion } from 'framer-motion';
import { Lock, User, LogIn, PlusCircle, Loader2 } from 'lucide-react';
import useLogin from '../hooks/useLogin';

const LoginPage = () => {
  const { loading, register, handleSubmit, errors, onSubmit } = useLogin();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='login__form'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className='login__form__container'
      >
        <div className='login__form__header'>
          <h1 className="login__form__title">
            TaskMaster
          </h1>
          <p className='login__form__text'>Tekrar hoşgeldiniz! Görevlerinizi yönetmek için giriş yapınız.</p>
        </div>

        <div className="form__item">
          <label
            htmlFor="email"
            className={`input__label${errors.email ? ' input__label--error' : ''}`}
          >
            <User className="input__label__icon" />
            Email
          </label>
          <input
            {...register('email')}
            className={`input${errors.email ? ' input--error' : ''}`}
            name='email'
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="form__item">
          <label
            htmlFor="password"
            className={`input__label${errors.passwordHash ? ' input__label--error' : ''}`}
          >
            <Lock className="input__label__icon" />
            Parola
          </label>

          <input
            {...register('passwordHash')}
            className={`input${errors.passwordHash ? ' input--error' : ''}`}
            name='passwordHash'
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="form__action__container">
          <div className="forgot__password__container">
            <a href="#" className='forgot__password__link'>
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


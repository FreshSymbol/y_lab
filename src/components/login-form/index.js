import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const store = useStore();
  const cn = bem('LoginForm');
  const { t } = useTranslate();
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    const login = evt.target.login.value;
    const password = evt.target.password.value;
    store.actions.auth.login({ login, password });
  }

  const select = useSelector(state => ({
    error: state.auth.error,
    isAuth: state.auth.isAuth,
  }));

  if (select.isAuth) navigate('/', { replace: true });

  return (
    <form className={cn()} onSubmit={handleSubmit} name="form">
      <h2 className={cn('title')}>{t('form.title')}</h2>
      <div className={cn('field')}>
        <label htmlFor="login">{t('form.login')}</label>
        <input className={cn('input')} type="text" id="login" name="login" />
      </div>

      <div className={cn('field')}>
        <label htmlFor="password">{t('form.password')}</label>
        <input className={cn('input')} type="password" id="password" name="password" />
      </div>

      {select.error && <span className={cn('error')}>{select.error}</span>}
      <button type="submit">{t('form.submit')}</button>
    </form>
  );
}

export default memo(LoginForm);

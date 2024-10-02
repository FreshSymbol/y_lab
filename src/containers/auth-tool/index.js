import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import './style.css';

function AuthTool() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const callbacks = {
    onLogin: () => navigate('/login'),
    onLogout: () => {
      store.actions.auth.logout();
    },
  };

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    name: state.auth.profile.name,
  }));

  return (
    <div className="AuthTool">
      {select.isAuth && <Link to="/profile">{select.name}</Link>}
      {select.isAuth ? (
        <button onClick={callbacks.onLogout}>{t('auth.logout')}</button>
      ) : (
        <button onClick={callbacks.onLogin}>{t('auth.login')}</button>
      )}
    </div>
  );
}

export default memo(AuthTool);

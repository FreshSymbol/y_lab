import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import Auth from '../../components/auth';

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
    name: state.profile.profile.name,
  }));

  return (
    <Auth
      onLogin={callbacks.onLogin}
      onLogout={callbacks.onLogout}
      userName={select.name}
      isAuth={select.isAuth}
      t={t}
    />
  );
}

export default memo(AuthTool);

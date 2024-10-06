import { Link } from 'react-router-dom';
import './style.css';
import PropTypes from 'prop-types';

function Auth({
  onLogin = () => {},
  onLogout = () => {},
  userName = '',
  isAuth = false,
  t = text => text,
}) {
  return (
    <div className="Auth">
      {isAuth && <Link to="/profile">{userName}</Link>}
      {isAuth ? (
        <button onClick={onLogout}>{t('auth.logout')}</button>
      ) : (
        <button onClick={onLogin}>{t('auth.login')}</button>
      )}
    </div>
  );
}
export default Auth;

Auth.propsTypes = {
  userName: PropTypes.string,
  isAuth: PropTypes.bool,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  t: PropTypes.func,
};

import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';
import { Navigate, useLocation } from 'react-router-dom';
import { memo } from 'react';

function Protected({ children }) {
  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
  }));
  const location = useLocation();

  if (!select.isAuth && location.pathname !== '/login') {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }

  if (select.isAuth && location.pathname === '/login') {
    return <Navigate to={location.state?.from || '/'} />;
  }

  return children;
}

Protected.propTypes = {
  children: PropTypes.node,
};

export default memo(Protected);

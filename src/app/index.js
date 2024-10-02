import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Profile from './profile';
import Login from './login';
import Protected from '../components/protected';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();
  const select = useSelector(state => ({ isAuth: state.auth.isAuth, user: state.auth.user }));

  useInit(() => {
    store.actions.auth.checkAuth();
    if (select.isAuth) store.actions.auth.getProfile(localStorage.getItem('token'));
  }, [select.isAuth, select.user]);
  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route
          path={'/profile'}
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path={'/login'}
          element={
            <Protected>
              <Login />
            </Protected>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;

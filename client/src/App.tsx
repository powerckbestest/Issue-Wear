import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import NavBar from './components/IU/NavBar';
import PrivateRouter from './components/PrivateRouter';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import userCheckActionThunk from './features/redux/actions/userActions';
import ProductCard from './components/pages/ProductCard';
import Loader from './components/hocs/Loader';

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  console.log(user);

  useEffect(() => {
    void dispatch(userCheckActionThunk())
      .then(() => {
        setIsAuthenticated(user.status === 'success');
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {/* Скрываем NavBar и содержимое страницы, пока работает Loader */}
      {isLoading ? (
        <Loader isLoading={isLoading}>
          <div>Loading...</div>
        </Loader>
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route
              element={<PrivateRouter isAllowed={user.status !== 'success'} redirectTo="/main" />}
            >
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
            </Route>
            <Route path="/main/:productId" element={<ProductCard />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;

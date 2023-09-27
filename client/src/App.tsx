import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/ProductsList';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import NavBar from './components/IU/NavBar';
import PrivateRouter from './components/PrivateRouter';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import useProductHooks from './hooks/useProductHooks';
import userCheckActionThunk from './features/redux/actions/userActions';
import CartPage from './components/pages/CartPage';
import ProductCard from './components/pages/ProductCard';
import Footer from './components/IU/Footer';
import WardrobePage from './components/pages/WardrobePage';
import { setUser } from './features/redux/slices/userSlice';
import Loader from './components/hocs/Loader';
import AdminOrderPage from './components/pages/AdminOrderPage';

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  console.log(user);
  const { getProductsCartHandler } = useProductHooks();

  // useEffect(() => {
  //   void dispatch(userCheckActionThunk());
  //   getProductsCartHandler();
  // }, []);

  useEffect(() => {
    void dispatch(userCheckActionThunk())
      .then(() => {
        getProductsCartHandler();
        // setIsAuthenticated(user.status === 'success');
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
          <div style={{marginTop:'200px'}}>
            <Routes>
              <Route path="/" />
              <Route path="/products" element={<MainPage />} />
              <Route
                element={<PrivateRouter isAllowed={user.status !== 'success'} redirectTo="/main" />}
              >
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signin" element={<SignInPage />} />
              </Route>
              <Route
                element={
                  <PrivateRouter isAllowed={user?.user?.Role?.id === 1} redirectTo="/main" />
                }
              >
                <Route path="/adminorders" element={<AdminOrderPage />} />
              </Route>
              <Route path="/wardrobe" element={<WardrobePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/products/:productId" element={<ProductCard />} />
            </Routes>
          </div>
          <Footer  />
        </>
      )}
    </>
  );
}

export default App;

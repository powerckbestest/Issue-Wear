import React, { useEffect } from 'react';
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

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  console.log(user);
  const { getProductsCartHandler } = useProductHooks();

  useEffect(() => {
    void dispatch(userCheckActionThunk());
    getProductsCartHandler();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/products" element={<MainPage />} />
        <Route element={<PrivateRouter isAllowed={user.status !== 'success'} redirectTo="/main" />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:productId" element={<ProductCard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

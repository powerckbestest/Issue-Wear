import React, { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import authHooks from '../../hooks/authHooks';

const navigation = [
  { name: 'Регистрация', to: '/signup', current: false },
  { name: 'Авторизация', to: '/signin', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar(): JSX.Element {
  const { signOutActionHandler } = authHooks();
  const user = useAppSelector((state) => state.user);
  const cartLabel = useAppSelector((state) => state.product.productsData.cartProducts);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // При монтировании компонента читаем значение из localStorage
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode === 'true';
  });

  const toggleDarkMode = () => {
    // Переключаем состояние и записываем его в localStorage
    setIsDarkMode((prevMode) => {
      const theme = document.getElementById('theme');
      theme.href = prevMode ? '/styles/dark-mode.css' : '/dark-mode.css';
      localStorage.setItem('isDarkMode', (!prevMode).toString());
      return !prevMode;
    });
  };

  useEffect(() => {
    // Устанавливаем начальную тему при монтировании компонента
    const theme = document.getElementById('theme');
    if (theme) {
      theme.href = isDarkMode ? '/styles/dark-mode.css' : '/light-mode.css';
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Добавляем обработчик события для кнопки switchMode
    const switchMode = document.getElementById('switchMode');
    switchMode.addEventListener('click', toggleDarkMode);

    return () => {
      // Убираем обработчик события при размонтировании компонента
      switchMode.removeEventListener('click', toggleDarkMode);
    };
  }, []);

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
            <img
              src="LOGO_WITH_TYPE_1 (1).jpeg"
              alt="issue"
              style={{
                width: '698px',
                height: '182px',
                position: 'absolute',
                marginTop: '-60px',
                opacity: '20%',
              }}
            />
            <div style={{ marginLeft: '-250px', marginTop: '100px', position: 'absolute',opacity:'40%',zIndex:'-20'  }}>
              <p>Спасибо улице, что воспитала,</p>
              <p>маме — что родила, е-е</p>
            </div>
            <img
              src="/_1fire.png"
              alt="fire"
              style={{ width: '71px', height: '101px', position: 'absolute', marginTop: '70px'}}
            />
          </div>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink to="/" style={{ color: 'white', marginLeft: '-290px' }}>
                    <img className="h-8 w-8 rounded-full" src="/fire.jpg" alt="" />
                  </NavLink>
                </div>
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  width: '100%',
                  marginTop: '220px',
                }}
              >
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <NavLink to="/products" aria-current="page">
                      Одежда
                    </NavLink>
                  </div>
                </div>

                {/* Функциональная иконка профиля */}
                {/* {/* Profile dropdown */}
                {user.status !== 'success' ? (
                  <div className="flex space-x-4">
                    <Navigate to="/signin" aria-current="page">
                      Войти
                    </Navigate>
                    <NavLink to="/signup" aria-current="page">
                      Зарегистрироваться
                    </NavLink>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <NavLink to="/signup" onClick={signOutActionHandler} aria-current="page">
                      Выход
                    </NavLink>
                    <NavLink
                      to="/cart"
                      className={classNames(
                        user.status !== 'success'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                      aria-current="page"
                      style={{ marginTop: '-15px' }}
                    >
                      <img
                        src="/shopping-cart-7-svgrepo-com.svg"
                        style={{ height: '30px', width: '30px' }}
                        alt="cart"
                      />
                      {cartLabel?.length > 0 ? (
                        <label
                          style={{
                            position: 'absolute',
                            marginLeft: '20px',
                            marginTop: '-40px',
                            borderRadius: '50px',
                            backgroundColor: 'red',
                            padding: `3px ${cartLabel.length > 10 ? '0' : 10}px`,
                            fontSize: '12px',
                          }}
                        >
                          {cartLabel?.length}
                        </label>
                      ) : (
                        false
                      )}
                      {/* {cartLabel?.length > 0 ? (
                            <label
                              style={{
                                position: 'absolute',
                                marginLeft: '20px',
                                marginTop: '-40px',
                                borderRadius: '50px',
                                backgroundColor: 'red',
                                padding: 3px ${cartLabel.length > 10 ? '0' : '10'}px,
                                fontSize: '12px',
                              }}
                            >
                              {cartLabel?.length}
                            </label>
                          ) : (
                            false
                          )} */}
                    </NavLink>
                  </div>
                )}
              </div>
              <button
                id="switchMode"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Switch mode</span>
                {isDarkMode ? (
                  <img
                    className="h-6 w-6"
                    src="/icons8-солнце-64.png" // Замените на путь к вашей иконке для темной темы
                    alt="Dark Mode"
                  />
                ) : (
                  <img
                    className="h-6 w-6"
                    src="/icons8-полумесяц-нарастающей-луны-48.png" // Замените на путь к вашей иконке для светлой темы
                    alt="Light Mode"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}

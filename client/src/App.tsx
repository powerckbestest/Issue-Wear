import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import NavBar from './components/IU/NavBar';


function App(): JSX.Element {
  return (
 <>
      <NavBar/>
    <Routes> 
      <Route path='/main' element={<MainPage/>}/>
      <Route path ='/signup' element={<SignUpPage/>}/>
      <Route path='/signin' element={<SignInPage/>}/>
  
    </Routes>
 </>
  );
}

export default App;

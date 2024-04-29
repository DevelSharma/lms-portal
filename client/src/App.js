import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
/** Import all the components */
import Username from './components/Username';
import Reset from './components/Reset';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Profile from './components/Profile';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';

/** root routs */
const router = createBrowserRouter([
  {
    path : '/',
    element : <Username></Username> 
  },
  {
    path : '/register',
    element : <Register></Register> 
  },
  {
    path : '/reset',
    element : <Reset></Reset>  
  },
  {
    path : '/recovery',
    element : <Recovery></Recovery>  
  },
  {
    path : '/profile',
    element : <Profile></Profile> 
  },
  {
    path : '/password',
    element : <Password></Password> 
  },
  {
    path : '*',
    element : <PageNotFound></PageNotFound>  
  },
])


const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>

  );
};

export default App;
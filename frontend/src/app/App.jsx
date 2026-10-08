import React from 'react'
import './App.css';
import { RouterProvider } from 'react-router';
import { routes } from './app.routes';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useEffect } from 'react';

const App = () => {

  const { handleGetMe } = useAuth();

  useEffect(()=>{
    console.log("Hello")
    handleGetMe();
  }, []);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
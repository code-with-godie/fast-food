import React from 'react'
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import Toast from './components/model/Toast';
import { useAppContext } from './context/AppContext';
const App = () => {
  const {showToast} = useAppContext();
  return (
    <>
    <RouterProvider router={router} />
    {showToast && <Toast  />}
    </>
  )
}

export default App
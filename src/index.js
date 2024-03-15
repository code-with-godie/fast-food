import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {AppContextProvider} from './context/AppContext'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from './context/cartStore';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
       <Provider store={store}>
    <AppContextProvider>
    <App />
    </AppContextProvider>
       </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

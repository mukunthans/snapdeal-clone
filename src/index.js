import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./app/store"
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from "./context/DataContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/styles/tailwind.css' // Import Tailwind CSS
import './assets/styles/russoFont.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApiProvider } from './context/ApiProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

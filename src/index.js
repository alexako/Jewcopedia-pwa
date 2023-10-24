import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorPage from './error-page';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthProvider/AuthProvider';
import Dashboard from './components/Dashboard';

const DashboardProvider = () => (
  <AuthProvider>
    <Dashboard />
  </AuthProvider> 
);

const router = createBrowserRouter([
  { path: '/', element: <App />, errorElement: <ErrorPage /> },
  { path: '/dashboard', element: <DashboardProvider />, errorElement: <ErrorPage /> },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

console.group();
console.log("APP NAME:", "Jewcopedia");
console.log("APP VERSION:", process.env.REACT_APP_VERSION);
console.groupEnd();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

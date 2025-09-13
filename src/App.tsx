import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';

const MainLayout = lazy(() => import('./components/modules/layout/MainLayout'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdminLayout = lazy(
  () => import('./components/modules/layout/AdminLayout')
);

const App = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { path: '/', Component: HomePage },
      { path: '/login', Component: LoginPage },
      { path: '/registration', Component: RegistrationPage },
      { path: '/', Component: HomePage },
      { path: '/about', Component: AboutPage },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
  },
]);
export default App;

import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';

const MainLayout = lazy(() => import('./components/modules/layout/MainLayout'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const DashboardLayout = lazy(
  () => import('./components/modules/layout/DashboardLayout')
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
      { path: '/contact', Component: ContactPage },
    ],
  },
  {
    path: '/dashboard/admin',
    Component: DashboardLayout,
    children: [
      { path: 'a', Component: HomePage },
    ],
  },
  {
    path: '/dashboard/sender',
    Component: DashboardLayout,
    children: [
      { path: '/dashboard/sender', Component: HomePage },
    ],
  },
  {
    path: '/dashboard/receiver',
    Component: DashboardLayout,
    children: [
      { path: '/dashboard/receiver', Component: HomePage },
    ],
  },
]);
export default App;

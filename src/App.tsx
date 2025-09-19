import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import NotFound from './pages/NotFound';

const MainLayout = lazy(() => import('./components/modules/layout/MainLayout'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const DashboardLayout = lazy(
  () => import('./components/modules/layout/DashboardLayout')
);
const ParcelCreatePage = lazy(
  () => import('./pages/dashboard/sender/ParcelCreatePage')
);
const AllParcelsPage = lazy(
  () => import('./pages/dashboard/admin/parcels/AllParcelsPage')
);
const MyParcelsPage = lazy(
  () => import('./pages/dashboard/receiver/MyParcelsPage')
);
const MySentParcelsPage = lazy(
  () => import('./pages/dashboard/sender/MySentParcelsPage')
);
const AdminOverviewPage = lazy(
  () => import('./pages/dashboard/admin/AdminOverviewPage')
);
const ReceiverOverviewPage = lazy(
  () => import('./pages/dashboard/receiver/ReceiverOverviewPage')
);
const AllUserPage = lazy(
  () => import('./pages/dashboard/admin/users/AllUserPage')
);
const ParcelDetailsPage = lazy(() => import('./pages/ParcelDetailsPage'));

const App = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      { path: '/', Component: HomePage },
      { path: '/login', Component: LoginPage },
      { path: '/registration', Component: RegistrationPage },
      { path: '/', Component: HomePage },
      { path: '/about', Component: AboutPage },
      { path: '/contact', Component: ContactPage },
      { path: '/parcel/:id', Component: ParcelDetailsPage },
    ],
  },
  {
    path: '/dashboard/admin',
    Component: DashboardLayout,
    children: [
      { path: 'overview', Component: AdminOverviewPage },
      { path: 'users', Component: AllUserPage },
      { path: 'parcels', Component: AllParcelsPage },
    ],
  },
  {
    path: '/dashboard/sender',
    Component: DashboardLayout,
    children: [
      { path: 'parcels/create', Component: ParcelCreatePage },
      { path: 'parcels', Component: MySentParcelsPage },
    ],
  },
  {
    path: '/dashboard/receiver',
    Component: DashboardLayout,
    children: [
      { path: 'overview', Component: ReceiverOverviewPage },
      { path: 'my-parcels', Component: MyParcelsPage },
    ],
  },
]);
export default App;

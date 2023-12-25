import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import CreateClient from './pages/Client/Create';
import UpdateClient from './pages/Client/Update';
import ListClient from './pages/Client/List';
import ListItem from './pages/Item/List';
import CreateItem from './pages/Item/Create';
import UpdateItem from './pages/Item/Update';
import ListOrder from './pages/Order/List';
import UpdateOrder from './pages/Order/Update';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = [
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        {
          path: 'client',
          children: [
            { path: '', element: <ListClient /> },
            { path: 'create', element: <CreateClient /> },
            { path: 'update/:_id', element: <UpdateClient /> },
          ],
        },
        {
          path: 'item',
          children: [
            { path: '', element: <ListItem /> },
            { path: 'create', element: <CreateItem /> },
            { path: 'update', element: <UpdateItem /> },
          ],
        },
        {
          path: 'order',
          children: [
            { path: '', element: <ListOrder /> },
            { path: 'update', element: <UpdateOrder /> },
          ],
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
  ];

  const root = [
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ];

  root.push(...routes);

  const useRoot = useRoutes(root);
  return useRoot;
}

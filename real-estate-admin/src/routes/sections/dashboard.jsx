import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';
import { LoadingScreen } from 'src/components/loading-screen';
import { AuthGuard } from 'src/auth/guard';
import { PropertyEditView } from 'src/sections/Properties/view/property-edit';
import { PropertyView } from 'src/sections/Properties/view/operation/property-view';
import { PropertyCreateView } from 'src/sections/Properties/view/property-create';

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));
const UsersPage = lazy(() => import('src/pages/users'));
const PropertiesPage = lazy(() => import('src/pages/properties'));


// Error
const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
    ],
  },
  {
    path: 'users',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <UsersPage />, index: true },
    ],
  },

  {
    path: 'properties',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <PropertiesPage />, index: true },
      { path: 'create', element: <PropertyCreateView /> },
      { path: 'edit/:id', element: <PropertyEditView /> },
      { path: 'view/:id', element: <PropertyView /> },
    ],
  },




  { path: '500', element: <Page500 /> },
  { path: '404', element: <Page404 /> },
  { path: '403', element: <Page403 /> },
];

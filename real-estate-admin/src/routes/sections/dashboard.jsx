import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';
import { LoadingScreen } from 'src/components/loading-screen';
import { AuthGuard } from 'src/auth/guard';
import { CreateTemplates } from 'src/sections/templates/view/create-view';
import { CreateWorkflow } from 'src/sections/workflows/view/create';

// Overview
const LoginPage = lazy(() => import('src/pages/userAuth/index'));
const HomePage = lazy(() => import('src/pages/home/index'));
const TemplatesPage = lazy(() => import('src/pages/templates'));
const WorkflowsPage = lazy(() => import('src/pages/workflows'));
const AnalyticsPage = lazy(() => import('src/pages/analytics'));
const SettingPage = lazy(() => import('src/pages/settings'));

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
    path: 'user',
    // element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <LoginPage />, index: true },
    ],
  },
  {
    path: 'home',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <HomePage />, index: true },
    ],
  },
  {
    path: 'template',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <TemplatesPage />, index: true },
      { path: 'create', element: <CreateTemplates/> },
      { path: ':id/edit', element: <CreateTemplates /> },
    ],
  },
  {
    path: 'workflows',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <WorkflowsPage />, index: true },
      { path: 'create', element: <CreateWorkflow/> },
    ],
  },
  {
    path: 'analytics',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <AnalyticsPage />, index: true },
    ],
  },
  {
    path: 'settings',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <SettingPage />, index: true },
    ],
  },
  { path: '500', element: <Page500 /> },
  { path: '404', element: <Page404 /> },
  { path: '403', element: <Page403 /> },
];

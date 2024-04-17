import React from 'react';
import { Suspense, lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { CircleLoading } from '@/components/loading';
import SimpleLayout from '@/layouts/simple';

import AuthGuard from './authGuard';

const Page403 = lazy(() => import('@/pages/error/403'));
const Page404 = lazy(() => import('@/pages/error/404'));
const Page500 = lazy(() => import('@/pages/error/500'));

/**
 * error routes
 * 403, 404, 500
 */
export const ErrorRoutes: RouteObject = {
    element: (
        <AuthGuard>
            <SimpleLayout>
                <Suspense fallback={<CircleLoading />}>
                    <Outlet />
                </Suspense>
            </SimpleLayout>
        </AuthGuard>
    ),
    children: [
        { path: '403', element: <Page403 /> },
        { path: '404', element: <Page404 /> },
        { path: '500', element: <Page500 /> },
    ],
};

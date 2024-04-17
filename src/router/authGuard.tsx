import { useCallback, useEffect } from 'react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useStore } from '@/hooks';
import PageError from '@/pages/error/PageError';
import { Navigate, useLocation } from 'react-router-dom';


type Props = {
    children: React.ReactNode;
};


const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
const AuthGuard = ({ children }: Props) => {
    const location = useLocation()

    console.log('进来了', children)
    const store = useStore()
    const token = store?.userStore.token
    console.log(token)
    if (!token) {
        if (whiteList.indexOf(location.pathname) !== -1) {
            return children
        } else {
            return <Navigate to="/login" replace />;
        }

    }
    return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}

export default AuthGuard

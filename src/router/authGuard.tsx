import { useCallback, useEffect } from 'react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useStore, useToken } from '@/hooks';
import PageError from '@/pages/error/PageError';
import { Navigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';

type Props = {
    children: React.ReactNode;
};


const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
const AuthGuard = observer(({ children }: Props) => {
    const location = useLocation()
    const hasToken = useToken();
    const store = useStore()
    store?.authStore.authenticate()
    if (store?.authStore.loading) {
        return <div>全局loading开始，因为菜单在加载和组装中</div>
    }
    if (!hasToken) {
        if (whiteList.indexOf(location.pathname) !== -1) {
            return children
        } else {
            //TODO 带上redirect
            return <Navigate to="/login" replace />;
        }
    }

    if (location.pathname === '/login') {
        return <Navigate to="/" replace />;
    }

    return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
})

export default AuthGuard

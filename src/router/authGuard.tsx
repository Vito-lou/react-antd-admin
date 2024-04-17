import { useCallback, useEffect } from 'react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { ErrorBoundary } from 'react-error-boundary';
import { useStore } from '@/hooks';
import PageError from '@/pages/error/PageError';
// import { useUserToken } from '@/store/userStore';
import { useRouter } from '@/hooks';


type Props = {
    children: React.ReactNode;
};
const AuthGuard = observer(({ children }: Props) => {
    console.log('进来了', children)
    const store = useStore()
    const router = useRouter()
    const token = store?.userStore.token
    console.log(token)

    useEffect(() => {
        if (!token) {
            router.replace('/login');
        }
    }, [token])
    return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
})

export default AuthGuard

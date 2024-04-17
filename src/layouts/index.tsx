import React from 'react';

type Props = {
    children: React.ReactNode;
};
export default function layout({ children }: Props) {

    return (
        <div
            className="flex h-screen w-full flex-col"
        >
            我是全局layout
            {children}
        </div>
    );
}

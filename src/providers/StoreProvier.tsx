import type { ReactNode } from 'react'
import React from 'react'
import { useLocalObservable } from 'mobx-react-lite'
import { RootStore } from '@/store/rootStore'
import { StoresContext } from '@/context'

interface StoreProvierProps {
  children: ReactNode
}
export const StoreProvider: React.FC<StoreProvierProps> = (props) => {
  const rootStore = useLocalObservable(() => new RootStore())
  return <StoresContext.Provider value={rootStore}>{props.children}</StoresContext.Provider>
}

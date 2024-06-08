'use client'

import { PropsWithChildren, useEffect } from "react"
import { Header } from '@/widgets/header';
import localFont from "next/font/local";
import { useAccountStore } from "@/entities/account/store/account.store";
import { TopBar } from "@/widgets/topBar";
import { BottomBar } from "@/widgets/bottomBar";


const NTSomic = localFont({
  src: [
    {
      path: '../../../../public/fonts/NTSomic-Regular.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../../../public/fonts/NTSomic-Medium.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../../../../public/fonts/NTSomic-Semibold.woff2',
      style: 'normal',
      weight: '600',
    },
    {
      path: '../../../../public/fonts/NTSomic-Bold.woff2',
      style: 'normal',
      weight: '700',
    }
  ]
})

const vela = localFont({ 
  src: [
    {
      path: '../../../../public/fonts/VelaSans-Bold.woff',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../../../../public/fonts/VelaSans-Bold.woff2',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../../../../public/fonts/VelaSans-ExtraBold.woff',
      style: 'normal',
      weight: '800',
    },
    {
      path: '../../../../public/fonts/VelaSans-ExtraBold.woff2',
      style: 'normal',
      weight: '800',
    },
    {
      path: '../../../../public/fonts/VelaSans-ExtraLight.woff',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/VelaSans-ExtraLight.woff2',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/VelaSans-Light.woff',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/VelaSans-Light.woff2',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/VelaSans-Medium.woff',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../../../../public/fonts/VelaSans-Medium.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../../../../public/fonts/VelaSans-Regular.woff',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../../../public/fonts/VelaSans-Regular.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../../../public/fonts/VelaSans-SemiBold.woff',
      style: 'normal',
      weight: '600',
    },
    {
      path: '../../../../public/fonts/VelaSans-SemiBold.woff2',
      style: 'normal',
      weight: '600',
    }
  ],
})

export const BaseLayout = ({ children, ...props }: PropsWithChildren) => {
    const checkAuth = useAccountStore((state) => state.checkAuth)
    useEffect(()=> {
      if(localStorage.getItem('token')){
        checkAuth()
      }
    }, [])
    
    return (
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div className={`${NTSomic.className} h-[2000px]`}>
          <TopBar size="compact"/>
          <main className={`h-[100%]`}>{children}</main>
          <BottomBar/>
        </div>
      </>
    );
  };
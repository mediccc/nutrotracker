'use client'

import { Button, LogoCompact } from '@/shared/ui';
import styles from './styles.module.css';
import { useAccountStore } from '@/entities/account/store/account.store';
import { useEffect } from 'react';

export const Header = () => {
    const accountIsAuth = useAccountStore((state) => state.isAuth)
    const accountUser = useAccountStore((state) => state.account)
    const logoutAccount = useAccountStore((state) => state.logout)

    useEffect(() => {
      useAccountStore.persist.rehydrate()
    }, [])
    
    return (
      <header className={styles.header}>
      </header>
    );
};
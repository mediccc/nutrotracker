import { Button, LogoCompact } from '@/shared/ui';
import styles from './styles.module.css';
import { useAccountStore } from '@/entities/account/store/account.store';
import { useEffect } from 'react';
import { IconButton } from '@/shared/ui/iconButton';
import { useRouter } from 'next/navigation';

export const BottomBar = () => {

    const router = useRouter()
    
    return (
      <div className={styles.bottom_bar}>
            <IconButton icon='monitoring' label='здоровье' onClick={() => router.push('/')}></IconButton>
            <IconButton icon='nutrition' label='питание' onClick={() => router.push('/nutrition')}></IconButton>
            <IconButton icon='account_circle' label='профиль' onClick={() => router.push('/profile')}></IconButton>
      </div>
    );
};
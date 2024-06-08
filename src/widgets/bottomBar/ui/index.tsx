import { Button, LogoCompact } from '@/shared/ui';
import styles from './styles.module.css';
import { useAccountStore } from '@/entities/account/store/account.store';
import { useEffect } from 'react';
import { IconButton } from '@/shared/ui/iconButton';

export const BottomBar = () => {
    
    return (
      <div className={styles.bottom_bar}>
            <IconButton icon='monitoring' label='здоровье' href=''></IconButton>
            <IconButton icon='nutrition' label='питание' href='nutrition'></IconButton>
            <IconButton icon='account_circle' label='профиль' href='profile'></IconButton>
      </div>
    );
};
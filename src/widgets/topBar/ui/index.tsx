import { Button, LogoCompact } from '@/shared/ui';
import styles from './styles.module.css';
import { useAccountStore } from '@/entities/account/store/account.store';
import { forwardRef, useEffect } from 'react';
import { IconButton } from '@/shared/ui/iconButton';

type TopBarSize = 'compact' | 'normal'

interface TopBarProps {
    title: string
    icon?: string
    size: TopBarSize
}

const DEFAULT_SIZE: TopBarSize = 'compact'

const TopBar = forwardRef<HTMLDivElement, TopBarProps>(
    ({ size, icon, title, ...props }, ref ) => {
    //const accountIsAuth = useAccountStore((state) => state.isAuth)
    //const accountUser = useAccountStore((state) => state.account)
    //const logoutAccount = useAccountStore((state) => state.logout)

    const sizeSelector = size || DEFAULT_SIZE
    const topBarStyles = `${styles.top_bar} ${styles[`top_bar_${sizeSelector}`]}`
    const titleContainerStyles = `${styles.title_container} ${styles[`title_container_${sizeSelector}`]}`
    
    const defaultIcon = icon || 'arrow_back'
    return (
      <div className={topBarStyles}>
        <div className={styles.action_container}>
            <IconButton icon={`${defaultIcon}`}></IconButton>
        </div>
        <div className={titleContainerStyles}>{title}</div>
      </div>
    );
});

TopBar.displayName = 'TopBar'

export { TopBar }
import React, { forwardRef, type ElementType, ReactNode, ComponentProps } from 'react';
import styles from './styles.module.css';
import { paths } from '@/shared/routing';
import Image from 'next/image';
import Link from 'next/link';

interface LogoCompactOwnProps<E extends ElementType = ElementType> {
    readonly preload?: boolean
    as?: E
}

//Параметры по дефолту
const DEFAULT_ELEMENT: ElementType = 'link'

export type LogoCompactProps<E extends ElementType> = LogoCompactOwnProps<E> & Omit<ComponentProps<E>, keyof LogoCompactOwnProps>;

export const LogoCompact = React.memo(forwardRef<HTMLLinkElement, LogoCompactProps<typeof DEFAULT_ELEMENT>>(
    (
        { as, preload, ...props }, ref
    ) => {

        //Выбор compact/full
        //Выбор appearance

        return(
            <Link href={paths.home} className={styles.logo}>
                <Image priority className={styles.image} width={190} height={60} src="/logo_full_brand_light.svg" alt="Neurite" />
            </Link>
        )
    }
))
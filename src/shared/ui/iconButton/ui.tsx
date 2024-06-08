import React, { forwardRef, type ElementType, ReactNode, ComponentProps, ReactSVGElement, ReactSVG, SVGProps, SVGFactory, SVGAttributes, SVGTextElementAttributes } from 'react';
import styles from './iconButton.module.css';
import { Icon } from '../icon';
import Link from 'next/link';

type IconSize = '32px' | '24px'

interface IconButtonOwnProps<E extends ElementType = ElementType> {
    icon: string
    size?: IconSize
    preload?: boolean
    label?: string
    href?: string
    as?: E
}

//Параметры по дефолту
const DEFAULT_ELEMENT: ElementType = 'div'
const DEFAULT_SIZE: IconButtonOwnProps['size'] = '32px'
const DEFAULT_ICON: IconButtonOwnProps['icon'] = 'add'
const DEFAULT_HREF: string = ''

export type IconButtonProps<E extends ElementType> = IconButtonOwnProps<E> & Omit<ComponentProps<E>, keyof IconButtonOwnProps>;

export const IconButton = forwardRef<HTMLDivElement, IconButtonProps<typeof DEFAULT_ELEMENT>>(
    (
        { icon, as, label, href, ...props }, ref
    ) => {

        //Выбор парметров из дефолтных или указанных
        const Element: ElementType = as || DEFAULT_ELEMENT
        //const sizeSelector: IconBoxOwnProps['size'] = size || DEFAULT_SIZE
        const iconSelector: IconButtonOwnProps['icon'] = icon || DEFAULT_ICON
        const hrefSelector: string = href || DEFAULT_HREF
        //дописать прелоадинг


        const iconButtonStyles = `${styles.base} ${label && styles.base_menu}`
        const stateContainerStyles = `${styles.state_container} ${label && styles.state_container_menu}`

        //const iconBoxStyles = `${styles.base}`;

        return(
            <>
            {href && (
                <Link href={`/${hrefSelector}`}>
                    <Element className={iconButtonStyles} {...props}>
                            <div className={stateContainerStyles}>
                                <span className="material-symbols-rounded">
                                    {iconSelector}
                                </span>
                                { label && (
                                    <span className={styles.label}>{label}</span>
                                )}
                            </div>
                    </Element>
                </Link>
            )}
            {!href && (
                <Element className={iconButtonStyles} {...props}>
                        <div className={stateContainerStyles}>
                            <span className="material-symbols-rounded">
                                {iconSelector}
                            </span>
                            { label && (
                                <span className={styles.label}>{label}</span>
                            )}
                        </div>
                </Element>
            )}
            </>
        )
    }
)
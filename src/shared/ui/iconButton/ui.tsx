import React, { forwardRef, type ElementType, ReactNode, ComponentProps, ReactSVGElement, ReactSVG, SVGProps, SVGFactory, SVGAttributes, SVGTextElementAttributes } from 'react';
import styles from './iconButton.module.css';
import { Icon } from '../icon';
import Link from 'next/link';

type IconButtonSize = 'compact' | 'medium'
type IconButtonAppearance = 'transparent' | 'filled'

interface IconButtonOwnProps<E extends ElementType = ElementType> {
    icon: string
    appearance?: IconButtonAppearance
    size?: IconButtonSize
    preload?: boolean
    label?: string
    as?: E
}

//Параметры по дефолту
const DEFAULT_ELEMENT: ElementType = 'div'
const DEFAULT_SIZE: IconButtonOwnProps['size'] = 'compact'
const DEFAULT_ICON: IconButtonOwnProps['icon'] = 'add'
const DEFAULT_APPEARANCE: IconButtonAppearance = 'transparent'

export type IconButtonProps<E extends ElementType> = IconButtonOwnProps<E> & Omit<ComponentProps<E>, keyof IconButtonOwnProps>;

const IconButton = forwardRef<HTMLDivElement, IconButtonProps<typeof DEFAULT_ELEMENT>>(
    (
        { icon, as, label, appearance, size, ...props }, ref
    ) => {

        //Выбор парметров из дефолтных или указанных
        const Element: ElementType = as || DEFAULT_ELEMENT
        //const sizeSelector: IconBoxOwnProps['size'] = size || DEFAULT_SIZE
        const iconSelector: IconButtonOwnProps['icon'] = icon || DEFAULT_ICON
        const appearanceSelector: IconButtonAppearance = appearance || DEFAULT_APPEARANCE
        const sizeSelector: IconButtonSize = size || DEFAULT_SIZE
        //const hrefSelector: string = href || DEFAULT_HREF
        //дописать прелоадинг


        const iconButtonStyles = `${styles.base} ${styles[`base_${appearanceSelector}`]} ${styles[`base_${sizeSelector}`]} ${label && styles.base_menu} ${styles}`
        const stateContainerStyles = `${styles[`state_container_${appearanceSelector}`]} ${label && styles.state_container_menu}`

        //const iconBoxStyles = `${styles.base}`;

        return(
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
        )
    }
)

IconButton.displayName = 'IconButton'

export { IconButton }
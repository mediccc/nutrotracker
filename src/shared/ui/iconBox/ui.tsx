import React, { forwardRef, type ElementType, ReactNode, ComponentProps, ReactSVGElement, ReactSVG, SVGProps, SVGFactory, SVGAttributes, SVGTextElementAttributes } from 'react';
import styles from './iconBox.module.css';
import { Icon } from '../icon';

type IconSize = '32px' | '24px'

interface IconBoxOwnProps<E extends ElementType = ElementType> {
    size?: IconSize
    preload?: boolean
    as?: E
}

//Параметры по дефолту
const DEFAULT_ELEMENT: ElementType = 'div'
const DEFAULT_SIZE: IconBoxOwnProps['size'] = '32px'

export type IconBoxProps<E extends ElementType> = IconBoxOwnProps<E> & Omit<ComponentProps<E>, keyof IconBoxOwnProps>;

const IconBox = forwardRef<HTMLDivElement, IconBoxProps<typeof DEFAULT_ELEMENT>>(
    (
        { as, size, preload, ...props }, ref
    ) => {

        //Выбор парметров из дефолтных или указанных
        const Element: ElementType = as || DEFAULT_ELEMENT
        const sizeSelector: IconBoxOwnProps['size'] = size || DEFAULT_SIZE
        //дописать прелоадинг


        const iconBoxStyles: string = styles.base
        //const iconBoxStyles = `${styles.base}`;

        return(
            <Element className={iconBoxStyles}>
                <Icon icon='add'></Icon>
            </Element>
        )
    }
)

IconBox.displayName = 'IconBox'

export { IconBox }
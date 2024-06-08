import React, { forwardRef, type ElementType, ReactNode, ComponentProps } from 'react';
import styles from './buttonLabel.module.css';

interface ButtonLabelOwnProps<E extends ElementType = ElementType> {
    children: ReactNode
    readonly size?: 'compact' | 'regular'
    readonly preload?: boolean
    as?: E
}

//Параметры по дефолту
const DEFAULT_ELEMENT: ElementType = 'div'
const DEFAULT_SIZE: ButtonLabelOwnProps['size'] = 'regular'

export type ButtonLabelProps<E extends ElementType> = ButtonLabelOwnProps<E> & Omit<ComponentProps<E>, keyof ButtonLabelOwnProps>;

export const ButtonLabel = forwardRef<HTMLDivElement, ButtonLabelProps<typeof DEFAULT_ELEMENT>>(
    (
        { children, as, size, preload, ...props }, ref
    ) => {

        //Выбор парметров из дефолтных или указанных
        const Element: ElementType = as || DEFAULT_ELEMENT
        const sizeSelector: ButtonLabelOwnProps['size'] = size || DEFAULT_SIZE
        //дописать прелоадинг


        //Конфигурация стилей
        const buttonLabelStyles = `${styles.base} ${styles[`${sizeSelector}`]}`;

        return(
            <Element className={buttonLabelStyles} ref={ref}>
                { children }
            </Element>
        )
    }
)
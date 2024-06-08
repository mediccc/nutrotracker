import React, { forwardRef, type ElementType, ReactNode, ComponentProps } from 'react';
import styles from './styles.module.css';

interface TextOwnProps<E extends ElementType = ElementType> {
    children: ReactNode
    readonly preload?: boolean
    as?: E
}

//Параметры по дефолту
const DEFAULT_ELEMENT: ElementType = 'h1'

export type TextProps<E extends ElementType> = TextOwnProps<E> & Omit<ComponentProps<E>, keyof TextOwnProps>;

export const Text = forwardRef<HTMLDivElement, TextProps<typeof DEFAULT_ELEMENT>>(
    (
        { children, as, preload, ...props }, ref
    ) => {

        //Выбор парметров из дефолтных или указанных
        const Element = as || DEFAULT_ELEMENT
        //дописать прелоадинг


        //Конфигурация стилей
        const textStyles = `${styles['text-steady']} text-[16px]`;

        return(
            <Element className={textStyles} ref={ref}>
                { children }
            </Element>
        )
    }
)
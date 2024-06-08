import React, { forwardRef, type ElementType, ReactNode, ComponentProps } from 'react';
import styles from './styles.module.css';

type CardFlex = 'row' | 'col'

interface CardOwnProps<E extends ElementType = ElementType> {
    children: ReactNode
    flex: CardFlex
    readonly preload?: boolean
    as?: E
}

//Параметры по дефолту
const DEFAULT_ELEMENT: ElementType = 'div'

export type CardProps<E extends ElementType> = CardOwnProps<E> & Omit<ComponentProps<E>, keyof CardOwnProps>;

export const Card = React.memo(forwardRef<HTMLDivElement, CardProps<typeof DEFAULT_ELEMENT>>(
    (
        { children, as, preload, flex, ...props }, ref
    ) => {

        //Выбор парметров из дефолтных или указанных
        const Element = as || DEFAULT_ELEMENT
        //дописать прелоадинг


        //Конфигурация стилей
        const cardStyles = `${styles['card-steady']}`;

        return(
            <Element className={`flex w-full max-w-[640px] h-fit flex-${flex} gap-[24px] p-[20px] rounded-[16px] bg-ui-card-default border-[2px] border-palette-dark-8`} ref={ref}>
                { children }
            </Element>
        )
    }
))
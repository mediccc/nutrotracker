import React, { forwardRef, type ElementType, ReactNode, ComponentProps, ReactSVGElement, ReactSVG, SVGProps, SVGFactory, SVGAttributes, SVGTextElementAttributes } from 'react';
import styles from './styles.module.css';

interface MealOwnProps<E extends ElementType = ElementType> {
    title: string
    time: string
    children: ReactNode
    as?: E
}

//Параметры по дефолту
const DEFAULT_ELEMENT: ElementType = 'div'

export type MealProps<E extends ElementType> = MealOwnProps<E> & Omit<ComponentProps<E>, keyof  MealOwnProps>;

export const Meal = forwardRef<HTMLDivElement,  MealProps<typeof DEFAULT_ELEMENT>>(
    (
        { children, title, time, ...props }, ref
    ) => {

        //Выбор парметров из дефолтных или указанных
        //const Element: ElementType = as || DEFAULT_ELEMENT
        //const sizeSelector: IconBoxOwnProps['size'] = size || DEFAULT_SIZE
        //const iconSelector: ProgressIndicatorOwnProps['icon'] = icon || DEFAULT_ICON
        //const hrefSelector: string = href || DEFAULT_HREF
        //дописать прелоадинг


        //const iconButtonStyles = `${styles.base} ${label && styles.base_menu}`
        //const stateContainerStyles = `${styles.state_container} ${label && styles.state_container_menu}`

        //const iconBoxStyles = `${styles.base}`;

        return(
            <div className={styles.meal}>
                <div className="flex flex-row gap-[8px] w-fit h-fit">
                    <div className={styles.meal__title}>{title}</div>
                    <div className={styles.meal__time}>{time}</div>
                </div>
                { children }
            </div>
        )
    }
)
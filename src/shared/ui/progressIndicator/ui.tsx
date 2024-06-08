import React, { forwardRef, type ElementType, ReactNode, ComponentProps, ReactSVGElement, ReactSVG, SVGProps, SVGFactory, SVGAttributes, SVGTextElementAttributes } from 'react';
import styles from './styles.module.css';
import { Icon } from '../icon';
import Link from 'next/link';

type IconSize = '32px' | '24px'

interface ProgressIndicatorOwnProps<E extends ElementType = ElementType> {
    title: string
    value: number
    goal: number
    measure: string
    as?: E
}

//Параметры по дефолту
const DEFAULT_ELEMENT: ElementType = 'div'
//const DEFAULT_SIZE: ProgressIndicatorOwnProps['size'] = '32px'
//const DEFAULT_ICON: ProgressIndicatorOwnProps['icon'] = 'add'
//const DEFAULT_HREF: string = ''

export type ProgressIndicatorProps<E extends ElementType> = ProgressIndicatorOwnProps<E> & Omit<ComponentProps<E>, keyof  ProgressIndicatorOwnProps>;

export const ProgressIndicator = forwardRef<HTMLDivElement,  ProgressIndicatorProps<typeof DEFAULT_ELEMENT>>(
    (
        { title, value, goal, measure, ...props }, ref
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
        const progress = `${Number((value/(goal/100)).toFixed(0))}%`

        return(
            <div className={styles.progress_indicator}>
                <div className={styles.title}>{title}</div>
                <div className={styles.indicator_bar}>
                    <div className={`${styles.indicator_progress}`} style={{height: progress}}></div>
                </div>
                <div className={styles.info}>
                    <div className={styles.now}>{`${Number(value.toFixed(0))} ${measure}`}</div>
                    <div className={styles.from}>{`из ${Number(goal.toFixed(0))}`}</div>
                </div>
            </div>
        )
    }
)
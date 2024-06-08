import React, { forwardRef, type ElementType, ReactNode, ComponentProps, ReactSVGElement, ReactSVG, SVGProps, SVGFactory, SVGAttributes, SVGTextElementAttributes } from 'react';
import styles from './styles.module.css';
import { DateTime } from "luxon";

interface DayCellOwnProps<E extends ElementType = ElementType> {
    date: string | null
    isDisabled?: boolean
    isCurrentDay?: boolean
    as?: E
}

//Параметры по дефолту
const DEFAULT_ELEMENT: ElementType = 'div'
const DEFAULT_IS_DISABLED: boolean = false
const DEFAULT_IS_CURRENT_DAY: boolean = false

export type DayCellProps<E extends ElementType> = DayCellOwnProps<E> & Omit<ComponentProps<E>, keyof  DayCellOwnProps>;

const DayCell = forwardRef<HTMLDivElement,  DayCellProps<typeof DEFAULT_ELEMENT>>(
    (
        { isDisabled, isCurrentDay, date, ...props }, ref
    ) => {
        const isDisabledSelector = isDisabled || DEFAULT_IS_DISABLED
        const isDisabledStyles = `${isDisabledSelector && styles.disabled}`

        const isCurrentDaySelector = isCurrentDay || DEFAULT_IS_CURRENT_DAY
        const isCurrentDayStyles = `${isCurrentDaySelector && styles['day_cell-current']}`

        return(
            <div className={`${styles.day_cell} ${isDisabledStyles} ${isCurrentDayStyles}`} {...props}>
                <div className={styles.date}>{DateTime.fromISO(String(date)).toFormat('d')}</div>
                <div className={styles.day}>{DateTime.fromISO(String(date)).toFormat('ccc')}</div>
            </div>
        )
    }
)

DayCell.displayName = 'DayCell'

export { DayCell }
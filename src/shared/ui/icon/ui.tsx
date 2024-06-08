import React, { forwardRef, type ElementType, ReactNode, ComponentProps, ReactSVGElement, ReactSVG, SVGProps, SVGFactory, SVGAttributes, SVGTextElementAttributes, memo } from 'react';
import styles from './iconBox.module.css';

type IconSize = '32px' | '24px'

interface IconOwnProps<E extends ElementType = ElementType> {
    icon: string
    size?: IconSize
    preload?: boolean
}

//Параметры по дефолту
const DEFAULT_ICON = 'add'
const DEFAULT_ELEMENT: ElementType = 'svg'
const DEFAULT_SIZE: IconOwnProps['size'] = '32px'

export type IconProps<E extends ElementType> = IconOwnProps<E> & Omit<ComponentProps<E>, keyof IconOwnProps>;

const Component = forwardRef<HTMLDivElement, IconProps<typeof DEFAULT_ELEMENT>>(
    (
        { icon, size, preload, ...props }, ref
    ) => {

        //Выбор парметров из дефолтных или указанных
        const sizeSelector: IconOwnProps['size'] = size || DEFAULT_SIZE
        const iconSelector: IconOwnProps['icon'] = icon || DEFAULT_ICON
        //дописать прелоадинг


        //Конфигурация стилей

        return(
            <span className="material-symbols-rounded">
                {icon}
            </span>
        )
    }
)
Component.displayName = 'Icon'
export const Icon = memo(Component)
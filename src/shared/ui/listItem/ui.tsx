import React, { forwardRef, type ElementType, ReactNode, ComponentProps, ReactSVGElement, ReactSVG, SVGProps, SVGFactory, SVGAttributes, SVGTextElementAttributes } from 'react';
import styles from './styles.module.css';
import { DateTime } from "luxon";
import { IconButton } from '../iconButton';

interface ListItemOwnProps<E extends ElementType = ElementType> {
    onButtonClick: () => void,
    title: string,
    description: string,
    as?: E
}

//Параметры по дефолту
const DEFAULT_ELEMENT: ElementType = 'div'

export type ListItemProps<E extends ElementType> = ListItemOwnProps<E> & Omit<ComponentProps<E>, keyof  ListItemOwnProps>;

const ListItem = forwardRef<HTMLDivElement,  ListItemProps<typeof DEFAULT_ELEMENT>>(
    (
        { title, description, onButtonClick, ...props }, ref
    ) => {

        return(
            <div className="flex flex-row p-[6px] gap-[20px] border-b-[1px] items-center border-palette-dark-16">
                <div className='flex flex-row gap-[20px] items-center'>
                   <div>{title}</div>
                   <div className="text-palette-dark-64">{description}</div>
                </div>
                <IconButton icon='delete' onClick={() => onButtonClick()}></IconButton>
            </div>
        )
    }
)

ListItem.displayName = 'ListItem'

export { ListItem }
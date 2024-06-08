import React, { forwardRef, type ElementType, ReactNode, ComponentProps, useEffect, useState } from 'react';
import styles from './button.module.css';
import { ButtonLabel } from '../buttonLabel';
import { IconBox } from '../iconBox';

type ButtonType = HTMLButtonElement['type']
type ButtonDisabled = HTMLButtonElement['disabled']
type ButtonSize = 'small' | 'medium' | 'large'
type ButtonAppearance = 'main' | 'neutral'
type ButtonPriority = 'primary' | 'secondary'
type ButtonWidth = 'stretched' | 'tight'
type ButtonPreload = boolean
type ButtonDefaultStyle = 'base' | 'compact'
type ButtonStyles = string

interface ButtonOwnProps<E extends ElementType = ElementType> {
    children: string
    readonly size?: ButtonSize
    readonly role?: ButtonAppearance
    readonly priority?: ButtonPriority
    readonly width?: ButtonWidth
    readonly type?: ButtonType
    readonly disabled?: ButtonDisabled
    readonly preload?: ButtonPreload
    readonly defaultStyle?: ButtonDefaultStyle
    as?: E
}

//Default options
const DEFAULT_ELEMENT: ElementType = 'button'
const DEFAULT_IS_DISABLED: ButtonDisabled = false
const DEFAULT_WIDTH: ButtonWidth = 'stretched'
const DEFAULT_BASE_STYLE: ButtonDefaultStyle = 'base'
const DEFAULT_PRIORITY: ButtonPriority = 'primary'
const DEFAULT_SIZE: ButtonSize = 'small'

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & Omit<ComponentProps<E>, keyof ButtonOwnProps>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps<typeof DEFAULT_ELEMENT>>(
    (
        { children, size, role , priority, disabled, as, preload, width, defaultStyle, ...props }, ref
    ) => {
        //Selection options
        const Element: ElementType = as || DEFAULT_ELEMENT
        const baseStyleSelector: ButtonDefaultStyle = defaultStyle || DEFAULT_BASE_STYLE
        const isDisabled: ButtonDisabled = disabled || DEFAULT_IS_DISABLED
        const widthSelector: ButtonWidth = width || DEFAULT_WIDTH
        const prioritySelector: ButtonPriority = priority || DEFAULT_PRIORITY
        const sizeSelector: ButtonSize = size || DEFAULT_SIZE
        

            
        //Preloading options
        useEffect(() => {
            console.log({...props})
            console.log(baseStyleSelector)
        }, [])

        //Styles configuration
        const buttonStyles: ButtonStyles = [
            styles[baseStyleSelector],
            styles[prioritySelector],
            styles[sizeSelector],
            styles[widthSelector],
        ].join(' ');

        return(
            <Element className={buttonStyles} disabled={isDisabled} ref={ref} {...props}>
                <ButtonLabel>
                    { children }
                </ButtonLabel>
                <IconBox></IconBox>
            </Element>
        )
    }
)
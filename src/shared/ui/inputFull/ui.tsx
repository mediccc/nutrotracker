'use client'

import { useInput } from "@/shared/lib";
import React, { ChangeEvent, InputHTMLAttributes, ReactElement, ReactNode, TimeHTMLAttributes, forwardRef, useDeferredValue, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import styles from './styles.module.css';
import { ControllerFieldState, ControllerProps, ControllerRenderProps, ErrorOption, FieldError, FieldErrorsImpl, FormState, Merge, Message, RegisterOptions, ValidationValueMessage, useController, useFormContext, FieldErrors } from 'react-hook-form';
import { Field, FieldOwnProps, UIPreload, UIStretching } from "..";
//import { FormElementBar, FormElementBarEnum, FormElementProps } from "../input/types";
import { useDebounce } from "@/shared/lib/common/use-debounce/use-debounce";
import { TimerOptions } from "timers";


type FormElementPreload = boolean
type FormElementValue = string
type FormElementRequired = boolean
type FormElementDisabled = boolean
type FormElementName = string
type FormElementWidth = 'stretched' | 'tight'
type FormElementType = 'text' | 'password'
type FormElementRegisterAs = string
type FormElementIsFocus = boolean

//Default options
interface FormProps extends InputHTMLAttributes<HTMLInputElement>  {
    name: FormElementName
    type: FormElementType
    error?: FieldError
    width: FormElementWidth
    value: FormElementValue
    registerAs: FormElementRegisterAs
    required?: FormElementRequired
    disabled?: FormElementDisabled
}

export const InputFull = forwardRef<HTMLInputElement, FormProps>(
    ({ width, type, name, required, disabled, error, value, registerAs, ...props }, ref ) => {

        const { register, control, getValues } = useFormContext()
        //Повышение производительности: расположение идентификаторов в теле компонента
        //const DEFAULT_TYPE: FormElementType = 'password'
        //const DEFAULT_BAR: FormElementBar = FormElementBarEnum.Full
        const DEFAULT_WIDTH: FormElementWidth = 'stretched'
        const DEFAULT_REQUIRED: FormElementRequired = true
        const DEFAULT_DISABLED: FormElementRequired = false
        const DEFAULT_IS_FOCUS: FormElementIsFocus = false

        control.getFieldState('email').isTouched
        //Ситема управления состоянием
        const id = useId()
        const [isFocus, setIsFocus] = useState<boolean>(false)
        const [messageText, setMessageText] = useState<Message>(error?.message || '')
        const [isError, setError] = useState<boolean>(false)

        useEffect(() => {
            setMessageText(error?.message || '')
        }, [error?.message])

        const setFocus = () => {
            setIsFocus(false)
            console.log('focus true')
            console.log(isFocus)
        }

        const setBlur = () => {
            setIsFocus(true)
            console.log('focus false')
            console.log(isFocus)
        }

        const widthSelector: FormElementWidth = width || DEFAULT_WIDTH
        const requiredSelector: boolean = required || DEFAULT_REQUIRED
        const disabledSelector: boolean = disabled || DEFAULT_DISABLED
        const isFocusedSelector: boolean = isFocus || DEFAULT_IS_FOCUS
        //const typeSelector: React.HTMLInputTypeAttribute = type || DEFAULT_TYPE

        const inputTextStyles = `${isError && styles['input-error']} ${styles[`input-steady`]} ${styles[`input-${type}`]} ${styles[`input-${widthSelector}`]} ${!isFocus && styles['input-focused']}`
        const inputPasswordStyles = `${isError && styles['input-error']} ${styles[`input-steady`]} ${styles[`input-${type}`]} ${styles[`input-${widthSelector}`]}`
        const labelStyles = `${value && styles['label-focus']} ${(!value) && styles['label']}`
        const messageStyles = `${styles['input-message']} ${isError && styles['input-message-error']}`

        //const elementSelector = 

        //const attributesSelector = (type: FormElementType) => {
            //const attributes = {
                //text: {
                    //className: inputTextStyles
                //},
                //password: {
                    //className: inputPasswordStyles
                //}
            //}
            //return attributes[type]
        //}

        return(
            <div className={styles.container}>
                <label className={labelStyles}>{name}</label>
                <input 
                    id={id}
                    type={type}
                    className={inputTextStyles}
                    value={value}
                    required={requiredSelector}
                    disabled={disabledSelector}
                    onFocus={() => setFocus()}
                    {...register(registerAs, 
                            { 
                                required: true,
                                onBlur: () => setBlur()
                                //onChange: () => messageController()
                            }
                        )
                    }
                >
                </input>
                <span className={messageStyles}> {messageText} </span>
            </div>
        )
    }
)
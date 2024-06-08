import { useInput } from "@/shared/lib";
import React, { InputHTMLAttributes, ReactNode, forwardRef, useEffect, useId, useLayoutEffect, useState } from "react";
import { string, object, email, parse, ValiError, regex } from "valibot";
import styles from './styles.module.css';
import { ErrorOption, FieldErrorsImpl, Merge, Message, RegisterOptions, ValidationValueMessage, useController, useFormContext } from "react-hook-form";
import { FieldError, FieldHasError, FieldOnClear, FieldOwnProps, FieldPreload, FieldTogglePassword, FieldWidth } from "..";

//Default custom options
const DEFAULT_WIDTH: FieldWidth = 'stretched'
const DEFAULT_ERROR: FieldError = 'Error'
const DEFAULT_TOGGLE_PASSWORD: FieldTogglePassword = false
const DEFAULT_HAS_ERROR: FieldHasError = false
const DEFAULT_ON_CLEAR: FieldOnClear = () => {}
const DEFAULT_PRELOAD: FieldPreload = false

export const Field = forwardRef<HTMLInputElement, FieldOwnProps>(
    ({ width, preload, name, options, type = 'text', ...props }, ref ) => {

        //Ситема управления состоянием
        const id = useId()
        const [isFocus, setIsFocus] = useState<boolean>(false)
        //const [messageText, setMessageText] = useState<Message>(message || '')
        const [isError, setError] = useState<boolean>(false)

        //Система управления контролем форм
        const input = useInput('')
        const {
            register,
            setValue,
            formState: { errors, isDirty },
            getFieldState
        } = useFormContext()
        //Создать debounce

        //Структуризация options

        const widthSelector: FieldWidth = width || DEFAULT_WIDTH
        //const requiredSelector: boolean = required || DEFAULT_REQUIRED
        //const disabledSelector: boolean = disabled || DEFAULT_DISABLED
        //const typeSelector: React.HTMLInputTypeAttribute = type || DEFAULT_TYPE

        //text schema
        //const InputSchema = object({
            //[`${type}`]: string([email('Не является Email')])
        //})
        //useEffect(() => {
            //if(errors[`${name}`]?.message){
                //setError(true)
                //setMessageText(String(errors[`${name}`]?.message))
            //} else {
                //setError(false)
                //setMessageText('')
            //}
        //}, [errors[`${name}`]])

        const handleOnBlur = () => {
            if (input.value === '') {
               setIsFocus(false);
            }
        };

        
        //const inputStyles = `${isError && styles['input-error']} ${styles[`input-steady`]} ${styles[`input-${type}`]} ${styles[`input-${widthSelector}`]}`
        //const messageStyles = `${styles['input-message']} ${isError && styles['input-message-error']}`

        return(   
            <input 
            id={id}
            type={type}
            //className={inputStyles}
            onFocus={() => setIsFocus(true)}
            //onChange={input.onChange}
            //value={input.value}
            //required={requiredSelector}
            //disabled={disabledSelector}
            {...register(name, options)}
            ></input>
        )
    }
)
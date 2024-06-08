import { InputHTMLAttributes, ReactNode } from "react"
import { RegisterOptions } from "react-hook-form"

export type FieldWidth = "stretched" | "tight"
export type FieldError = string
export type FieldTogglePassword = boolean
export type FieldHasError = boolean
export type FieldOnClear = () => void
export type FieldPreload = boolean
export type FieldIconBefore = ReactNode
export type FieldIconAfter = ReactNode 
export type FieldName = string
export type FieldOptions = RegisterOptions

export interface FieldOwnProps extends InputHTMLAttributes<HTMLInputElement> {
    readonly width?: FieldWidth
    readonly name: FieldName
    readonly error?: FieldError
    readonly togglePassword?: FieldTogglePassword
    readonly hasError?: FieldHasError
    readonly onClear?: FieldOnClear
    readonly preload?: FieldPreload
    readonly iconBefore?: FieldIconBefore
    readonly iconAfter?: FieldIconAfter
    readonly options?: FieldOptions
}

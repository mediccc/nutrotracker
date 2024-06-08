import { ChangeHandler, Message, RefCallBack, RegisterOptions, UseControllerProps, UseFormRegister } from "react-hook-form"
import { FieldOwnProps, UIPreload, UIStretching } from ".."
import { ReactElement } from "react"

//Тип элемента
export type FormElementType = 'text' | 'password'

//Размер элемента
export type FormElementPadding = 'compact' | 'regular'
//type FormElementPanel = 'top' | 'lower' | 'full'

//Тип title элемента
export type FormElementTitle = string

//Включение валидационной панели
export type FormElementValidationBar = boolean

//Ширина элемента
export type FormElementWidth = UIStretching

//Предзагрузка элемента
export type FormElementPreload = UIPreload

//Имя элемента формы (например, email)
export type FormElementName = string

//Опции элемента формы
export type FormElementOptions = RegisterOptions

//Иконка обязательности
export type FormElementRequiredIcon = ReactElement

//Иконка вопроса (детализация формы)
export type FormElementQuestionIcon = ReactElement

//Правый текст (индикационный, например, 30/50)
export type FormElementRightText = string

//Тип для дескрипшена элемента формы
export type FormElementCaption = string

export type FormElementMessage = Message

//Область допустимых вариантов панелей
export enum FormElementBarEnum {
    Top = 'top',
    Lower = 'lower',
    Full = 'full',
}

export type FormElementBar = FormElementBarEnum.Top | FormElementBarEnum.Lower | FormElementBarEnum.Full

export type FormElementCommonProps = {
    readonly type?: FormElementType
    readonly padding?: FormElementPadding
    readonly width?: FormElementWidth
    readonly preload?: FormElementPreload
    readonly name: FormElementName
    readonly message?: FormElementMessage
}
export type FormElementTopBarProps = {
    readonly bar?: FormElementBarEnum.Top
    readonly title?: FormElementTitle
    readonly requiredIcon?: FormElementRequiredIcon
    readonly questionIcon?: FormElementQuestionIcon
    readonly rightText?: FormElementRightText
    readonly validationBar?: never
    readonly caption?: never
}
export type FormElementLowerBarProps = {
    readonly bar?: FormElementBarEnum.Lower
    readonly title?: never
    readonly requiredIcon?: never
    readonly questionIcon?: never
    readonly rightText?: never
    readonly validationBar?: FormElementValidationBar
    readonly caption?: FormElementCaption
}
export type FormElementFullBarProps = {
    readonly bar?: FormElementBarEnum.Full
    readonly title?: FormElementTitle
    readonly requiredIcon?: FormElementRequiredIcon
    readonly questionIcon?: FormElementQuestionIcon
    readonly rightText?: FormElementRightText
    readonly validationBar?: FormElementValidationBar
    readonly caption?: FormElementCaption
}

export type FormElementConditionalBarProps = 
    | FormElementTopBarProps
    | FormElementLowerBarProps
    | FormElementFullBarProps

type FormElementFieldType = FieldOwnProps

type FormElementConditionalTypeProps =
   | FormElementFieldType

export type FormElementProps = 
    FormElementCommonProps & 
    FormElementConditionalBarProps & 
    FormElementConditionalTypeProps &
    UseControllerProps
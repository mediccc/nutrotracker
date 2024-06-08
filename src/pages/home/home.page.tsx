'use client'

import { Button, Card } from '@/shared/ui'
import * as Figma from 'figma-js';
import { Field } from '@/shared/ui/field/ui'
import { Text } from '@/shared/ui/text'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import {  ValiError, email, maxLength, minLength, object, parse, required, string } from 'valibot'
import { Input } from '@/shared/ui/input';
import { useAccountStore } from '@/entities/account/store/account.store';
import { useEffect, useState } from 'react';
import { InputFull } from '@/shared/ui/inputFull';
import { useMealDayStore } from '@/entities/meal-day/store/meal-day.store';

interface AuthForm {
  email: string
  password: string
  access: string
}

interface CreateUfiForm {
  type: string
  isFree: string
  title: string
}

interface CreateMealDayForm {
  isCompleted: string
  date: string
}


const ValidationSchema = object({
  email: string([email('Не является email')]),
  password: string([
    minLength(10, 'Длина пароля менее 10 символов'),
    maxLength(16, 'Длина пароля более 36 символов'),
  ])
})



export function HomePage() {

  const accountIsAuth = useAccountStore((state) => state.isAuth)
  const registerAccount = useAccountStore((state) => state.registration)
  const loginAccount = useAccountStore((state) => state.login)
  const accountUser = useAccountStore((state) => state.account)
  const logoutAccount = useAccountStore((state) => state.logout)
  const createMealDay = useMealDayStore((state) => state.createMealDay)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLogin, setIsLogin] = useState<boolean>(false)

  const [isEmailFocus, setIsEmailFocus] = useState<boolean>(false)
  const [isPasswordFocus, setIsPasswordFocus] = useState<boolean>(false)

  useEffect(() => {
    useMealDayStore.persist.rehydrate()
    useAccountStore.persist.rehydrate()
    methods.setFocus('email')
  }, [])
  //console.log(resolver + 'sd')
  const methods = useForm<AuthForm>({
      defaultValues: {
        email: '',
        password: '',
      },
      mode: 'onChange',
      resolver: valibotResolver(ValidationSchema),
  })

  const methodsCreateUfi = useForm<CreateUfiForm>({
    defaultValues: {
      type: '',
      isFree: '',
      title: ''
    },
    mode: 'onChange'
  })

  const methodsCreateMealDay = useForm<CreateMealDayForm>({
    defaultValues: {
      isCompleted: '',
      date: ''
    },
    mode: 'onChange'
  })

  const submitRegistration: SubmitHandler<AuthForm> = data => {
    registerAccount(data.email, data.password)
  }

  const submitLogin: SubmitHandler<AuthForm> = data => {
    loginAccount(data.email, data.password)
  }

  const submitCreateUfi: SubmitHandler<CreateUfiForm> = data => {
    console.log('неа')
  }

  const submitCreateMealDay: SubmitHandler<CreateMealDayForm> = data => {
    createMealDay(Number(accountUser.id), Boolean(data.isCompleted), String(data.date))
  }

  return (
      <div className='m-8 flex flex-col gap-[20px] content-center justify-center'>
        {!accountIsAuth && (
          <div>Не авторизован.</div>
        )}
        {accountIsAuth && (
          <>
            <div className='flex flex-row w-auto rounded-[16px] p-[16px] gap-[24px] bg-palette-dark-4'>
            <div>Авторизован.</div>
              <div className='flex w-auto'>{`EMAIL: ${accountUser.email}`}</div>
              <div className='flex w-auto'>{`ID: ${accountUser.id}`}</div>
              <Button size='small' type='submit' width='tight' priority='secondary' 
                onClick={() => logoutAccount()}>
                  Выйти из аккаунта
              </Button>
            </div>
            <div className='flex flex-row gap-[24px]'>
            <Card flex='col'>
              <Text>Создание UFI</Text>
              <FormProvider {...methodsCreateUfi}>
                <form onSubmit={methodsCreateUfi.handleSubmit(submitCreateUfi)}>
                  <Controller name='isFree' control={methodsCreateUfi.control} render={({ field: { value }, fieldState: { error }}) => 
                      <InputFull name='Свободный' type='text' width='stretched' placeholder='Свободный' error={error} value={value} registerAs='isFree'
                        onFocus={() => console.log('true')}
                      />
                    }
                  />
                  <Controller name='title' control={methodsCreateUfi.control} render={({ field: { value }, fieldState: { error }}) => 
                      <InputFull name='Название' type='text' width='stretched' placeholder='Название' error={error} value={value} registerAs='title'
                        onFocus={() => console.log('true')}
                      />
                    }
                  />
                  <Controller name='type' control={methodsCreateUfi.control} render={({ field: { value }, fieldState: { error }}) => 
                      <InputFull name='Тип' type='text' width='stretched' placeholder='Свободный' error={error} value={value} registerAs='type'
                        onFocus={() => console.log('true')}
                      />
                    }
                  />
                  <Button size='small' type='submit' priority='primary'>
                    Создать UFI
                  </Button>
                </form>
              </FormProvider>
            </Card>
            <Card flex='col'>
              <Text>Создание MealDay</Text>
              <FormProvider {...methodsCreateMealDay}>
                <form onSubmit={methodsCreateMealDay.handleSubmit(submitCreateMealDay)}>
                  <Controller name='isCompleted' control={methodsCreateMealDay.control} render={({ field: { value }, fieldState: { error }}) => 
                      <InputFull name='Выполненность' type='text' width='stretched' placeholder='Выполненность' error={error} value={value} registerAs='isCompleted'
                        onFocus={() => console.log('true')}
                      />
                    }
                  />
                  <Controller name='date' control={methodsCreateMealDay.control} render={({ field: { value }, fieldState: { error }}) => 
                      <InputFull name='Дата' type='text' width='stretched' placeholder='Дата' error={error} value={value} registerAs='date'
                        onFocus={() => console.log('true')}
                      />
                    }
                  />
                  <Button size='small' type='submit' priority='primary'>
                    Создать MealDay
                  </Button>
                </form>
              </FormProvider>
            </Card>
            </div>
          </>
        )}
        {!accountIsAuth && (
          <Card flex='col'>
          <Text>Регистрация</Text>
          { isLogin && (
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submitLogin)}>
              <Controller name='email' control={methods.control} render={({ field: { value }, fieldState: { error }}) => 
                  <InputFull name='Email' type='text' width='stretched' placeholder='email' error={error} value={value} registerAs='email'
                    onFocus={() => console.log('true')}
                  />
                }
              />
              <Controller 
                name='password'
                control={methods.control}
                render={({ 
                  field: { value }, 
                  fieldState: { error }
                }) => 
                  <Input
                    name='Password'
                    type='text'
                    width='stretched'
                    placeholder='password'
                    error={error}
                    value={value}
                    registerAs='password'
                  />
                }
              />
              <Button size='small' type='submit' priority='primary'>
                Войти в аккаунт
              </Button>
            </form>
            </FormProvider>
          )}
          { !isLogin && (
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submitRegistration)}>
              <Controller 
                name='email'
                control={methods.control}
                render={({ 
                  field: { value }, 
                  fieldState: { error }
                }) => 
                  <Input
                    name='Email'
                    type='text'
                    width='stretched'
                    placeholder='email'
                    error={error}
                    value={value}
                    registerAs='email'
                  />
                }
              />
              <Controller 
                name='password'
                control={methods.control}
                render={({ 
                  field: { value }, 
                  fieldState: { error }
                }) => 
                  <Input
                    name='Password'
                    type='text'
                    width='stretched'
                    placeholder='password'
                    error={error}
                    value={value}
                    registerAs='password'
                  />
                }
              />
              <Button size='small' type='submit' priority='primary'>
                Создать аккаунт
              </Button>
            </form>
            </FormProvider>
          )}
          <Button size='small' type='submit' priority='secondary' onClick={() => setIsLogin(!isLogin)}>
              {`Хочу ${isLogin ? 'создать аккаунт' : 'войти в аккаунт'}`}
          </Button>
        </Card>
        )}
        
      </div>
  )
}
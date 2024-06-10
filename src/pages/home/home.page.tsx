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
import { ContentLayout } from '@/widgets/layouts';
import { TopBar } from '@/widgets/topBar';

interface AuthForm {
  email: string
  password: string
  access: string
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
  const isLoadingAuth = useAccountStore((state) => state.isLoadingAuth)
  const registerAccount = useAccountStore((state) => state.registration)
  const loginAccount = useAccountStore((state) => state.login)

  const [isLogin, setIsLogin] = useState<boolean>(false)

  useEffect(() => {
    useMealDayStore.persist.rehydrate()
    useAccountStore.persist.rehydrate()
    methods.setFocus('email')
  }, [])

  const methods = useForm<AuthForm>({
      defaultValues: {
        email: '',
        password: '',
      },
      mode: 'onChange',
      resolver: valibotResolver(ValidationSchema),
  })

  const submitRegistration: SubmitHandler<AuthForm> = data => {
    registerAccount(data.email, data.password)
  }

  const submitLogin: SubmitHandler<AuthForm> = data => {
    loginAccount(data.email, data.password)
  }

  return (
    <>
      <TopBar size='compact' title='Здоровье' icon='cardiology'></TopBar>
      <ContentLayout>
        {!accountIsAuth && (
          <div>Не авторизован.</div>
        )}
        { isLoadingAuth && (
          <div className="animate-bounce">Авторизация...</div>
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
                  <InputFull name='Password' type='text' width='stretched' placeholder='password' error={error} value={value} registerAs='password'
                    onFocus={() => console.log('true')}
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
                  <InputFull name='Password' type='text' width='stretched' placeholder='password' error={error} value={value} registerAs='password'
                    onFocus={() => console.log('true')}
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
        
      </ContentLayout>
    </>
  )
}
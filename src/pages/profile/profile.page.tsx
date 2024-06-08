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
import { ProgressIndicator } from '@/shared/ui/progressIndicator';
import { TopBar } from '@/widgets/topBar';

export function ProfilePage() {

  const accountIsAuth = useAccountStore((state) => state.isAuth)
  const accountUser = useAccountStore((state) => state.account)
  const logoutAccount = useAccountStore((state) => state.logout)

  useEffect(() => {
    useAccountStore.persist.rehydrate()
  }, [])

  return (
        <>
            <TopBar size="compact" title='Профиль'/>
            <ContentLayout>
                {
                    accountIsAuth && (
                        <div className='flex flex-col w-auto rounded-[16px] p-[16px] gap-[24px] bg-palette-dark-4'>
                            <div>Авторизован.</div>
                            <div className='flex w-auto'>{`EMAIL: ${accountUser.email}`}</div>
                            <div className='flex w-auto'>{`ID: ${accountUser.id}`}</div>
                            <Button size='small' type='submit' width='tight' priority='secondary' 
                                onClick={() => logoutAccount()}>
                                Выйти из аккаунта
                            </Button>
                        </div>
                    )
                }
            </ContentLayout>
        </>
    )
}
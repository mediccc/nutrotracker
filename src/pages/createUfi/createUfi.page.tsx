'use client'

import { Button, Card } from '@/shared/ui'
import { useAccountStore } from '@/entities/account/store/account.store';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { ContentLayout } from '@/widgets/layouts';
import { ProgressIndicator } from '@/shared/ui/progressIndicator';
import { Text } from '@/shared/ui/text';
import { DayCell } from '@/shared/ui/dayCell';
import { DateTime } from 'luxon';
import { IconButton } from '@/shared/ui/iconButton';
import { useMealDayStore } from '@/entities/meal-day/store/meal-day.store';
import { ChangeHandler, Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InputFull } from '@/shared/ui/inputFull';
import Link from 'next/link';
import { useUfiStore } from '@/entities/ufi/store/ufi.store';
import { useRouter } from 'next/navigation';
import { TopBar } from '@/widgets/topBar';

interface CreateUfiForm {
    type: string
    isFree: string
    title: string
    weight: string
    ccal: string
    protein: string
    fat: string
    carb: string
}

export function CreateUfiPage() {

    const accountIsAuth = useAccountStore((state) => state.isAuth)
    const accountUser = useAccountStore((state) => state.account)

    const setCurrentMealDay = useMealDayStore((state) => state.setCurrentMealDay)
    const currentMealDay = useMealDayStore((state) => state.currentMealDay)

    const createUfi = useUfiStore((state) => state.createUfi)

    const createMealDay = useMealDayStore((state) => state.createMealDay)

    const getCurrentMealDay = useMealDayStore((state) => state.getMealDayByDate)
    const currentMealDayData = useMealDayStore((state) => state.currentMealDayData)
    const calculateMealDay = useMealDayStore((state) => state.calculateMealDay)
    const isLoadingUfi = useUfiStore((state) => state.isLoading)
    const searchedUfi = useUfiStore((state) => state.searchedUfi)
    const searchUfi = useUfiStore((state) => state.getAllUfiByTitle)

    const methodsCreateUfi = useForm<CreateUfiForm>({
        defaultValues: {
            type: '',
            isFree: '',
            title: '',
            weight: '',
            ccal: '',
            protein: '',
            fat: '',
            carb: ''
        },
        mode: 'onChange'
    })

    const router = useRouter()

    const submitCreateUfi: SubmitHandler<CreateUfiForm> = async data => {

        const createUfiData = await createUfi(
            Number(accountUser.id), 
            0, 
            true, 
            String(data.title), 
            null, 
            String(currentMealDay), 
            '11:00', 
            'Завтрак',
            Number(data.weight),
            Number(data.ccal),
            Number(data.protein),
            Number(data.fat),
            Number(data.carb)
        )
        console.log('[CREATE UFI DATA]:')
        console.log(createUfiData)
        console.log('_____________________________')
        await setCurrentMealDay(currentMealDay, accountUser.id)
        await calculateMealDay()
        router.push('/nutrition')
    }

  useEffect(() => {
    useAccountStore.persist.rehydrate()
    useMealDayStore.persist.rehydrate()
    useUfiStore.persist.rehydrate()
  }, [])

  return (
        <>
        <TopBar title='Создание продукта' size="normal"></TopBar>
        <ContentLayout>
            <FormProvider {...methodsCreateUfi}>
                <form onSubmit={methodsCreateUfi.handleSubmit(submitCreateUfi)}>
                    <Controller name='title' control={methodsCreateUfi.control} render={({ field: { value }, fieldState: { error }}) => 
                        <InputFull name='Название' type='text' width='stretched' placeholder='Название' error={error} value={value} registerAs='title'
                            onFocus={() => console.log('true')} 
                        />
                        }
                    />
                    <Controller name='weight' control={methodsCreateUfi.control} render={({ field: { value }, fieldState: { error }}) => 
                        <InputFull name='Масса (г)' type='text' width='stretched' placeholder='Масса (г)' error={error} value={value} registerAs='weight'
                            onFocus={() => console.log('true')}
                        />
                        }
                    />
                    <Controller name='ccal' control={methodsCreateUfi.control} render={({ field: { value }, fieldState: { error }}) => 
                        <InputFull name='Килокалорийность' type='text' width='stretched' placeholder='Ккал' error={error} value={value} registerAs='ccal'
                            onFocus={() => console.log('true')}
                        />
                        }
                    />
                    <Controller name='protein' control={methodsCreateUfi.control} render={({ field: { value }, fieldState: { error }}) => 
                        <InputFull name='Белки' type='text' width='stretched' placeholder='Белки' error={error} value={value} registerAs='protein'
                            onFocus={() => console.log('true')}
                        />
                        }
                    />
                    <Controller name='fat' control={methodsCreateUfi.control} render={({ field: { value }, fieldState: { error }}) => 
                        <InputFull name='Жиры' type='text' width='stretched' placeholder='Жиры' error={error} value={value} registerAs='fat'
                            onFocus={() => console.log('true')}
                        />
                        }
                    />
                    <Controller name='carb' control={methodsCreateUfi.control} render={({ field: { value }, fieldState: { error }}) => 
                        <InputFull name='Углеводы' type='text' width='stretched' placeholder='Углеводы' error={error} value={value} registerAs='carb'
                            onFocus={() => console.log('true')}
                        />
                        }
                    />
                    <div className={`${isLoadingUfi && 'animate-pulse'}`}>
                        <Button size='small' type='submit' priority='primary'>
                            {isLoadingUfi ? 'Создание продукта...' : 'Создать продукт'}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </ContentLayout>
        </>
    )
}
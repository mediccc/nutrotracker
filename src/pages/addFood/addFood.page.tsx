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
import { ListItem } from '@/shared/ui/listItem';

interface SearchFoodForm {
    search: string
    type: string | null
}

export function AddFoodPage() {

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
    const isSearching = useUfiStore((state) => state.isLoadingSearch)

    const selectedMeal = useMealDayStore((state) => state.selectedMeal)
    const setSelectedMeal = useMealDayStore((state) => state.setSelectedMeal)
    const defaultmealSchema = useMealDayStore((state) => state.settingsDefaultMealSchema)
    const addUfiToMeal = useUfiStore((state) => state.addUfiToMeal)
    const isLoadingAddUfiToMeal = useUfiStore((state) => state.isLoadingAddUfiToMeal)

    

    const router = useRouter()

    const changeSearch = async (title: string) => {

        await searchUfi(title)

    }


    useEffect(() => {
        useAccountStore.persist.rehydrate()
        useMealDayStore.persist.rehydrate()
        useUfiStore.persist.rehydrate()
        //await setSelectedMeal({ type: currentMealDayData.meals[0].type, time: currentMealDayData.meals[0].time, id: currentMealDayData.meals[0].id, authorId: accountUser.id })
    }, [])

     const methodsSearchFood = useForm<SearchFoodForm>({
        defaultValues: {
            search: ''
        },
        mode: 'onChange'
    })

    const getTypeValues = async () => {
        //const operationArray = methodsSearchFood.getValues("type")?.split(',')
        if(methodsSearchFood.getValues("type")){
            const operationArray = methodsSearchFood.getValues("type")?.split(',')
            if(operationArray){
                console.log(operationArray)
                setSelectedMeal({ id: Number(operationArray[0]), type: operationArray[1] , time: operationArray[2], authorId: accountUser.id })
            }
            //const mealId = operationArray[0] 
            //const type = operationArray[1] 
            //const time = operationArray[2] 
            //const processedArray = [Number(operationArray[0] || null), String(operationArray[1] || null), String(operationArray[2] || null)]
            //console.log(operationArray)
            //setSelectedMeal({ id: operationArray[0], type: operationArray[1] , time: operationArray[2], authorId: accountUser.id })
        }
    }

    const addUfiToSelectedMeal = async (
        ufiId: number,
        mealId: number,
        userId: number,
        date: string,
        time: string,
        type: string,
    ) => {
        console.log(`${ufiId}, ${mealId}, ${userId}, ${date}, ${time}, ${type}`)
        await addUfiToMeal(ufiId, mealId, userId, date, time, type)
        await router.push('/nutrition')
    }

    return (
        <>
        <TopBar title={`Добавление продукта в ${selectedMeal?.type}`} size="normal"></TopBar>
        <ContentLayout>
            <Button size="medium" width="tight" onClick={() => router.push('/nutrition/createUfi')}>Новый продукт</Button>
            <FormProvider {...methodsSearchFood}>
                <form onChange={() => {changeSearch(methodsSearchFood.getValues('search')); getTypeValues()}}>
                    <Controller name='search' control={methodsSearchFood.control} render={({ field: { value, onChange }, fieldState: { error }}) => 
                        <InputFull name='Поиск еды' type='text' width='stretched' placeholder='Поиск еды' error={error} value={value} registerAs='search'
                            onFocus={() => console.log('true')} onChange={onChange}
                        />
                        }
                    />
                    <select {...methodsSearchFood.register("type")}>
                        { 
                            defaultmealSchema.map((meal) => {
                                return <option value={String([null, meal.type, meal.time])} key={Math.random()}>{meal.type}</option>
                            })}
                        {
                            currentMealDayData && (currentMealDayData.meals.map((meal) => {
                                return <option value={String([meal.id, meal.type, meal.time])} key={meal.id}>{`ID: ${meal.id} | Тип:${meal.type}`}</option>
                            }))
                        }
                    </select>
                </form>
            </FormProvider>
            <div>Текущий прием пищи: {`${selectedMeal?.type} ID: ${selectedMeal?.id}`}</div>
            { isSearching && (
                <div className="animate-bounce">Поиск еды...</div>
            )}
            { searchedUfi && (
                
                searchedUfi.map((ufi) => {
                    if(selectedMeal){
                        console.log('Найдены')
                        return <div key={ufi.id} className="flex flex-col gap-[8px] bg-palette-dark-4 rounded-[16px] p-[16px]">
                            <div className="font-medium text-sm">{ufi.title}</div>
                            <div className="flex flex-row gap-[12px] text-xs text-palette-dark-64">
                                <div className='p-[6px] bg-palette-dark-8 rounded-[8px] flex items-center justify-center content-center'>{`Ккал: ${(ufi.ccal * (ufi.weight/100)).toFixed(1)}`}</div>
                                <div className='p-[6px] bg-palette-dark-8 rounded-[8px] flex items-center justify-center content-center'>{`Б: ${(ufi.protein * (ufi.weight/100)).toFixed(1)}`}</div>
                                <div className='p-[6px] bg-palette-dark-8 rounded-[8px] flex items-center justify-center content-center'>{`Ж: ${(ufi.fat * (ufi.weight/100)).toFixed(1)}`}</div>
                                <div className='p-[6px] bg-palette-dark-8 rounded-[8px] flex items-center justify-center content-center'>{`У: ${(ufi.carb * (ufi.weight/100)).toFixed(1)}`}</div>
                            </div>
                            {
                                isLoadingAddUfiToMeal && (
                                    <div className="animate-bounce">Добавление продукта в {selectedMeal?.type}</div>
                                )
                            }
                            <Button size='medium' width='tight' priority="secondary" onClick={() => addUfiToSelectedMeal(ufi.id, Number(selectedMeal.id), accountUser.id, String(currentMealDay), String(selectedMeal.time), String(selectedMeal.type))}>Добавить</Button>
                        </div>
                    }
                })
            )}
            <Button size="large" width='tight' priority="secondary">Добавить в {}</Button>
        </ContentLayout>
        </>
    )
}
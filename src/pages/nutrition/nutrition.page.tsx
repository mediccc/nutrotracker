'use client'

import { Button, Card } from '@/shared/ui'
import { useAccountStore } from '@/entities/account/store/account.store';
import { useEffect, useState } from 'react';
import { ContentLayout } from '@/widgets/layouts';
import { ProgressIndicator } from '@/shared/ui/progressIndicator';
import { Text } from '@/shared/ui/text';
import { DayCell } from '@/shared/ui/dayCell';
import { DateTime } from 'luxon';
import { IconButton } from '@/shared/ui/iconButton';
import { useMealDayStore } from '@/entities/meal-day/store/meal-day.store';
import { ListItem } from '@/shared/ui/listItem';
import { useShallow } from 'zustand/react/shallow';
import { Meal } from '@/shared/ui/meal';
import { useUfiStore } from '@/entities/ufi/store/ufi.store';
import MealDayService from '@/entities/meal-day/service/meal-day.service';
import { MealDay } from '@/entities/meal-day/models/meal-day';
import { TopBar } from '@/widgets/topBar';

export function NutritionPage() {

    //const accountIsAuth = useAccountStore((state) => state.isAuth)
    //const accountUser = useAccountStore((state) => state.account)
    //const logoutAccount = useAccountStore((state) => state.logout)
    const setCurrentMealDay = useMealDayStore((state) => state.setCurrentMealDay)
    const currentMealDay = useMealDayStore((state) => state.currentMealDay)
    //const getMealDayByDate = useMealDayStore((state) => state.getMealDayByDate)
    const currentMealDayData = useMealDayStore((state) => state.currentMealDayData)
    const removeUfiFromMeal = useUfiStore((state) => state.removeUfiFromMealDay)
    const isMenuLoading = useMealDayStore((state) => state.isLoading)
    const calculateMealDay = useMealDayStore((state) => state.calculateMealDay)
    const isCalculate = useMealDayStore((state) => state.isCalculate)

    const currentMealDayCcal = useMealDayStore((state) => state.currentMealDayCcal)
    const currentMealDayProtein = useMealDayStore((state) => state.currentMealDayProtein)
    const currentMealDayFat = useMealDayStore((state) => state.currentMealDayFat)
    const currentMealDayCarb = useMealDayStore((state) => state.currentMealDayCarb)

    //const [currentMealDayCcal, setCurrentMealDayCcal] = useState<number>(0)
    //const [currentMealDayProtein, setCurrentMealDayProtein] = useState<number>(0)
    //const [currentMealDayFat, setCurrentMealDayFat] = useState<number>(0)
    //const [currentMealDayCarb, setCurrentMealDayCarb] = useState<number>(0)

    //const [currentDayData, setCurrentDayData] = useState<MealDay | undefined>()

    //const [dateData, setDayData] = useState<string>('')
    //useMealDayStore.getState().setCurrentMealDay(currentMealDay)

    

    useEffect(() => {
        useAccountStore.persist.rehydrate()
        useMealDayStore.persist.rehydrate()
        useUfiStore.persist.rehydrate()
        //useMealDayStore.getState().setCurrentMealDay(currentMealDay)
        //console.log('rerender')

        const pageStart = async () => {
            await setCurrentMealDay(currentMealDay)
            await calculateMealDay()
        }

        pageStart()

    }, [])

    const UpdateMenu = async (ufiId: number, mealId: number) => {

        await removeUfiFromMeal(ufiId, mealId)
        //console.log(removedUfi)
        await setCurrentMealDay(currentMealDay)
        await calculateMealDay()

        //if(currentMealDayData){
            //setCurrentMealDay(currentMealDayData.date)
        // return
        //}
    }



  return (
        <>
        <TopBar size='compact' title='Питание' icon='nutrition'></TopBar>
        <div className="fixed bottom-[164px] right-[72px] w-auto h-auto">
            <IconButton icon='add'></IconButton>
        </div>
        <ContentLayout>
            <div className={`flex flex-row h-fit w-full max-w-[640px] gap-[8px] ${(isMenuLoading || isCalculate) && 'animate-pulse'}`}>
                <DayCell date={DateTime.fromISO(String(currentMealDay)).minus({ days: 1 }).toISODate()} onClick={async () => {await setCurrentMealDay(DateTime.fromISO(String(currentMealDay)).minus({ days: 1 }).toISODate()); await calculateMealDay()}} isDisabled={true}></DayCell>
                <DayCell date={currentMealDay} onClick={async () => await calculateMealDay()} isCurrentDay={true}></DayCell>
                <DayCell date={DateTime.fromISO(String(currentMealDay)).plus({ days: 1 }).toISODate()} onClick={async () => {await setCurrentMealDay(DateTime.fromISO(String(currentMealDay)).plus({ days: 1 }).toISODate()); await calculateMealDay()}}></DayCell>
                <DayCell date={DateTime.fromISO(String(currentMealDay)).plus({ days: 2 }).toISODate()} onClick={async () => {await setCurrentMealDay(DateTime.fromISO(String(currentMealDay)).plus({ days: 2 }).toISODate()); await calculateMealDay()}}></DayCell>
                <DayCell date={DateTime.fromISO(String(currentMealDay)).plus({ days: 3 }).toISODate()} onClick={async () => {await setCurrentMealDay(DateTime.fromISO(String(currentMealDay)).plus({ days: 3 }).toISODate()); await calculateMealDay()}}></DayCell>
                <DayCell date={DateTime.fromISO(String(currentMealDay)).plus({ days: 4 }).toISODate()} onClick={async () => {await setCurrentMealDay(DateTime.fromISO(String(currentMealDay)).plus({ days: 4 }).toISODate()); await calculateMealDay()}}></DayCell>
                <IconButton icon='date_range'></IconButton>
            </div>
            <div className="flex w-full max-w-[640px] h-fit flex-col gap-[24px] p-[20px] rounded-[16px] bg-ui-card-default border-[2px] border-palette-dark-8">
                <Text>Потребности</Text>
                <div className={`flex flex-row justify-between content-between w-[100%] h-fit ${(isMenuLoading || isCalculate) && 'animate-pulse'}`}>
                    <ProgressIndicator title='Энергия' value={currentMealDayCcal} goal={3100} measure='ккал'></ProgressIndicator>
                    <ProgressIndicator title='Белки' value={currentMealDayProtein} goal={110} measure='г'></ProgressIndicator>
                    <ProgressIndicator title='Жиры' value={currentMealDayFat} goal={100} measure='г'></ProgressIndicator>
                    <ProgressIndicator title='Углеводы' value={currentMealDayCarb} goal={360} measure='г'></ProgressIndicator>
                </div>
                { isCalculate && (
                    <div>Рассчет потребностей...</div>
                )}
            </div>
            <div className={`flex w-full max-w-[640px] h-fit flex-col gap-[24px] p-[20px] rounded-[16px] bg-ui-card-default border-[2px] border-palette-dark-8 ${(isMenuLoading || isCalculate) && 'animate-pulse'}`}>
                <Text>Меню дня</Text>
                <IconButton icon='add' href='nutrition/createUfi'></IconButton>
                { isMenuLoading && (
                    <div className="animate-pulse">Обновление меню...</div>
                )}
                {
                    currentMealDayData && (currentMealDayData.meals.map((meal) => {
                        if(meal.ufis){
                            return <Meal title={meal.type} time={meal.time} key={meal.id}>{ meal.ufis.map((ufi) => {
                                return <ListItem 
                                        title={ufi.title} 
                                        description={`Масса: ${ufi.weight}  Ккал: ${(ufi.ccal * (ufi.weight/100))}  Б: ${ufi.protein}  Ж: ${ufi.fat}  У: ${ufi.carb}`} 
                                        key={ufi.id}
                                        onButtonClick={() => UpdateMenu(ufi.id, meal.id)}>  
                                        </ListItem>
                            })}</Meal>
                        }
                    }))
                }
                {
                    (!currentMealDayData || !currentMealDayData.meals.length) && (
                        <>
                            <Meal title='Завтрак' time='9:00'>
                                <div>Нет приемов пищи</div>
                            </Meal>
                            <Meal title='Обед' time='13:00'>
                                <div>Нет приемов пищи</div>
                            </Meal>
                            <Meal title='Ужин' time='18:00'>
                                <div>Нет приемов пищи</div>
                            </Meal>
                        </>
                    )
                }
            </div>
        </ContentLayout>
        </>
    )
}
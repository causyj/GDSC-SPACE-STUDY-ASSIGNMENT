import { useMemo } from 'react'
import { DIARY_STORAGE_KEY } from '../constants'
import { Diary } from '../interface/diary'
import { useDiaryUpdate } from '../provider/Diary'
import { localStorage } from '../utils'

const updateStorageDiary = (diary: Diary[]) => localStorage.set(DIARY_STORAGE_KEY, diary)
export const useStorageDiary = () => {
    const setDiary = useDiaryUpdate()

    const diaryActions = useMemo(
        () => ({
            remove: (removeId: string) => {
                setDiary((prev) => {
                    const removedDiary = prev.filter(({ id }) => id !== removeId)
                    updateStorageDiary(removedDiary)
                    return removedDiary
                })
            },
            add: (newDiary: Omit<Diary, 'views'>) => {
                const initialView = 1
                setDiary((prev) => {
                    const withViews = { ...newDiary, views: initialView }
                    const updatedDiary = [...prev, withViews]
                    updateStorageDiary(updatedDiary)
                    return updatedDiary
                })
            },
            update: (updateId: string, updateDiary: Diary) => {
                setDiary((prev) => {
                    const targetDiary = prev.find(({ id }) => id === updateId)
                    if (!targetDiary) return prev

                    const updatedDiary = prev.map((diary) => (diary.id === updateId ? updateDiary : diary))
                    updateStorageDiary(updatedDiary)
                    return updatedDiary
                })
            },
        }),
        []
    )

    return diaryActions
}

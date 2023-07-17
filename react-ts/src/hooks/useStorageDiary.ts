import {DIARY_STORAGE_KEY} from '../constants'
import { Diary } from '../interface/diary'
import { useDiaryUpdate } from '../provider/Diary'
import { useMemo } from 'react'
import { localStorage } from '../utils/localstorage'


const updateStorageDiary = (diary : Diary[]) => localStorage.set(DIARY_STORAGE_KEY, diary)
/*Usememo : 
보통의 react 함수형 컴포넌트 : 랜더링 => 컴포넌트 함수 호출 => 모든 내부 변수 초기화의 순서를 거친다
그런데 usememo를 쓰면 , 렌더링 => 컴포넌트 함수 호출 => memoize된 함수 재사용
.*/
export const useStorageDiary = () => {
    const setDiary = useDiaryUpdate()

    const diaryActions = useMemo(
        () => ({
            remove : (removeId : string)=>{
                setDiary((prev) => {
                    const removedDiary = prev.filter(({id}) => id !== removeId)
                    updateStorageDiary(removedDiary)
                    return removedDiary
                })
            },

            add : (newDiary : Omit<Diary, 'views'>) =>{
                const initialView = 1
                setDiary((prev) => {
                    //입력받은 값에는 views정보가 없으니까 여기서 추같
                    const withViews = {...newDiary, views: initialView}
                    const updatedDiary = [...prev, withViews]
                    updateStorageDiary(updatedDiary)
                    return updatedDiary
                })
            },
            update : (updateId : string, updateDiary : Diary)=>{
                setDiary((prev) => {
                    const targetDiary = prev.find(({id}) => id === updateId)
                    if(!targetDiary) return prev
                    
                    const updatedDiary = prev.map((diary) => (diary.id === updateId ? updateDiary : diary) )
                    updateStorageDiary(updatedDiary)
                    return updatedDiary
                })
            },
        

        }),
    [])
    
    return diaryActions
    }
              

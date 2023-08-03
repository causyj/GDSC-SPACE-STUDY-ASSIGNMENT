import { Diary } from "../interface/diary"

export const DIARY_STORAGE_KEY = 'diary-storage' as const // 일기가 local storage에 저장될때 key값 이름

//Reacord : typescript type // 
export const EMOTION_DATA: Record<
Diary['emotion'],
{
    color: 'red' | 'yellow' | 'green' | 'blue' | 'purple'
    emoji: string
    description: string
}
> = {
awesome: {
    emoji: '😎',
    color: 'yellow',
    description: '최고의 하루였어요',
},
great: {
    emoji: '😃',
    color: 'blue',
    description: '멋진 하루였어요',
},
good: {
    emoji: '😙',
    color: 'green',
    description: '좋은 하루였어요',
},
soso: {
    emoji: '😗',
    color: 'purple',
    description: '괜찮은 하루였어요',
},
bad: {
    emoji: '🤬',
    color: 'red',
    description: '최악의 하루였어요!',
},
}

export const EMOTION_LIST = Object.entries(EMOTION_DATA).map(([key, value]) => {
return {
    ...value,
    emotion: key as Diary['emotion'],
}
})

import React, {createContext, useState} from "react";
import { Diary } from "../interface/diary";



export const DiaryContext = createContext({
    diaryList : Array<Diary>(),
    setDiaryList : (diary: Diary) => {}
});

const DiaryContextProvider = ({children} : any) => {
    const [diaryListProvider, setDiaryListProvider] = useState<Diary[]>([]);
    const setDiaryHandler = (diary : Diary) => {
        setDiaryListProvider([...diaryListProvider, diary]);
    };

    return (
        <DiaryContext.Provider value={{diaryList: diaryListProvider, setDiaryList: setDiaryHandler}}>
            {children}
        </DiaryContext.Provider>
    )


}

export default DiaryContextProvider


/*
const diary : Diaryy[] = [];
    for(var i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if(key){
            const val = localStorage.getItem(key!);
            if(val){
                const data = JSON.parse(val)
                diary.push(data)
                
            }
            
        }
       
}
*/
import { DiaryCard } from "./Card";
//import { Diary } from "../interface/diary";
import { useContext } from "react";
//import { useContext } from "react";
import DiaryContextProvider, { DiaryContext} from "../provider/DiaryContext";
//import { Diary } from "../interface/diary";
export const DiaryList = () => {
    const isExist = localStorage.length > 0
    //const [num, setNum] =useState();
    const {diaryList, setDiaryList} = useContext<any>(DiaryContext);
    console.log("ddhf",diaryList)
    
return(
    <DiaryContextProvider>
        {isExist ? 
        (
        <div>
            {diaryList.map((diaryItem : any) => {
                return <DiaryCard key={diaryItem[0].id} {...diaryItem[0]}/>
        })}
        </div>
        )
        : (<div>일기를 적어보세요</div>)
        }
        
    </DiaryContextProvider>
)}


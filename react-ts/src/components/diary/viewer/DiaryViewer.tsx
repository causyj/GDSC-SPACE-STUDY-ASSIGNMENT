import { Diary } from "../../../interface/diary";
import { DiaryCard } from "./Card";

export const DiaryViewer = ({diary} : {diary : Diary[]}) => {
    const isDaryExists = diary.length > 0
    return(
        <>
            {isDaryExists ? (
                <div className="flex flex-col overflow-y-auto gap-2 w-full max-h-96">
                    {diary.map((props) => {
                        return <DiaryCard key={props.id} {...props}/>
                    })}
                </div>
            ) : (
                <div className="flex items-center justify-center text-gray-400">일기를 적어보세요</div>
            )}
        </>
    )

}
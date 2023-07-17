import { Diary } from "../interface/diary";
import { Link } from '../components/Link';
import DiaryContextProvider, { DiaryContext} from "../provider/DiaryContext";
import { useContext } from "react";



export const DiaryCard = ({date, emotion, id, title, weather} : Omit<Diary, 'content'>) => {
    const {diaryList, setDiaryList} = useContext<any>(DiaryContext);
    
    const year=date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}.${month}.${day}.`
    const emotionsEmoji : Record<Diary['emotion'],string> = {
        awesome: '😎',
        great: '😃',
        good: '😙',
        soso: '😗',
        bad: '🤬',
    }
    const DiaryEmotion = ({ emotion }: { emotion: Diary['emotion'] }) => {
        const emoji = emotionsEmoji[emotion]
        return <div>{emoji}</div>
    }
    const weatherEmoji: Record<Diary['weather'], string> = {
        sunny: '☀️',
        cloud: '☁️',
        rain: '🌧',
        snow: '❄️',
    }
    const WeatherEmotion = ({weather} : {weather : Diary['weather']}) => {

        const emoji = weatherEmoji[weather]
        return <div>{emoji}</div>
    }
    return (
        
    <DiaryContextProvider>
    <Link to={`/detail/${id}` }>
        <div>
            <h1>{title}</h1>
            <div>
                <span>{formattedDate}</span>
                <div>
                    {diaryList.map((diaryItem : any) => {
                        return (
                            <div>
                                <DiaryEmotion emotion={emotion}/>
                               <WeatherEmotion weather={weather} />
                            </div>
                        )
        })}
                </div>
            </div>
        </div>
    </Link>
    </DiaryContextProvider>
    
)}

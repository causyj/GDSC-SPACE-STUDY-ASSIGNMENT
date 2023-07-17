import {  useState, useEffect, useContext } from "react";
import {Link} from '../components/Link';
import { DiaryList } from "../components/DiaryList";
import DiaryContextProvider, { DiaryContext} from "../provider/DiaryContext";
//import {tw, util} from '../styles';

/*
const diartInput = tw.rotary({
    base : {
        padding : 'p-2',
        marginTop : 'mt-4',
        borderRadius : 'rounded-md',
        transition : 'transition'
        ringColor: 'ring-gray-100',

        ':focus' : {
            outlineStyle:'focus:outline-none',
            ringWidth: 'focus:ring-1'
        },
        '::placeholder':{
            color : 'placeholder:text-gray-400',
        },

    },
    header:{
        fontSize : 'text-2xl',
    },
    content:{
        height :' h-full',
        resize : 'resize-none',
    }

})
*/
const WirteDiary = () => {
    const [title, setTitle] = useState('');
    //overload-generic parameter
    const [emotion, setEmotion] = useState('');
    //<Diary['emotion'] | undefined>();
    const [weather, setWeather] = useState('');
    const [content, setContent] = useState('');
    const [filled, setFilled] = useState(false);
    const {diaryList, setDiaryList} = useContext<any>(DiaryContext);
    
    const ClickE= (e : any) => {
        setEmotion(e.target.innerText);
    }
    const ClickW = (v : any) => {
        setWeather(v.target.innerText);
    }
    const reset = () => {
        setTitle('');
        setContent('');
        setEmotion('');
        setWeather('');
    }
    useEffect(() => {
        const check = 
        title.length >1 && emotion != '' && weather != '' && content.length>1;
        setFilled(check)
    },[title,emotion,weather,content])
    
    const SaveDiary = () => {
        
        if(filled===false){
            return;
        }
        const savediary ={
            id: window.crypto.randomUUID(),
            title: title,
            content: content,
            date: new Date(),
            emotion: emotion!,
            weather: weather!,
        }
       
        localStorage.setItem((savediary.id),JSON.stringify(savediary));
        setDiaryList([...diaryList, savediary])
        reset()
    }
    
    return (
       
        <div>
            <div>
                <input 
                    value={title}
                    placeholder="제목을 적어보세요"
                    onChange={(n)=> {setTitle(n.target.value)}}
                    />
            </div>
            
            <div>
                <button onClick={ClickE}>bad</button>
                <button onClick={ClickE}>soso</button>
                <button onClick={ClickE}>good</button>
                <button onClick={ClickE}>great</button>
                <button onClick={ClickE}>awesome</button>
                <p />
                <button onClick={ClickW}>cloud</button>
                <button onClick={ClickW}>rain</button>
                <button onClick={ClickW}>snow</button>
                <button onClick={ClickW}>sunny</button>
            </div>

            <div>
                <textarea
                    value={content}
                    placeholder="오늘 당신의 하루는 어땠나요?"
                    onChange={(c)=> {setContent(c.target.value)}}
                    />
            </div>
            <div >
                <button
                    onClick={SaveDiary}
                >   
                {filled ? "일기를 저장해 보아요" : "일기를 더 자세히 적어볼까요?"}
                
                </button>
            </div>
            
        </div>
   
)}

export default function DiaryHomePage() {
   
    return (
        <DiaryContextProvider>
        <div>
        
                <div>
                    <WirteDiary />
                     <hr />
                    <h1>기록된 일기</h1>
                    <DiaryList />
                    <Link to={`/emotions`}>감정 모아보기</Link>
                </div>
            

        </div>
        </DiaryContextProvider>
    )
}
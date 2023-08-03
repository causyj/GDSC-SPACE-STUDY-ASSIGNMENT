import { useState, useEffect, useRef } from "react";
import { DiaryViewer } from "../components/diary/viewer/DiaryViewer";
import { Link } from "../components/common/Link";
import { List } from "../components/common/List";
import { Diary } from "../interface/diary";
import { tw, util} from '../styles';
import { useDiaryValue } from "../provider/Diary";
import { useStorageDiary } from "../hooks/useStorageDiary";

//제목 input이랑 내용textArea css
const diaryInput = tw.rotary({
    base:{
        padding : 'p-2',
        marginTop : 'mt-4',
        borderRadius : 'rounded-md',

        transition: 'transition',
        ringColor: 'ring-gray-100',

        ':focus':{
            outlineStyle: 'focus:outline-none',
            ringWidth: 'focus:ring-1',
        },
        
        '::placeholder':{
            color : 'placeholder:text-gray-400',
        },
    },
    header:{
        fontSize : 'text-2xl',
    },
    content:{
        height : 'h-full',
        resize : 'resize-none',
    }
})

const DiaryWriter = () => {
    /*state의 type을 지정할때 generics타입으로 지정해줌  https://velog.io/@jjburi/TypeScript-useState%EC%97%90%EC%84%9C-type-%EC%A7%80%EC%A0%95
     when 상태가 null일 수도 있고 아닐 수도 있을때 || 상태의 타입이 까다로운 구조를 가진 객체/배열일 때
    */
    const [title, setTitle] = useState<string>('')
    const [contents, setContents] = useState<string>('')
    const [emotion, setEmotion] = useState<Diary['emotion'] | undefined>()
    const [weather, setWeather] = useState<Diary['weather'] | undefined>()
    
    //DOM요소에 이름을 달아 직접 접근할 수 있음 like 'key' when state로만 해결할 수 없고 DOM을 반드시 직접 건드려야할 때(ex. 특정 input에 focus주기) https://chanhuiseok.github.io/posts/react-7/
    const titleRef = useRef<HTMLInputElement>(null) 
    const { add } = useStorageDiary()
    const [isValid, setIsValid] = useState(false) //왼쪽화면 일기 내용 다 입력되었는가?
    useEffect(() => {
        const isNotVailidDiary =
            emotion === undefined || weather === undefined || title.length<=2 || contents.length <=5

            setIsValid(!isNotVailidDiary)
    
        },[title,contents,emotion,weather])
    
    //일기 저장버튼을 눌렀을때 제목으로 focus 주려고
    useEffect(()=> {
        titleRef.current?.focus() //
    },[])

    //e의 type을 any보단 React.ChangeEvent<> 사용 / chagneEvent 중에 사용할 이벤트와 일치하는 이벤트 선택 https://merrily-code.tistory.com/157
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.target.value)
    }
    const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setContents(e.target.value)
    }
    const handleDiarySave = () => {
        if(isValid === false){
            return
        }
        add({
            id : window.crypto.randomUUID(),
            title : title,
            content : contents,
            date : new Date(),
            emotion : emotion!,
            weather : weather!,

        })
        resetDiary()        
        
        titleRef.current?.focus()
    }
    const resetDiary=() => {
        setTitle('')
        setContents('')
        setEmotion(undefined)
        setWeather(undefined)

    }
    return(
        <div className="flex flex-col gap-4 p-4 rounded-lg bg-white border border-gray-100 w-full h-2/3 min-h-[20rem]">
            <input 
                ref={titleRef}
                value={title}
                autoComplete="off"
                className={diaryInput.class('header')}
                onChange={handleTitleChange}
                placeholder="제목을 적어보세요"
                />
            <div className="flex flex-col gap-2 pt-4">
                <List 
                    list={['bad','soso','good','great','awesome'] as Diary['emotion'][]}
                    wrapper={({ target })=>(
                        <button
                            className={util.button.class({
                                color: emotion === target ? 'green' : 'gray',
                                type : 'tag'
                            })}
                            onClick={()=> setEmotion(target)}
                            >
                            {target}
                        </button>
                    )}
                    
                    />
                <List 
                    list={['cloud','rain','snow','sunny'] as Diary['weather'][]}
                    wrapper={({ target })=>(
                        <button
                            className={util.button.class({
                                color: weather === target ? 'blue' : 'gray',
                                type : 'tag'
                            })}
                            onClick={()=> setWeather(target)}
                            >
                            {target}
                        </button>
                    )}
                    
                    />

            </div>
            <textarea 
                className={diaryInput.class('content')}
                value={contents}
                onChange={handleContentsChange}
                placeholder="오늘의 당신의 하루는 어땠나요?"
                maxLength={1000}
            />
            <button
                className={util.button.class({
                    color : isValid ? 'green' : 'gray',
                    type : 'button',
                })}
                onClick={handleDiarySave}
                disabled={!isValid} // 버튼이 초록새이 되기 전까진 버튼이 비활성화되어있어야 하니까
                >
                {isValid ? '일기를 저장해 보야요' : '일기를 더 자세히 적어볼까요?'}
            </button>



        </div>)
}

export default function DiaryHomePage() {
    
    return ( 
        <div className="flex flex-col items-center justify-center gap-10 h-full md:grid md:grid-rows-1 md:grid-cols-[3fr,2fr] md:w-4/5 lg:w-2/3">
            <DiaryWriter />
            
            <div className="w-full flex flex-col items-start gap-4 p-4 justify-between rounded-lg bg-white border border-gray-100 h-2/3 min-h-[20rem]">
                <h1 className="text-xl mt-5 text-emerald-600">기록된 일기</h1>
                <DiaryViewer diary={useDiaryValue()}/>
                <Link
                    to="/emotions"
                    className={util.button.class({
                        color : 'green',
                        type : 'button',
                    })}
                    >
                    감정 모아보기
                    </Link>
            </div>
        </div>
        )

    
}



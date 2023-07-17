import { useNavigate, useParams } from 'react-router-dom'
import { Diary } from '../../../interface/diary'
import { useDiaryValue } from '../../../provider/Diary'
import { useStorageDiary } from '../../../hooks/useStorageDiary'
import { useEffect } from 'react'
import { dateFormat } from '../../../utils/dateFormat'
import { util } from '../../../styles'
import { Link } from '../../../components/common/Link'
type DiaryDetailPageParams = {
    id: string
}
//현재 페이지의 param을 가져오기
export default function DiaryDetailPage() {
    const { id } = useParams<DiaryDetailPageParams>()

    //useDiaryValue : useContext
    const diary :  Diary | undefined = useDiaryValue().find((diary) => diary.id === id)
    if(diary === undefined) throw Error(`Diary ${id} not found`)

    //함수 내부에 navigate => navigation.navigate(component명, {보내고 싶은 데이터 : 내용})
    const navigate = useNavigate()
    const {remove, update} = useStorageDiary()
    const removeDiary = () => {
        remove(id!)
        navigate('/')
    }//삭제하면 홈화면으로
    useEffect(()=> {
        update(id!, { ...diary, views: diary.views+1})

    },[])

    const {title, content, date, emotion, weather} = diary
    const formattedDate = dateFormat(date, 'full')

    return(
        <div className='w-2/4 h-full py-20 '>
            <div className='flex flex-col gap-4 my-9'>
                 <h1 className="text-4xl font-medium">{title}</h1>  
                 <div className='flex flex-row gap-2'>
                    <div className={util.button.class({
                        color : 'gray',
                        type : 'tag',
                    })}>
                        {formattedDate}
                    </div >
                    <div className={util.button.class({
                        color : 'gray',
                        type : 'tag',
                    })}>
                        {weather}
                    </div>
                    <Link 
                        to={`/emotions/${emotion}`}
                        className={util.button.class({
                            color : 'gray',
                            type : 'tag',
                        })}
                    >{emotion}</Link>
                 </div>
            </div>
            <div className='text-base text-gray-800 h-2/3'>
                {content}
            </div>
            <div className='flex flex-row gap-2 w-full'>
                <Link 
                    to="/"
                    className={util.button.class({
                        color : 'green',
                        type : 'button'
                    })}
                >새로운 일기 작성하기
                </Link>
                <button
                    className={util.button.class({
                        color : 'red',
                        type : 'button'
                    })}
                    onClick={removeDiary}
                    >
                    현재 일기 삭제하기
                </button>
            </div>
        </div>
    )
}

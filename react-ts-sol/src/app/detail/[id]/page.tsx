import { useNavigate, useParams } from 'react-router-dom'
import { useDiaryValue } from '../../../provider/Diary'
import { Diary } from '../../../interface/diary'
import { dateFormat } from '../../../utils'
import { util } from '../../../styles'
import { Link } from '../../../components/common'
import { useStorageDiary } from '../../../hooks/useStorageDiary'
import { useEffect } from 'react'

type DiaryDetailPageParams = {
    id: string
}

export default function DiaryDetailPage() {
    const { id } = useParams<DiaryDetailPageParams>()

    const diary: Diary | undefined = useDiaryValue().find((diary) => diary.id === id)
    if (diary === undefined) throw Error(`Diary ${id} not found`)

    const navigate = useNavigate()
    const { remove, update } = useStorageDiary()
    const removeDiary = () => {
        remove(id!)
        navigate('/')
    }

    useEffect(() => {
        update(id!, { ...diary, views: diary.views + 1 })
    }, [])

    const { title, content, date, emotion, weather } = diary
    const formattedDate = dateFormat(date, 'full')

    return (
        <div className="w-2/4 h-full py-20">
            <div className="flex flex-col gap-4 my-9">
                <h1 className="text-4xl font-medium">{title}</h1>
                <div className="flex flex-row gap-2">
                    <div
                        className={util.button.class({
                            color: 'gray',
                            type: 'tag',
                        })}
                    >
                        {formattedDate}
                    </div>
                    <div
                        className={util.button.class({
                            color: 'gray',
                            type: 'tag',
                        })}
                    >
                        {weather}
                    </div>
                    <Link
                        to={`/emotions/${emotion}`}
                        className={util.button.class({
                            color: 'gray',
                            type: 'tag',
                        })}
                    >
                        {emotion}
                    </Link>
                </div>
            </div>

            <div className="text-base text-gray-800 h-2/3">{content}</div>

            <div className="w-full flex flex-row gap-2">
                <Link
                    to="/"
                    className={util.button.class({
                        color: 'green',
                        type: 'button',
                    })}
                >
                    새로운 일기 작성하기
                </Link>
                <button
                    className={util.button.class({
                        color: 'red',
                        type: 'button',
                    })}
                    onClick={removeDiary}
                >
                    현재 일기 삭제하기
                </button>
            </div>
        </div>
    )
}

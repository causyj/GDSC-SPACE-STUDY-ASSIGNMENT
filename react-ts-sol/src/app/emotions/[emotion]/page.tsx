import { useParams } from 'react-router-dom'
import { useDiaryValue } from '../../../provider/Diary'
import { Emotion, Link } from '../../../components/common'
import { Diary } from '../../../interface/diary'
import { EMOTION_DATA } from '../../../constants'
import { useState } from 'react'
import { util } from '../../../styles'
import { dateFormat } from '../../../utils'
import { useStorageDiary } from '../../../hooks/useStorageDiary'

const DiaryTable = ({
    diary,
    setRemoveSelected,
}: {
    diary: Diary
    setRemoveSelected: React.Dispatch<React.SetStateAction<string[]>>
}) => {
    const { id, date, title, views } = diary
    return (
        <div key={id} className={`flex flex-row items-center justify-between gap-4 w-full ${util.container.class} p-2`}>
            <input
                type="checkbox"
                className="w-4 h-4 accent-gray-50"
                onChange={({ target: { checked } }) => {
                    if (checked) {
                        setRemoveSelected((selected) => [...selected, diary.id])
                    } else {
                        setRemoveSelected((selected) => selected.filter((id) => id !== diary.id))
                    }
                }}
            />
            <Link
                to={`/detail/${id}`}
                className="flex flex-row items-center justify-between gap-2 px-2 w-full hover:bg-gray-100 transition rounded"
            >
                <div>{title}</div>
                <div className="flex flex-row gap-2 justify-center items-center">
                    <div className="text-gray-400">{dateFormat(date)}</div>
                    <div className="text-gray-400">조회수: {views}</div>
                </div>
            </Link>
        </div>
    )
}

type EmotionPageParams = {
    emotion: Diary['emotion']
}
export default function EmotionPage() {
    const { emotion } = useParams<EmotionPageParams>()
    if (emotion === undefined) throw Error(`${emotion} is undefined`)

    const emotionDiary = useDiaryValue().filter((diary) => diary.emotion === emotion)
    const isEmotionDiaryExists = emotionDiary.length > 0
    const { remove } = useStorageDiary()
    const [removeSelected, setRemoveSelected] = useState<string[]>([])
    const isRemoveSelected = removeSelected.length > 0
    const removeSelectedDiary = () => {
        removeSelected.forEach((id) => remove(id))
    }
    return (
        <div className="flex flex-col gap-10 w-full md:w-2/3 items-start">
            <div className="flex flex-row gap-5 items-center justify-center">
                <Emotion emotion={emotion} />
                <h1 className="text-3xl font-medium">{EMOTION_DATA[emotion].description}</h1>
            </div>

            {isEmotionDiaryExists ? (
                <>
                    {emotionDiary.map((diary) => (
                        <DiaryTable key={diary.id} diary={diary} setRemoveSelected={setRemoveSelected} />
                    ))}
                    <button
                        className={util.button.class({
                            color: isRemoveSelected ? 'red' : 'gray',
                            type: 'button',
                        })}
                        disabled={!isRemoveSelected}
                        onClick={removeSelectedDiary}
                    >
                        {isRemoveSelected
                            ? `선택된 ${removeSelected.length}개의 일기를 삭제합니다`
                            : '선택된 일기가 없습니다'}
                    </button>
                </>
            ) : (
                <div className="flex items-center justify-center text-gray-400">아직 적지 않았어요</div>
            )}
        </div>
    )
}

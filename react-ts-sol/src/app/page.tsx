import { useEffect, useRef, useState } from 'react'
import { useDiaryValue } from '../provider/Diary'
import { Diary } from '../interface/diary'
import { Link, List } from '../components/common'
import { DiaryViewer } from '../components/diary'
import { tw, util } from '../styles'
import { useStorageDiary } from '../hooks/useStorageDiary'

const diaryInput = tw.rotary({
    base: {
        padding: 'p-2',
        marginTop: 'mt-4',
        borderRadius: 'rounded-md',

        transition: 'transition',
        ringColor: 'ring-gray-100',

        ':focus': {
            outlineStyle: 'focus:outline-none',
            ringWidth: 'focus:ring-1',
        },
        '::placeholder': {
            color: 'placeholder:text-gray-400',
        },
    },
    header: {
        fontSize: 'text-2xl',
    },
    content: {
        height: 'h-full',
        resize: 'resize-none',
    },
})

const DiaryWriter = () => {
    const [title, setTitle] = useState<string>('')
    const [contents, setContents] = useState<string>('')
    const [emotion, setEmotion] = useState<Diary['emotion'] | undefined>()
    const [weather, setWeather] = useState<Diary['weather'] | undefined>()
    const titleRef = useRef<HTMLInputElement>(null)
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        const isNotValidDiary =
            emotion === undefined || weather === undefined || title.length <= 2 || contents.length <= 5

        setIsValid(!isNotValidDiary)
    }, [title, contents, emotion, weather])

    useEffect(() => {
        titleRef.current?.focus()
    }, [])

    const { add } = useStorageDiary()

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value)
    }

    const handleDiarySave = () => {
        if (isValid === false) {
            return
        }

        add({
            id: window.crypto.randomUUID(),
            title: title,
            content: contents,
            date: new Date(),
            emotion: emotion!,
            weather: weather!,
        })

        resetDiary()

        titleRef.current?.focus()
    }

    const resetDiary = () => {
        setTitle('')
        setContents('')
        setEmotion(undefined)
        setWeather(undefined)
    }

    return (
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
                    list={['bad', 'soso', 'good', 'great', 'awesome'] as Diary['emotion'][]}
                    wrapper={({ target }) => (
                        <button
                            className={util.button.class({
                                color: emotion === target ? 'green' : 'gray',
                                type: 'tag',
                            })}
                            onClick={() => setEmotion(target)}
                        >
                            {target}
                        </button>
                    )}
                />
                <List
                    list={['cloud', 'rain', 'snow', 'sunny'] as Diary['weather'][]}
                    wrapper={({ target }) => (
                        <button
                            className={util.button.class({
                                color: weather === target ? 'blue' : 'gray',
                                type: 'tag',
                            })}
                            onClick={() => setWeather(target)}
                        >
                            {target}
                        </button>
                    )}
                />
            </div>

            <textarea
                className={diaryInput.class('content')}
                onChange={handleContentsChange}
                placeholder="오늘 당신의 하루는 어땠나요?"
                maxLength={1000}
                value={contents}
            />

            <button
                className={util.button.class({
                    color: isValid ? 'green' : 'gray',
                    type: 'button',
                })}
                onClick={handleDiarySave}
                disabled={!isValid}
            >
                {isValid ? '일기를 저장해 보아요' : '일기를 더 자세히 적어볼까요?'}
            </button>
        </div>
    )
}

export default function DiaryHomePage() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 h-full md:grid md:grid-rows-1 md:grid-cols-[3fr,2fr] md:w-4/5 lg:w-2/3">
            <DiaryWriter />

            <div className="w-full flex flex-col items-start gap-4 p-4 justify-between rounded-lg bg-white border border-gray-100 h-2/3 min-h-[20rem]">
                <h1 className="text-xl mt-5 text-emerald-600">기록된 일기</h1>

                <DiaryViewer diary={useDiaryValue()} />

                <Link
                    to="/emotions"
                    className={util.button.class({
                        color: 'green',
                        type: 'button',
                    })}
                >
                    감정 모아보기
                </Link>
            </div>
        </div>
    )
}

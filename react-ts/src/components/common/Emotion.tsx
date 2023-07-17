import { Diary } from '../../interface/diary'
import { tw } from '../../styles'
import { EMOTION_DATA } from '../../constants'
import React from 'react'
const emotionIcon = tw.rotary({
    base: {
        display: 'flex',
        alignItems: 'items-center',
        justifyContent: 'justify-center',
        width: 'w-24',
        height: 'h-24',
        minWidth: 'min-w-[6rem]',
        minHeight: 'min-h-[6rem]',
        borderRadius: 'rounded-2xl',
        fontSize: 'text-6xl',
        transition: 'transition',
        userSelect: 'select-none',
        borderColor: 'border-transparent',
        borderWidth: 'border',
        '@group': {
            ':hover': {
                boxShadow: 'group-hover:shadow-inner',
            },
        },
    },
    green: {
        backgroundColor: 'bg-green-50',
        borderColor: 'border-green-100',
        '@group': {
            ':hover': {
                backgroundColor: 'group-hover:bg-green-100',
                borderColor: 'group-hover:border-green-200',
            },
        },
    },
    blue: {
        backgroundColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        '@group': {
            ':hover': {
                backgroundColor: 'group-hover:bg-blue-100',
                borderColor: 'group-hover:border-blue-200',
            },
        },
    },
    yellow: {
        backgroundColor: 'bg-yellow-50',
        borderColor: 'border-yellow-100',
        '@group': {
            ':hover': {
                backgroundColor: 'group-hover:bg-yellow-100',
                borderColor: 'group-hover:border-yellow-200',
            },
        },
    },
    red: {
        backgroundColor: 'bg-red-50',
        borderColor: 'border-red-100',
        '@group': {
            ':hover': {
                backgroundColor: 'group-hover:bg-red-100',
                borderColor: 'group-hover:border-red-200',
            },
        },
    },
    purple: {
        backgroundColor: 'bg-purple-50',
        borderColor: 'border-purple-100',
        '@group': {
            ':hover': {
                backgroundColor: 'group-hover:bg-purple-100',
                borderColor: 'group-hover:border-purple-200',
            },
        },
    },
})

interface EmotionProps {
    emotion: Diary['emotion']
}

export const Emotion = ({ emotion }: EmotionProps) => {
    const { color, emoji } = EMOTION_DATA[emotion]
    return (
        <div className={emotionIcon.class(color)}>
            {emoji}
        </div>
        )
}

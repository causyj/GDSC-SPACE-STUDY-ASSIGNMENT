import { Link } from "../../components/common/Link"
import { EMOTION_LIST } from "../../constants"
import { Diary } from "../../interface/diary"
import { tw } from "../../styles"
import { GetVariants } from "tailwindest"

const emotionLinkCard = tw.style({
    display : 'flex',
    flexDirection : 'flex-row',
    alignItems : 'items-center',
    justifyContent : 'justify-between',
    gap : 'gap-4',
    width : 'w-full',
    padding : 'p-4',
    cursor : 'cursor-pointer',
    borderRadius : 'rounded-3xl',
    borderWidth : 'border',
    borderColor : 'border-gray-50',
    ':hover' : {
        borderColor : 'hover:border-transparent',
        boxShadow : 'hover:shadow-2xl',
        transformScale : 'hover:scale-105'
    },
    ':active' : {
      transformScale : 'active:-scale-100',
    },
    transition : 'transition-all ease-out',
    transitionDuration : 'duration-150',
})
const emotionIcon = tw.rotary({
    base : {
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
// props타입을 선언할 떄 : type || interface(확장 가능)
interface EmotionLinkCardProps{
    emotion : Diary['emotion']
    emoji : string
    description : string
    color : GetVariants<typeof emotionIcon>
}
const EmotionLinkCard = ({color, emoji, emotion, description} : EmotionLinkCardProps) => {
    const captitalizedEmotion = [...emotion].map((c,i)=>(i===0 ? c.toUpperCase(): c)).join('')
    return (
        <Link to={`/emotions/${emotion}`} className={`${emotionLinkCard.class} group`}>
            <div className={emotionIcon.class(color)}>{emoji}</div>
                <div className="flex flex-col items-start justify-center w-full">
                    <h1 className="text-2xl font-medium">{captitalizedEmotion}</h1>
                    <span className="text-gray-400">{description}</span>
                </div>
            
        </Link>
    )
}
export default function EmotionLinkPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-start justify-center gap-3">
                <h1 className="text-3xl text-gray-800 font-semibold">감정 상자</h1>
                <span className="tex-gray-400">나만의 감정을 돌아보고 생각에 잠겨보아요 :)</span>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-5 items-start justify-center">
                {EMOTION_LIST.map((emotion) => (
                    <EmotionLinkCard key={emotion.description} {...emotion} />
                ))}
            </div>
        </div>)
}

import { useParams } from 'react-router-dom'

type EmotionPageParams = {
    emotion: string
}
export default function EmotionPage() {
    const { emotion } = useParams<EmotionPageParams>()
    return <>{emotion} Emotion page </>
}

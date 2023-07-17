import { useParams } from 'react-router-dom'


type DiaryDetailPageParams = {
    id: string
}

export default function DiaryDetailPage() {
    const { id } = useParams<DiaryDetailPageParams>()
    return <>Diary details {id}</>
}

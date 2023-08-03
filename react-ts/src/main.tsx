import './tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { RootLayout } from './app/layout'
import { DiaryRouter } from './router'
import { DiaryProvider } from './provider/Diary'

ReactDOM.createRoot(document.getElementById('root')!).render(
    //React.StrictMode : App내의 잠제적인 문제를 알아내기 위한 도구 https://ko.legacy.reactjs.org/docs/strict-mode.html
        // DiaryProvider : 전역 배열 DiaryValeContext & DiaryUpdateContext를 사용할 수 있게 함 using Context
            //RootLayout : 화면 전체 레이아웃
                //DiaryRouter : App (화면)의 전체 구성 (페이지 주소에 따라 화면이 어떻게 구성되는지)
    <React.StrictMode> 
        <DiaryProvider>
            <RootLayout>
                <DiaryRouter />
            </RootLayout>
        </DiaryProvider>
    </React.StrictMode>
)

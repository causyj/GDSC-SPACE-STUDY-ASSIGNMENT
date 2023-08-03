//화면 전체 레이아웃 
export const RootLayout = ({ children }: React.PropsWithChildren) => {
    return <main 
    className="min-h-screen max-h-screen h-screen w-full bg-white flex items-center justify-center">
        {children}
        </main>
}

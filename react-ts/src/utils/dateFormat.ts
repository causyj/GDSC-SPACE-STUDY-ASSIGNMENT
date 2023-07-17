export const dateFormat = (date : Date | string, dateStyle? : Intl.DateTimeFormatOptions['dateStyle']) => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date

    const formattedDate = Intl.DateTimeFormat('ko-KR',{dateStyle}).format(parsedDate)

    return formattedDate


}
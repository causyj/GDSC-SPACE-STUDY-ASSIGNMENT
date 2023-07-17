export const localStorage = {
    set : <T>(id: string, value : T) => {
        const stringifyValue = JSON.stringify(value)
        window.localStorage.setItem(id, stringifyValue)
    },

    get : <T>(id: string): T | null => {
        const value = window.localStorage.getItem(id)
        if(value){
            return JSON.parse(value) as T
        }
        return null
    },
    reset : () => window.localStorage.clear(),
}
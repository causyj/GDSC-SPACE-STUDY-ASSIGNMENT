type SelectorProps<T> = T extends unknown[] 
    ? {list : T; wrapper : (wrapperProps: {target:T[number] }) => React.ReactNode} : never

export function List<T extends React.Key | null | undefined>({list,wrapper}:SelectorProps<T[]>){
    return(
        <div className="flex flex-row gap-1">
            {list.map((target)=> (
                <div key={target}>{wrapper({target})}</div>
            ))}
        </div>
    )
}
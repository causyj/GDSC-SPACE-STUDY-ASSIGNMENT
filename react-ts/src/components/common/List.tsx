//React.ReactNode : children 속성의 타입으로 가장 많이 사용하는 타입으로, jsx 내에서 사용할 수 있느 ㄴ모든 요소의 타입을 의미 /string, null, undefined 등을 포함하는 가장 넓은 의미

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
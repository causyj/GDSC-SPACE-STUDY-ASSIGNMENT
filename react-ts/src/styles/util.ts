import {tw} from '.'

export const util = {
    container : tw.style({
        borderWidth : 'border',
        borderColor : 'border-gray-100',
        borderRadius : 'rounded-lg',

    }),
    button : tw.variants({
        base : {
            display : 'flex',
            alignItems : 'items-center',
            justifyContent : 'justify-center',

            borderRadius : 'rounded-lg',
            borderWidth : 'border',
            borderColor : 'border-transparent',

            ':active' : {
                transformTranslateY : 'active:translate-y-[1px]',
            },

            width: 'w-full',
            padding: 'p-2',
            cursor: 'cursor-pointer',
            transition: 'transition-colors ease-in',

        },
        variants : {
            color:{
                gray:{
                    backgroundColor : 'bg-gray-100',
                    color:'text-gray-400',
                    ':hover':{
                        borderColor : 'hover:border-gray-600',
                        color: 'hover:text-gray-600',
                    },
                },
                green:{
                    backgroundColor : 'bg-emerald-100',
                    color:'text-emerald-600',
                    ':hover':{
                        borderColor : 'hover:border-emerald-600',
                        color: 'hover:text-emerald-600',
                    },
                },
                blue:{
                    backgroundColor : 'bg-blue-100',
                    color:'text-blue-600',
                    ':hover':{
                        borderColor : 'hover:border-blue-600',
                        color: 'hover:text-blue-600',
                    },
                },
                red:{
                    backgroundColor : 'bg-red-100',
                    color:'text-red-600',
                    ':hover':{
                        borderColor : 'hover:border-red-600',
                        color: 'hover:text-red-600',
                    },
                },
            },
            type:{
                tag:{
                    paddingX: 'px-1.5',
                    paddingY: 'py-0.5',
                    fontSize: 'text-sm',
                },
                button : {
                    padding : 'p-2',

                }
            }
        }
    })
}as const
'use client';

import React, { useEffect, useState } from 'react'

type Props = {
    inputData: Record<string, unknown> |  unknown[] | string,
    column: string,
    disabled: boolean
}


const InputField:React.FC<Props> = ({ disabled, column, inputData }) => {

    const [data, setData] = useState({});

    useEffect(() => {
        if (!inputData && !column) return;

        const columnData = {
            [column]: JSON.stringify(inputData)
        }
        setData(columnData);
    }, [])

    if (!inputData && !column) return;

    // console.log(inputData)

    // console.log(data)

    // switch (typeof inputData){
    //     case ('string'):
    //         setData()

    //     case 'boolean':
    //         return <input value={JSON.stringify(inputData)} className='w-full h-full border-0 outline-none focus:outline-none ring-0 focus:ring-0'/>
            

    //     case 'object':
    //         return <input value={JSON.stringify(inputData)} className='w-full h-full border-0 outline-none focus:outline-none ring-0 focus:ring-0'/>

    //     default:
    //         return undefined;
    // }

    // const t = 'medium: 12,large: 18,family: 25'

    // const result = Object.fromEntries(
    // t
    //     .split(",")                                   // split each pair
    //     .map(item => item.trim())                     // remove extra spaces
    //     .map(item => item.split(":"))                 // split key and value
    //     .map(([k, v]) => [k.trim(), Number(v.trim())]) // clean + convert to number
    // );

    // console.log(result);

    // return (
    //     <div>

    //     </div>
    // )

    console.log(data)

    return (
        <input value={data[column]}
               disabled={disabled}
               className='w-full h-full border-0 outline-none focus:outline-none ring-0 focus:ring-0'
               onChange={(e) => setData(e.target.value)} />
    )
}

export default InputField;

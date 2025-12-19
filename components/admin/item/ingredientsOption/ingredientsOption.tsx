'use client';

import React from "react";
import { IngredientsOptionUnionType } from '../item';

type Props = {
    options: IngredientsOptionUnionType[],
    updateHandler: (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    addNewOptions: () => void,
    removeOption: (idx:number) => void
}

const IngredientsOption:React.FC<Props> = ({ options, updateHandler, addNewOptions, removeOption }) => {
    let ingredientsOption;

    if (options.length){
        ingredientsOption = options.map((itm, idx) => <span key={idx} className='flex justify-start align-start'>
            <div className="flex flex-col justify-center align-start">
                <label className='block w-[180px] capitalize'>Option {idx+1}</label>
                <input type="text"
                        data-index={idx}
                        placeholder="Option name"
                        value={itm.optionName}
                        name='optionName'
                        onChange={updateHandler}
                        className="w-[180px] border border-gray-300 pl-2" />
            </div>
            <textarea className='w-[400px] border border-gray-300 pl-4 ml-4 disabled:opacity-50'
                      data-index={idx}
                      placeholder="Options ex: 'chicken', 'beef', 'pepper'"
                      value={String(itm.options)}
                      name='options'
                      onChange={updateHandler} />
            <button className="w-[180px] h-[40px] border border-red-500 bg-red-500 text-white ml-4 hover:bg-red-700"
                    onClick={() => removeOption(idx)}
                      >Remove option
            </button>
        </span>
        )
    }

    return (
        <section className="flex flex-col justify-center align-items">
            <div className="flex flex-col justify-centern align-items gap-[20px]">
                {ingredientsOption}
            </div>
            <button className="w-[180px] h-[40px] my-5 bg-gray-500 text-white border border-gray-300"
                    onClick={addNewOptions}>
                    Add Option
            </button>
        </section>
    )
}

export default IngredientsOption;

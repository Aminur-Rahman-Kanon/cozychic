'use client';

import React from "react";
import IngredientsOption from "../ingredientsOption";

type Props = {
    item: IngredientsOption
}

const AddIngredientsOption:React.FC<Props> = ({ item }) => {

    return (
        <section className="flex justify-content align-items">
            <div className=''>
                <label className="block w-[150px] capitalize">New Option</label>
                <input type="text"
                        name="optionName"
                        value={item.optionName}
                        className="w-[150px] border boder-gray-300 pl-4"
                         />
            </div>
            <textarea className="w-[450px] border border-gray-300 "/>
        </section>
    )
}

export default AddIngredientsOption;

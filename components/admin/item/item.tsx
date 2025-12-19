'use client';

import React, { useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import isEqual from 'lodash.isequal';
import { stringToObject, isValidIngredientOption, objectToText } from '@/app/utilities/client/utilities';
import { ToastContainer, toast } from 'react-toastify';
import IngredientsOption from './ingredientsOption/ingredientsOption';
import { IngredientsOption as PrismaIngredientsOption } from '@prisma/client';

type SchemaType = Prisma.ItemGetPayload<{
    include: {
        ingredientsOption: true,
    }
}>

export type IngredientsOptionType = {
    id?: string,
    optionName: string,
    options: string[],
    itemId: string

}

export type IngredientsOptionUnionType = | PrismaIngredientsOption | IngredientsOptionType;

type MultiPriceObj = Record<string, number>;

type ItemType = Omit<SchemaType, "multiPrice"> & {
    multiPrice: string | MultiPriceObj | null,
}

type Props = {
    items: SchemaType,
    idx: number
}

//reusuable tailwind utility class name
const labelClassName = 'block w-[180px] capitalize';
const inputClassName = 'w-[400px] border boder-gray-300 pl-4 ml-4';
const selectClassName = 'w-[400px] border boder-gray-300 pl-4 ml-4';
const textareaClassName = 'w-[400px] border border-gray-300 pl-4 ml-4';

const Item:React.FC<Props> = ({ items, idx }) => {

    const [item, setItem] = useState<ItemType | null>(null);
    const [copyItem, setCopyItem] = useState<ItemType | null>(null);

    const [newIngredientsOptions, setNewIngredientsOptions] = useState<IngredientsOptionType[] | []>([])
    
    const [allOptions, setAllOptions] = useState<IngredientsOptionUnionType[] | []>([])
    
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
    
    //store item to 2 different state to detect any data changes
    //change the multiPrice type from JSON to string
    useEffect(() => {
        const item = JSON.parse(JSON.stringify(items));
        
        if (item.multiPrice){
            const stringValue = objectToText(item.multiPrice);
            if (stringValue){
                item.multiPrice = stringValue;
            }
        }
        
        setItem(item);
        setCopyItem(item);
    }, [])
    
    //merge the item ingredients and new ingredients to a new array
    useEffect(() => {
        const allIngredientsOption: IngredientsOptionUnionType[] = [
            ...(item?.ingredientsOption ?? []),
            ...newIngredientsOptions
        ]

        setAllOptions(allIngredientsOption);
    }, [item, newIngredientsOptions])

    //conditionaly disable/enable the submit button
    useEffect(() => {
        const mutedItem = {
            ...item,
            ingredientsOption: allOptions
        }

        const validIngredientsOption = allOptions.every(opt => isValidIngredientOption(opt));
        const isChanged = isEqual(mutedItem, copyItem);
        
        if (!isChanged){
            if (validIngredientsOption){
                setBtnDisabled(false);
            }
            else {
                setBtnDisabled(true);
            }
        }
        else {
            setBtnDisabled(true);
        }
    }, [item, allOptions])

    //input handler for multiple types
    const inputHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (!name) return;

        setItem(prev => prev ? {
            ...prev,
            [name]: value
        } : prev)
    }

    //boolean input handler
    const booleanInputHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        const { name, value } = e.target;

        if (!name) return;

        setItem(prev => prev ? {
            ...prev,
            [name]: value === "1" ? true : false
        } : prev)
    }
    
    //handles ingredients option entries
    const ingredientsOptionHandler = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault();
        
        const { name, value, dataset: { index } } = e.target;

        setAllOptions(prev => {
            if (prev){
                return prev.map((itm, idx) => {
                    if (String(idx) === index) {
                        return {
                            ...itm,
                            [name]: value
                        }
                    }
                    else {
                        return itm;
                    }
                })
            }
            else {
                return prev;
            }
        })
    }

    //add new ingredient option object
    const addNewOptionHandler = () => {
        if (!item?.id) return;

        const newOption:IngredientsOptionType = {
            optionName: '',
            options: [],
            itemId: item?.id
        }

        setAllOptions(prev => [...prev, newOption]);
    }

    //option remove handler
    const optionRemoveHandler = (index:number) => {
        const options = [...allOptions];
        options.splice(index, 1);

        setAllOptions(options);
    }

    //submit update
    const submitHandler = async () => {
        if (btnDisabled) return;

        try {
            //handle multiPrice object
            if (item?.isMultiPrice){
                const multiPriceObj = stringToObject(item?.multiPrice);
                if (multiPriceObj){
                    item.multiPrice = multiPriceObj
                }
            }
            else {
                if (item)
                item.multiPrice = null;
            }

            await fetch('/api/items', {
                method: "PUT",
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({ item, ingredientsOption: allOptions })
            })

            return toast.success(`${item?.name} updated`);
        } catch (error) {
            toast.error('update failed');
            throw new Error(error as string);
        }
    }

    return item &&
        <>
            <ToastContainer />
            <div className='w-full flex flex-col justify-center align-items gap-[15px]'>
                <h1 className='text-lg font-bold mb-[10px]'>{`${idx+1}. ${items.name.toUpperCase()}`}</h1>
                <span className='flex justify-start align-items'>
                    <label htmlFor='id'
                        className={labelClassName}>
                            Id: 
                    </label>
                    <input type='text'
                        name='id'
                        disabled
                        value={item.id}
                        className={inputClassName} />
                </span>
                <span className='flex justify-start align-items'>
                    <label htmlFor='categoryId'
                        className={labelClassName}>
                        Category Id: 
                    </label>
                    <input type='text'
                        name='categoryId'
                        value={item.categoryId}
                        disabled
                        className={inputClassName} />
                </span>
                <span className='flex justify-start align-items'>
                    <label htmlFor='isActive'
                        className={labelClassName}>
                            Active: 
                    </label>
                    <select value={item.active ? 1 : 0}
                            name='active'
                            onChange={booleanInputHandler}
                            className={selectClassName}>
                        <option disabled>Please Select</option>
                        <option value={1}>True</option>
                        <option value={0}>False</option>
                    </select>
                </span>
                <span className='flex justify-start align-items'>
                    <label htmlFor='name'
                        className={labelClassName}>
                            Name: 
                    </label>
                    <input type='text'
                        name='name'
                        value={item.name}
                        onChange={inputHandler}
                        className={inputClassName} />
                </span>
                <span className='flex justify-start align-items'>
                    <label htmlFor='slug'
                        className={labelClassName}>
                            Slug: 
                    </label>
                    <input type='text'
                        name='slug'
                        value={item.slug}
                        onChange={inputHandler}
                        className={inputClassName} />
                </span>
                <span className='flex justify-start align-items'>
                    <label htmlFor='tags'
                        className={labelClassName}>
                            Tags: 
                    </label>
                    <input type='text'
                        name='tags'
                        value={item.tags ?? ''}
                        onChange={inputHandler}
                        className={inputClassName} />
                </span>
                <span className='flex justify-start align-items'>
                    <label htmlFor='description'
                        className={labelClassName}>
                            Description: 
                    </label>
                    <input type='text'
                        name='description'
                        value={item.description ?? ''}
                        onChange={inputHandler}
                        className={inputClassName} />
                </span>
                <IngredientsOption options={allOptions}
                                   updateHandler={ingredientsOptionHandler}
                                   addNewOptions={addNewOptionHandler}
                                   removeOption={optionRemoveHandler} />

                <span className='flex justify-start align-items'>
                    <label htmlFor='basePrice'
                        className={labelClassName}>
                            Base Price: 
                    </label>
                    <input type='number'
                        name='basePrice'
                        value={item.basePrice}
                        onChange={inputHandler}
                        className={inputClassName} />
                </span>
                <span className='flex justify-start align-items'>
                    <label htmlFor='isMultiPrice'
                        className={labelClassName}>
                            Multiple Price ? : 
                    </label>
                    <select defaultValue={item.isMultiPrice ? 1 : 0}
                            name='isMultiPrice'
                            onChange={booleanInputHandler}
                            className={selectClassName} >
                        <option disabled>Please Select</option>
                        <option value={1}>True</option>
                        <option value={0}>False</option>
                    </select>
                </span>
                <span className='flex justify-start align-items'>
                    <label htmlFor='multiPrice'
                        className={labelClassName}>
                            Multiple Price: 
                    </label>
                    <textarea name='multiPrice'
                        value={typeof item.multiPrice === 'string' ? item.multiPrice : ''}
                        placeholder='ex: small: 10, medium: 15, large: 20'
                        onChange={inputHandler}
                        disabled={!item.isMultiPrice}
                        className={textareaClassName} />
                </span>
                <span className='flex justify-start align-items'>
                    <label htmlFor='isPopular'
                        className={labelClassName}>
                            Popular: 
                    </label>
                    <select defaultValue={item.isPopular ? 1 : 0}
                            name='isPopular'
                            onChange={booleanInputHandler}
                            className={selectClassName} >
                        <option disabled>Please Select</option>
                        <option value={1}>True</option>
                        <option value={0}>False</option>
                    </select>
                </span>
                <span className='flex justify-start align-items'>
                    <label htmlFor='isSpecial'
                        className={labelClassName}>
                            Special: 
                    </label>
                    <select defaultValue={item.isSpecial ? 1 : 0}
                            name='isSpecial'
                            onChange={booleanInputHandler}
                            className={selectClassName} >
                        <option disabled>Please Select</option>
                        <option value={1}>True</option>
                        <option value={0}>False</option>
                    </select>
                </span>
                <span className='flex justify-start align-items'>
                    <label htmlFor='imageUrl'
                        className={labelClassName}>
                            Image Url: 
                    </label>
                    <input type='text'
                        name='imageUrl'
                        value={item.imageUrl ?? ''}
                        onChange={inputHandler}
                        className={inputClassName} />
                </span>
                <button className='w-[600px] h-[40px] my-5 border border-green-500 bg-green-500 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={btnDisabled}
                        onClick={submitHandler}>
                    Update
                </button>
            </div>
        </>
}



export default Item;

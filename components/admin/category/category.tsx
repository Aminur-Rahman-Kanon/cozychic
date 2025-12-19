'use client';

import React, { useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import isEqual from 'lodash.isequal';
import { ToastContainer, toast } from 'react-toastify';

type Category = Prisma.CategoryGetPayload<{
    include: {
        items: true
    }
}>

type Props = {
    category: Category
}

const Category:React.FC<Props> = ({ category }) => {

    const [data, setData] = useState<Category | null>(null);
    const [copiedData, setCopiedData] = useState<Category | null>(null);
    const [buttonActive, setButtonActive] = useState<boolean>(false);

    //store item data in 2 different state so it can be compared to detect any changes in data
    useEffect(() => {
        if (category){
            const newData = JSON.parse(JSON.stringify(category));
            setData(newData);
            setCopiedData(newData);
        }
    }, [])

    //input Handler
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (!name) return;

        if (name === 'active'){
            console.log(typeof value, Boolean(value));
            return setData(prev => prev ? {
                ...prev,
                [name]: value === "1" ? true : false
            } : prev)
        }

        if (name === 'sortOrder') {
            return setData(prev => prev ? {
                ...prev,
                [name]: Number(value)
            } : prev)
        }

        else {
            return setData(prev => prev ? {
                ...prev,
                [name]: value
            } : prev)
        }
    }

    //detect changes between the prev and updated data and trigger the disablities of submit button
    useEffect(() => {
        setButtonActive(!isEqual(data, copiedData));
    }, [data, copiedData]);

    //process and send data to backend
    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!data) return;
        
        try {
            const response = await fetch('/api/categories', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            return toast.success(`${data.name.toUpperCase()} has been updated!`)
        } catch (error) {
            console.error(error);
            return toast.error(`${data.name.toUpperCase()} updated failed!`)
        }
    }

    if (!data) return;

    return  (
        <>
            <ToastContainer />
            <div key={data.id} className='w-full flex justify-center align-items'>
                <input name='id'
                        id='id'
                        type='text'
                        value={data?.id ?? ''}
                        disabled
                        className='w-[170px] border border-gray-300 p-1 capitalize' />

                <input name='name'
                        id='name'
                        type='text'
                        value={data?.name ?? ''}
                        onChange={inputHandler}
                        className='w-[170px] border border-gray-300 p-1 capitalize' />
                
                <input name='slug'
                        id='slug'
                        type='text'
                        value={data?.slug ?? ''}
                        onChange={inputHandler}
                        className='w-[170px] border border-gray-300 p-1 capitalize' />
                
                <input name='description'
                        id='description'
                        type='text'
                        value={data?.description ?? ''}
                        onChange={inputHandler}
                        className='w-[170px] border border-gray-300 p-1 capitalize' />

                <select name='active'
                        id='active'
                        defaultValue={data.active ? 1 : 0}
                        onChange={inputHandler}
                        className='w-[170px] border border-gray-300 p-1 capitalize bg-white'>
                    <option disabled>Please Select</option>
                    <option value={1}>True</option>
                    <option value={0}>False</option>
                </select>

                <input type='number'
                        name='sortOrder'
                        id='sortOrder'
                        value={data?.sortOrder ?? 0}
                        onChange={inputHandler}
                        className='w-[170px] border border-gray-300 p-1 capitalize' />

                <div className='w-[170px] border border-gray-300 p-1'>
                    <Link href={`/admin/categories/items/${data.name}`}
                            className='block w-full text-sm text-blue-500'
                            >Items
                    </Link>
                </div>

                <div className='w-[170px]'>
                    <button disabled={!buttonActive}
                            onClick={handleSubmit}
                            className="w-[170px] h-[30px] bg-green-500 text-sm capitalize text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >Update
                    </button>
                </div>
            </div>
        </>
    )
}

export default Category;

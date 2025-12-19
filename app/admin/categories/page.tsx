import React from 'react';
import { prisma } from '@/lib/prisma';
import Category from '@/components/admin/category/category';

const Page = async () => {
    const categories = await prisma.category.findMany({
        include: {
            items: {
                include: {
                    ingredientsOption: true
                }
            }
        }
    });

    const firstItem = Object.keys(categories[0]);
    firstItem.push('action');

    const labels = firstItem && firstItem.map(lbl => (
        <span key={lbl} className='w-[170px] h-[30px] border border-gray-300 p-1 text-sm capitalize'>
            {lbl}
        </span>
    ));

    return categories && (
        <div className='w-full m-auto flex flex-col justify-center items-center'>
            <h1 className='text-large font-bold text-black m-auto mb-[20px]'>Categories</h1>
            <section className='w-full p-3 flex flex-col justify-start align-start overflow-x-auto'>
                <div className='min-w-max flex justify-center'>
                    {labels}
                </div>
                <div className='min-w-max flex flex-col justify-start align-start'>
                    {categories.map(cat => (
                        <Category key={cat.id} category={cat} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Page;
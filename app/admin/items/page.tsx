import React from 'react'
import { prisma } from '@/lib/prisma';
import Category from '@/components/admin/category/category';

const Page = async () => {
    //lets find the relational fields to include in search
    // const relationalFields = getRelationIncludes('Item');

    const items = await prisma.category.findMany({
        where: { active: true },
        include: {
            items: {
                include: {
                    ingredientsOption: true
                }
            }
        }
    });  

    return (
        <div className='w-full'>
            {/* <Category category={items} /> */}
        </div>
    )
}

export default Page;

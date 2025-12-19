import React from 'react';
import { prisma } from '@/lib/prisma';
import Item from '@/components/admin/item/item';

type Props = {
    params: {
        slug: string
    }
}

const Page:React.FC<Props> = async ({ params }) => {

    const { slug } = params;

    const items = await prisma.item.findMany({
        where: {
            category: {
                name: slug
            }
        },
        include: {
            ingredientsOption: true,
        }
    })

    return items.length ? <div className='w-full flex flex-col justify-center align-item gap-[50px]'>
        {
            items.map((itm, idx) => <Item key={itm.id} idx={idx} items={itm} />)
        }
    </div>
    :
    <div>
        No items
        {/*add addItem links*/}
    </div>
}

export default Page;

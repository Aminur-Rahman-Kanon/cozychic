import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT (req: Request) {
    const body = await req.json();
    
    const { item, ingredientsOption } = body;

    try {
        const isItem = await prisma.item.findUnique({
            where: {
                id: item?.id
            }
        })

        if (!isItem) return NextResponse.json(
            { error: "item not found" },
            { status: 404 }
        )

        //update
        await prisma.item.update({
            where: {
                id: item.id
            },
            data: {
                name: item.name,
                slug: item.slug,
                tags: item.tags,
                description: item.description,
                category: item.category,
                basePrice: item.basePrice,
                isMultiPrice: item.isMultiPrice,
                multiPrice: item.multiPrice,
                ingredientsOption: {
                    deleteMany: {},
                    create: ingredientsOption.map(opt => ({
                        optionName: opt.optionName,
                        options: opt.options
                    }))
                },
                imageUrl: item.imageUrl,
                active: item.active,
                isPopular: item.isPopular,
                isSpecial: item.isSpecial
            }
        })

        return NextResponse.json(
            { status: 200 }
        )
        
    } catch (error) {
        return NextResponse.json(
            {error: error},
            { status:  500 }
        )
    }
}

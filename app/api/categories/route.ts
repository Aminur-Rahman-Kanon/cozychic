import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//fetch Categories from database
export async function GET() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(categories);
}

//create new Categories
export async function POST(request: Request) {
  const body = await request.json();
  const { name, slug, description } = body;

  if (!name || !slug) {
    return NextResponse.json(
      { error: "Name and slug are required" },
      { status: 400 }
    );
  }

  const category = await prisma.category.create({
    data: { name, slug, description },
  });

  return NextResponse.json(category, { status: 201 });
}

//update Categories
export async function PUT(req: Request) {
  const data = await req.json();
  const { id, name, slug, description, active, sortOrder } = data;

  if (!data) {
    return NextResponse.json({
      status: 'data not provided',
    })
  }

  try {
    const item = await prisma.category.findUnique({
      where: {
        id: id
      }
    })

    if (!item) {
      return NextResponse.json({
        status: 'no item found'
      })
    }

    await prisma.category.update({
      where: {
        id: id
      },
      data: {
        name, slug, description, active, sortOrder
      }
    })

    return NextResponse.json({
      status: 'data updated'
    })
    
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ status: 'success' })
}
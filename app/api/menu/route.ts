import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    include: {
      items: {
        where: { active: true },
        orderBy: { name: "asc" },
      },
    },
  });
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, slug, description, basePrice, categoryId } = body;

  if (!name || !slug || !basePrice || !categoryId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const item = await prisma.item.create({
    data: {
      name,
      slug,
      description,
      basePrice: Number(basePrice),
      categoryId,
    },
  });

  return NextResponse.json(item, { status: 201 });
}

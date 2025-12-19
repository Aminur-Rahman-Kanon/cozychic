import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clearScreenDown } from "readline";

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
    take: 50,
  });
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const body = await request.json();

  const {
    type,
    name,
    phone,
    email,
    address,
    notes,
    items,
  }: {
    type: string;
    name: string;
    phone: string;
    email?: string;
    address?: string;
    notes?: string;
    items: {
      itemId: string;
      name: string;
      quantity: number;
      size: string,
      basePrice: number;
      subTotal: number,
      notes?: string;
      addOns?: string;
    }[];
  } = body;

  if (!type || !name || !phone || !items || items.length === 0) {
    return NextResponse.json(
      { error: "Missing fields or empty cart" },
      { status: 400 }
    );
  }

  const total = items.reduce((sum, i) => sum + i.basePrice, 0);

  const order = await prisma.order.create({
    data: {
      type,
      status: "NEW",
      name,
      phone,
      email,
      address,
      notes,
      total,
      items: {
        create: items.map((i) => ({
          itemId: i.itemId,
          name: i.name, 
          quantity: i.quantity,
          size: i.size,
          basePrice: i.basePrice,
          subTotal: i.subTotal,
          notes: i.notes,
          addOns: i.addOns ? {
            create: {
              addItems: JSON.stringify(i.addOns['addItems']) ?? null,
              removeItems: JSON.stringify(i.addOns['removeItems']) ?? null,
              itemCount: i.addOns['itemCount'] ?? null
            }
          }
          :
          undefined
        })),
      },
    },
    include: { items: true },
  });

  return NextResponse.json(order, { status: 201 });
}

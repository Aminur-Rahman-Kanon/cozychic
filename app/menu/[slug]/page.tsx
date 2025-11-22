import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ItemCustomizer } from "@/components/menu/ItemCustomizer";
import Image from "next/image";

type Props = {
  params: { slug: string };
};

export default async function ItemDetailPage({ params }: Props) {
  const decodeUrl = decodeURI(params.slug);
  const item = await prisma.item.findUnique({
    where: { slug: decodeUrl },
  });

  if (!item) {
    notFound();
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-[4/3] bg-slate-200 rounded-xl flex items-center justify-center text-sm text-slate-500">
        <Image src={item.imageUrl ? item.imageUrl : ''}
               alt={item.name}
               fill
                />
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">{item.name}</h1>
          {item.description && (
            <p className="text-slate-600 text-sm mt-1">
              {item.description}
            </p>
          )}
          <p className="font-semibold mt-2">
            Base price: ${item.basePrice ? item.basePrice.toFixed(2) : 0}
          </p>
        </div>

        {/* All the customisation & Add to Cart lives here */}
        <ItemCustomizer
          item={item}
        />
      </div>
    </div>
  );
}

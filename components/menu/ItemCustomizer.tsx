"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { ItemType } from "@/types/item/item";
import { CartItemType } from '@/types/hook/cartStorage/cartStorage';
import { multiPriceHandler } from "@/app/utilities/utilities";
import useCartStorage from '@/app/hooks/cartStorage/useCartStorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type ItemCustomizerProps = {
  item: ItemType
};

export function ItemCustomizer({ item }: ItemCustomizerProps) {
  const addItem = useCartStore((s) => s.addItem);

  const { state, getCart, storeItem } = useCartStorage();

  // simple local state for demo – you can extend later
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [extraShot, setExtraShot] = useState(false);
  const [oatMilk, setOatMilk] = useState(false);
  const [noSugar, setNoSugar] = useState(false);
  const [noFoam, setNoFoam] = useState(false);
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const price = item.multiPrice ? JSON.parse(item.multiPrice) : {}
  const prices = multiPriceHandler(price, size);

  const unitPrice = (prices || item.basePrice)  + (extraShot ? 0.8 : 0) + (oatMilk ? 0.5 : 0);
  const linePrice = (unitPrice ? unitPrice : 0) * quantity;

  function handleAddToCart() {
    if (quantity < 1) return;

    try {
      const cartItem: CartItemType = {
        itemId: item.id,
        name: item.name,
        quantity,
        size,
        price: linePrice,
        addOns: {
          extraShot,
          oatMilk,
          noSugar,
          noFoam
        },
        notes: notes.trim()
      }

      const status = storeItem(cartItem);

      if (status){
        console.log(status)
        toast.success(`${quantity} ${item.name} added to cart`);
      }
      
    } catch (error) {
      //handle error
    }
  }

  console.log(getCart());

  return (
    <div className="space-y-4">
      <ToastContainer />
      {/* Size */}
      <div>
        <h2 className="text-sm font-semibold mb-1">Size</h2>
        <div className="flex gap-2 text-xs">
          {(["small", "medium", "large"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`border rounded-full px-3 py-1 ${
                size === s ? "bg-amber-600 text-white border-amber-600" : ""
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <h2 className="text-sm font-semibold mb-1">Add-ons</h2>
        <div className="space-y-1 text-xs">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={extraShot}
              onChange={(e) => setExtraShot(e.target.checked)}
            />
            Extra shot (+$0.80)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={oatMilk}
              onChange={(e) => setOatMilk(e.target.checked)}
            />
            Oat milk (+$0.50)
          </label>
        </div>
      </div>

      {/* Remove ingredients */}
      <div>
        <h2 className="text-sm font-semibold mb-1">Remove</h2>
        <div className="space-y-1 text-xs">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={noSugar}
              onChange={(e) => setNoSugar(e.target.checked)}
            />
            No sugar
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={noFoam}
              onChange={(e) => setNoFoam(e.target.checked)}
            />
            No foam
          </label>
        </div>
      </div>

      {/* Notes */}
      <div>
        <h2 className="text-sm font-semibold mb-1">Special instructions</h2>
        <textarea
          className="w-full border rounded-lg px-3 py-2 text-sm"
          rows={3}
          placeholder="E.g. Please make it extra hot."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Quantity + Add */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs">Qty</span>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Number(e.target.value) || 1))
            }
            className="w-16 border rounded-lg px-2 py-1 text-sm"
          />
        </div>
        <div className="flex-1 text-right text-sm">
          <div className="font-semibold">
            Total: ${linePrice.toFixed(2)}
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-1 rounded-full bg-amber-600 text-white px-5 py-2 text-sm font-medium hover:bg-amber-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ItemType } from "@/types/item/item";
import { CartItemType } from '@/types/hook/cartStorage/cartStorage';
import { multiPriceHandler } from "@/app/utilities/server/utilities";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartStore } from "@/app/store/useCartStore/useCartStore";

type ItemCustomizerProps = {
  item: ItemType
};

export function ItemCustomizer({ item }: ItemCustomizerProps) {

  const { storeItem } = useCartStore();
  
  // simple local state for demo – you can extend later
  const [size, setSize] = useState("medium");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addTopping, setAddTopping] = useState({
          Anchovies: false,
          "BBQ Sauce": false,
          Bacon: false,
          Beef: false,
          Cabanossi: false,
          Capsicum: false,
          Cheese: false,
          Chicken: false,
          Chilli: false,
          "Diced Tomato": false,
          Egg: false,
          Garlic: false,
          "Garlic Base": false,
          Ham: false,
          Jalapenos: false,
          Mushroom: false,
          Olives: false,
          Onions: false,
          Pepperoni: false,
          Pineapple: false,
          Prawns: false,
          "Sweet Chilli Sauce": false,
          "Tandoori Sauce": false,
          "Tomato Base": false
        })

    const [removeItems, setRemoveItem] = useState({
          "mushrooms": false,
          "onions": false,
          "olives": false,
          "green peppers": false,
          "anchovies": false
        })
  
  //Get the price of the product if there is multuple price
  const price = item.multiPrice ?? {};
  const prices = multiPriceHandler(price, size);

  //Get the toppings user add or remove
  const addedTopping = Object.keys(addTopping).filter(itm => addTopping[itm]);
  const removeTopping = Object.keys(removeItems).filter(itm => removeItems[itm]);
  
  //Calculate total price including extra ingredients and quantity
  const subtotal = ((prices || item.basePrice) + (addedTopping.length * 2.50)) * quantity;

  //addToCart handler
  function handleAddToCart() {
    if (quantity < 1) return;

    try {
      const cartItem: CartItemType = {
        itemId: item.id,
        name: item.name,
        quantity,
        size,
        basePrice: item.basePrice,
        subTotal: subtotal,
        addOns: {
          addItems: addedTopping,
          removeItems: removeTopping,
          itemCount: addedTopping ? addedTopping.length : 0
        },
        notes: notes.trim()
      }

      storeItem(cartItem);

      toast.success(`${quantity} ${item.name} added to cart`.toUpperCase());
    }
    
    catch (error) {
      console.error(error);
      return toast.error('failed to add item to the cart');
    }
  }

  return (
    <div className="space-y-4">
      
      <ToastContainer />

      {/* Size */}
      <div>
        <h2 className="text-sm font-semibold mb-1">Size</h2>
        <div className="flex gap-2 text-xs">
          {
            Object.keys(price).map(s => 
            <button key={s}
                    type="button"
                    onClick={() => setSize(s)}
                     className={`border rounded-full px-3 py-1 ${
                        size === s ? "bg-amber-600 text-white border-amber-600" : ""
                      }`} >
                {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>)
          }
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <h2 className="text-sm font-semibold mb-1">Extra Toppings ($2.50 Each)</h2>
        <div className="space-y-1 text-xs font-medium 'w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px]'">
          {
            Object.keys(addTopping).map(top => <label key={top} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={addTopping[top]}
                onChange={(e) => setAddTopping(prev => ({
                  ...prev,
                  [top]: e.target.checked
                })) }
              />
              {top.toUpperCase()}
            </label>)
          }
        </div>
      </div>

      {/* Remove ingredients */}
      <div>
        <h2 className="text-sm font-semibold mb-1">Remove Toppings</h2>
        <div className="space-y-1 text-xs 'w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px]'">
          {
            Object.keys(removeItems).map(top => <label key={top} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={removeTopping[top]}
                onChange={(e) => setRemoveItem(prev => ({
                  ...prev,
                  [top]: e.target.checked
                })) }
              />
              {top.toUpperCase()}
            </label>)
          }
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
      <div className="flex justify-between items-start gap-4">
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
        <div className="flex flex-col text-right text-sm gap-5">
          <div className="font-semibold">
            Total: ${subtotal.toFixed(2)}
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

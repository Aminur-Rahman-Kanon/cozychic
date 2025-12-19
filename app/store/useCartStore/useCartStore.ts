// stores/useCartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartStorageType, CartItemType } from '@/types/hook/cartStorage/cartStorage'

interface CartStore {
  storage: CartStorageType | {}
  getCart: () => CartStorageType | undefined
  storeItem: (item: CartItemType) => boolean | undefined
  removeItem: (item: CartItemType) => void
  clearCartStorage: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      storage: {},
      
      getCart: () => {
        if (typeof window === 'undefined') return undefined;
        
        try {
          const cart = localStorage.getItem('cart')
          return cart ? JSON.parse(cart) : undefined;
        } catch (error) {
          console.error(error)
          return undefined;
        }
      },

      storeItem: (item: CartItemType) => {
        if (!item) return undefined

        try {
          const currentState = get()
          const cart = currentState.getCart()

          if (!cart) {
            const dateTime = new Date().toLocaleString()
            const newCart: CartStorageType = {
              createdAt: dateTime,
              updatedAt: dateTime,
              items: [item],
              total: {
                itemCount: item.quantity,
                uniqueItems: 1,
                subtotal: item.subTotal,
                discount: 0,
                shipping: 0
              }
            }

            localStorage.setItem('cart', JSON.stringify(newCart))
            set({ storage: newCart })
            return true
          }
          else {
            const updateTime = new Date().toLocaleString()
            const updatedCart = { ...cart }
            updatedCart.updatedAt = updateTime
            
            if (updatedCart.total) {
              updatedCart.total.itemCount += item.quantity
              updatedCart.total.subtotal += item.subTotal
              
              const isUniqueItem = !updatedCart.items.some(itm => itm.name === item.name)
              if (isUniqueItem) updatedCart.total.uniqueItems += 1
            }

            updatedCart.items.push(item)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            set({ storage: updatedCart })
            return true
          }
        }
        catch (error) {
          console.error(error)
          return undefined
        }
      },

      removeItem: (item: CartItemType) => {
        const cart = get().getCart()

        if (cart) {
          try {
            const itemIdx = cart.items.findIndex(itm => 
              itm.itemId === item.itemId && 
              itm.subTotal === item.subTotal &&
              itm.size === item.size &&
              itm.quantity === item.quantity
            )

            if (itemIdx === -1) return

            const updatedCart = { ...cart }
            updatedCart.items.splice(itemIdx, 1)
            
            if (updatedCart.total?.subtotal) {
              updatedCart.total.subtotal -= item.subTotal
            }
            
            const uniqueItems = new Set(updatedCart.items.map(itm => itm.name)).size
            if (updatedCart.total) {
              updatedCart.total.uniqueItems = uniqueItems
            }

            if (updatedCart.total?.itemCount) {
              updatedCart.total.itemCount -= item.quantity
            }

            localStorage.setItem('cart', JSON.stringify(updatedCart))
            set({ storage: updatedCart })
          } catch (error) {
            console.error(error)
          }
        }
      },

      clearCartStorage: () => {
        localStorage.removeItem('cart')
        set({ storage: {} })
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)

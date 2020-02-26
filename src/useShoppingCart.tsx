import { useState } from 'react'
import { uuid } from 'uuidv4'

export interface Product {
  price: string
  quantity: number
  displayName: string
}

export interface CartProduct {
  id: string
  totalPrice: string
}

interface ShoppingCart<T extends Product> {
  cart: { products: (T & CartProduct)[]; total: string }
  addProduct: (product: T) => void
  removeProduct: (product: { id: string }) => void
  setQuantity: (product: { id: string }, value: number) => void
}

function getProductPrice<T extends Product>(product: T): string {
  return String(product.quantity * parseFloat(product.price))
}

function getGrandTotal<T extends Product>(products: T[]): string {
  return String(
    products.reduce((total, product) => {
      return total + parseFloat(getProductPrice(product))
    }, 0)
  )
}

function makeProduct<T extends Product>(product: T): T & CartProduct {
  return { ...product, id: uuid(), totalPrice: getProductPrice(product) }
}

function makeProducts<T extends Product>(products: T[]): (T & CartProduct)[] {
  return products.map(product => makeProduct(product))
}

export default function useShoppingCart<T extends Product>(
  products: T[] = []
): ShoppingCart<T> {
  const cartProducts = makeProducts(products)
  const [cart, updateCart] = useState({
    products: cartProducts,
    total: getGrandTotal(cartProducts),
  })

  function addProduct(product: T) {
    const mergedProducts = [...cart.products, makeProduct(product)]

    updateCart({
      products: mergedProducts,
      total: getGrandTotal(mergedProducts),
    })
  }

  function removeProduct(product: { id: string }) {
    const indexToRemove = cart.products.map(({ id }) => id).indexOf(product.id)

    if (indexToRemove > -1) {
      cart.products.splice(indexToRemove, 1)

      updateCart({
        products: [...cart.products],
        total: getGrandTotal(cart.products),
      })
    }
  }

  function setQuantity(product: { id: string }, value: number) {
    if (value < 1) {
      removeProduct(product)
      return
    }

    const cartProduct = cart.products.find(p => p.id === product.id)
    if (cartProduct) {
      cartProduct.quantity = value
      cartProduct.totalPrice = getProductPrice(cartProduct)
    }

    updateCart({
      products: [...cart.products],
      total: getGrandTotal(cart.products),
    })
  }

  return {
    cart,
    addProduct,
    removeProduct,
    setQuantity,
  }
}

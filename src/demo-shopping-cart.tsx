import React, { useState, useCallback } from 'react'
import styled, { css } from 'styled-components'

import useShoppingCart from './useShoppingCart'

interface Product {
  code?: string
  displayName: string
  description?: string
  quantity: number
  price: string
}

const Cart = styled.div`
  width: 400px;
  margin: auto;
  border: 2px solid black;
  padding: 10px;
`

const Row = styled('div')<{ border?: boolean }>`
  display: flex;
  padding-bottom: 5px;
  margin-bottom: 10px;
  justify-content: space-around;

  ${props =>
    props.border &&
    css`
      border-bottom: solid 1px black;
    `};
`

const Column = styled.div`
  display: flex;
  flex-flow: column;
`

function CartHeader() {
  return (
    <Row border>
      <span>Code</span>
      <span>Product</span>
      <span>Quantity</span>
      <span>Unit Price</span>
      <span>Total Price</span>
      <span>Action</span>
    </Row>
  )
}

// eslint-disable-next-line react/prop-types
const CartFooter: React.FC<{ total: string }> = ({ total }) => {
  return (
    <Row>
      <span>Total: {total}</span>
    </Row>
  )
}

function QuantityDisplay({
  id,
  quantity,
  setQuantity,
}: {
  id: string
  quantity: number
  setQuantity: Function
}) {
  function onQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity({ id }, event.target.value)
  }

  return (
    <>
      <input
        style={{ width: '50px' }}
        type="number"
        value={quantity}
        onChange={onQuantityChange}
      />
    </>
  )
}

function AddProduct({ addProduct }: { addProduct: Function }) {
  const initialProduct: Product = {
    code: '',
    displayName: '',
    description: '',
    quantity: 1,
    price: '1',
  }

  const [product, setProduct] = useState(initialProduct)

  const submit = useCallback(() => {
    addProduct(product)
    setProduct(initialProduct)
  }, [addProduct, product, initialProduct])

  return (
    <Column style={{ width: '100px' }}>
      Code:
      <input
        type="text"
        value={product.code}
        onChange={e => setProduct({ ...product, code: e.target.value })}
      />
      Product Name:
      <input
        type="text"
        value={product.displayName}
        onChange={e => setProduct({ ...product, displayName: e.target.value })}
      />
      Quantity:
      <input
        type="number"
        value={product.quantity}
        onChange={e =>
          setProduct({ ...product, quantity: parseFloat(e.target.value) })
        }
      />
      Price:
      <input
        type="text"
        value={product.price}
        onChange={e => setProduct({ ...product, price: e.target.value })}
      />
      <br />
      <button type="submit" onClick={submit}>
        Add Product
      </button>
    </Column>
  )
}

// eslint-disable-next-line react/prop-types
const CartProduct: React.FC<{ last: boolean }> = ({ children, last }) => {
  return <Row border={last}>{children}</Row>
}

export default function ShoppingCart(props: { products: Product[] }) {
  const { products } = props
  const { cart, setQuantity, removeProduct, addProduct } = useShoppingCart(
    products
  )

  return (
    <Cart>
      <CartHeader />
      {cart.products.map(
        ({ id, code, displayName, quantity, price, totalPrice }, i) => (
          <CartProduct key={id} last={i === cart.products.length - 1}>
            <span>{code}</span>
            <span>{displayName}</span>
            <QuantityDisplay
              id={id}
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <span>{price}</span>
            <span>{totalPrice}</span>
            <span>
              <button type="button" onClick={() => removeProduct({ id })}>
                x
              </button>
            </span>
          </CartProduct>
        )
      )}
      <CartFooter total={cart.total} />
      <hr />
      <AddProduct addProduct={addProduct} />
    </Cart>
  )
}

import React from 'react'
import ReactDOM from 'react-dom'

import ShoppingCart from './demo-shopping-cart'

const products = [
  {
    code: 'AAA',
    displayName: 'Laptop',
    description: 'New gaming laptop',
    quantity: 1,
    price: '2300',
  },
  {
    code: 'AAB',
    displayName: 'Mouse',
    description: 'Used Mouse',
    quantity: 3,
    price: '10',
  },
]

ReactDOM.render(
  <ShoppingCart products={products} />,
  document.getElementById('root')
)

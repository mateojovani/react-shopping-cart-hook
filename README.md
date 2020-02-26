# React Shopping Cart Hook

A simple and flexible react hook API to abstract the business logic on a shopping cart

## Behind the motive

This is not a shopping cart component
This is an immutable shopping cart api

### Installing

```
yarn install

npm start
```

### Usage & API

There is a small demo provided with the package

```
const products: Product[] = []

const const {
    cart,
    setQuantity,
    removeProduct,
    addProduct
} = useShoppingCart(products)

```
This gives you a cart state and an API to update it.

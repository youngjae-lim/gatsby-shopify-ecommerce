import React, { useState } from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.GATSBY_ACCESS_TOKEN,
});

const defaultState = {
  cart: {},
};

const CartContext = React.createContext(defaultState);
export default CartContext;

export function CartContextProvider({ children }) {
  const [checkout, setCheckout] = useState(
    JSON.parse(
      typeof window !== 'undefined' ? localStorage.getItem('checkout') : null
    )
  );

  const [successfulOrder, setSuccessfulOrder] = useState(null);
  const checkoutId = checkout?.id;

  React.useEffect(() => {
    const getCheckout = async () => {
      if (checkoutId && typeof window !== 'undefined') {
        const fetchedCheckout = await client.checkout.fetch(checkoutId);
        if (fetchedCheckout?.completedAt) { // if the checkout is already completed
          localStorage.removeItem('checkout');
          setCheckout(null);
          setSuccessfulOrder(fetchedCheckout);
        } else { // if the checkout is still not processed
          setCheckout(fetchedCheckout);
          localStorage.setItem('checkout', JSON.stringify(fetchedCheckout));
        }
      }
    };

    getCheckout();
  }, [setCheckout, setSuccessfulOrder, checkoutId]);

  async function getProductById(productId) {
    const product = await client.product.fetch(productId);
    return product;
  }

  const updateLineItem = async ({ variantId, quantity }) => {
    // if no checkout id, create a new checkout
    let newCheckout = checkout || (await client.checkout.create());

    // check to see if this variantId exists in storedCheckout
    const lineItemVariant = newCheckout.lineItems?.find(
      lineItem => lineItem.variant.id === variantId
    );

    if (lineItemVariant) { // if the variant item is already in the cart
      // update the existing quantity
      const newQuantity = lineItemVariant.quantity + quantity;

      if (newQuantity) { // if there is a new quantity added to the existing item
        // update the quantity
        newCheckout = await client.checkout.updateLineItems(newCheckout.id, [
          {
            id: lineItemVariant.id,
            quantity: newQuantity,
          },
        ]);
      } else { // if the existing quantity gets down to zero
        // remove the item from the cart
        newCheckout = await client.checkout.removeLineItems(newCheckout.id, [
          lineItemVariant.id,
        ]);
      }
    } else { // if the item is a totally new variant, simply add it to the cart
      newCheckout = await client.checkout.addLineItems(newCheckout.id, [
        {
          variantId,
          quantity,
        },
      ]);
    }

    // update the checkout with the new quantity
    setCheckout(newCheckout);
    setSuccessfulOrder(null);
    if (typeof window !== 'undefined') { // only if the environment is with a browser DOM
      localStorage.setItem('checkout', JSON.stringify(newCheckout));
    }
  };

  const removeLineItem = async lineItemId => {
    const newCheckout = await client.checkout.removeLineItems(checkout.id, [
      lineItemId,
    ]);

    setCheckout(newCheckout);
  };

  const dismissSuccessfulOrder = () => {
    setSuccessfulOrder(null);
  };

  return (
    <CartContext.Provider
      value={{
        checkout,
        updateLineItem,
        removeLineItem,
        getProductById,
        successfulOrder,
        dismissSuccessfulOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// doc: https://www.npmjs.com/package/shopify-buy

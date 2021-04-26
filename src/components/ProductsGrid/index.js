import React from 'react';

export function ProductsGrid({ products }) {
  console.log(products)
  return (
    <section>
      {products.map(product => (
        <div key={product.shopifyId}>{product.title}</div>
      ))}
    </section>
  );
}

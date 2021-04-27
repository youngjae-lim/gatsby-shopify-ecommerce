import React from 'react';
import { ProductsGridWrapper } from './styles';
import { ProductTile } from '../ProductTile';

export function ProductsGrid({ products }) {
  return (
    <ProductsGridWrapper>
      {products.map(product => (
        <ProductTile
          key={product.shopifyId}
          title={product.title}
          description={product.description}
          minPrice={product.priceRange.minVariantPrice.amount}
          handle={product.handle}
          imageFluid={product.images[0].localFile.childImageSharp.fluid}
        />
      ))}
    </ProductsGridWrapper>
  );
}

import React, { useContext } from 'react';
import ProductContext from 'context/ProductContext';
import { CategoryFilterItem } from './CategoryFilterItem';
import { FiltersWrapper } from './styles';

export function Filters() {
  const { collections } = useContext(ProductContext);

  return (
    <FiltersWrapper>
      <strong>Categories</strong>
      {collections.map(collection => (
        <CategoryFilterItem
          title={collection.title}
          key={collection.shopifyId}
          collectionId={collection.shopifyId}
        />
      ))}
    </FiltersWrapper>
  );
}

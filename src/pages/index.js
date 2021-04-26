import React, { useContext } from 'react';
import {
  Layout,
  SEO,
  HomepageCollectionsGrid,
  FeaturedProducts,
} from 'components';
import ProductContext from 'context/ProductContext';

const IndexPage = () => {
  const { collections } = useContext(ProductContext);
  const isFeatured = !!collections.find(
    collection => collection.title === 'Featured Hats'
  );
  console.log(collections);

  return (
    <Layout>
      <HomepageCollectionsGrid
        collections={collections.filter(
          collection => collection.title !== 'Featured Hats'
        )}
      />
      {isFeatured && <FeaturedProducts />}
    </Layout>
  );
};

export default IndexPage;

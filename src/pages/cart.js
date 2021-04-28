import React from 'react';
import { Layout, CartContents, SEO } from 'components';

export default function CartPage() {
  return (
    <Layout>
      <SEO title="Your Cart" description="TopHatterHat Cart" />
      <CartContents />
    </Layout>
  );
}

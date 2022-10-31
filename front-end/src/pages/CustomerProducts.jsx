import React, { useEffect, useState } from 'react';
import HeaderProducts from '../components/HeaderProducts';
import ProductCard from '../components/ProductCard';
// import { getProducts } from '../services/api';

function CustomerProducts() {
  const [productsList] = useState([]);

  useEffect(() => {
    /*     const getAllProducts = async () => {
      const result = await getProducts();
      if (!result) return setProductsList([]);
      setProductsList(result);
    };

    getAllProducts(); */
  }, []);

  return (
    <>
      <HeaderProducts />
      {
        productsList.map((product) => (
          <ProductCard
            key={ product.id }
            id={ product.id }
            image={ product.image }
            name={ product.name }
            price={ product.price }
          />
        ))
      }
    </>

  );
}

export default CustomerProducts;

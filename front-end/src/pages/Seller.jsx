import React, { useEffect, useState } from 'react';
import HeaderSeller from '../components/HeaderSeller';
import SellerOrderCard from '../components/SellerOrderCard';

import { getProductsSeller } from '../services/api';

function CustomerProducts() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const result = await getProductsSeller();
      if (!result) return setOrders([]);
      setOrders(result);
    };

    getAllProducts();
  }, []);

  return (
    <>
      <HeaderSeller />
      <p
        data-testid="customer_products__checkout-bottom-value"
      />
      {
        orders.map((order) => (
          <SellerOrderCard
            key={ order.id }
            id={ order.id }
            status={ order.status }
            saleDate={ order.saleDate }
            totalPrice={ order.totalPrice }
            deliveryAddress={ order.deliveryAddress }
          />
        ))
      }
    </>

  );
}

export default CustomerProducts;

import React, { useEffect, useState, useContext } from 'react';
import HeaderProducts from '../components/HeaderSeller';
import OrderCard from '../components/SellerOrderCard';

import { getProductsSeller } from '../services/api';

function CustomerProducts() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const result = await getProductsSeller();
    //   console.log(result)
      if (!result) return setOrders([]);
      setOrders(result);
    };

    getAllProducts();
  }, [orders]);

  return (
    <>
      <HeaderProducts />
      <p
        data-testid="customer_products__checkout-bottom-value"
      >
      </p>
      {
        orders.map((order) => (
          <OrderCard
            key={ order.id }
            id={ order.id }
            status={order.status}
            saleDate={ order.saleDate }
            totalPrice={ order.totalPrice }
          />
        ))
      }
    </>

  );
}

export default CustomerProducts;

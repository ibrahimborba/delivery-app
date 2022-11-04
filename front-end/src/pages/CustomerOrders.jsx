import React, { useEffect, useState } from 'react';
import HeaderProducts from '../components/HeaderProducts';
import OrderCard from '../components/OrderCard';
import { getSalesByUserEmail } from '../services/api';
import { getUser } from '../services/userLocalStg';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = getUser();

    const getAllOrders = async () => {
      const result = await getSalesByUserEmail(user.email);
      console.log(result);
      if (!result) return setOrders([]);
      setOrders(result);
    };

    getAllOrders();
  }, []);

  let ordersToRender;
  if (orders.length > 0) {
    ordersToRender = orders.map((order) => (
      <OrderCard
        key={ order.id }
        id={ order.id }
        saleDate={ order.saleDate }
        totalPrice={ order.totalPrice }
        status={ order.status }
      />
    ));
  } else {
    ordersToRender = <p>Não há pedidos</p>;
  }

  return (
    <div>
      <HeaderProducts />
      { ordersToRender }
    </div>
  );
}

export default CustomerOrders;

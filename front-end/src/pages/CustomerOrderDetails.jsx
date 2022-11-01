import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/HeaderProducts';
import TableDetails from '../components/TableCheckout';
import { getSalesById } from '../services/api';

export default function CustomerOrderDetails() {
  const [order, setOrder] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      const result = await getSalesById(id);
      if (!result) return setOrder([]);
      setOrder(result);
    };

    getOrder();
  }, []);

  console.log(order);
  return (
    <>
      <Header />
      <h1>Customer Order Details</h1>
      <TableDetails />
    </>
  );
}

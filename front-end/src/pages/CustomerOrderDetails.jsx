import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/HeaderProducts';
import TableDetails from '../components/TableDatails';
import { getSalesById } from '../services/api';
import Button from '../components/Button';

export default function CustomerOrderDetails() {
  const [order, setOrder] = useState({ products: [] });

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
  const formateDate = (date) => {
    const lastIndex = 10;
    if (date) {
      const result = date.substring(0, lastIndex);
      const dateFormated = result.split('-').reverse().join('/');
      return dateFormated;
    }
  };

  const dataTestId = 'customer_order_details__element-order-';
  return (
    <>
      <Header />
      <h1>Customer Order Details</h1>
      <span data-testid={ `${dataTestId}details-label-delivery-status${order.id}` }>
        {order.status}
      </span>
      <span data-testid={ `${dataTestId}details-label-order-id` }>
        {order.id}
      </span>
      <span data-testid={ `${dataTestId}details-label-order-date` }>
        {formateDate(order.saleDate)}
      </span>
      <Button
        dataTestId="customer_order_details__button-delivery-check"
        type="button"
        name="delivered"
        text="Marcar Como Entregue"
      />
      <TableDetails orderById={ order.products } />
    </>
  );
}

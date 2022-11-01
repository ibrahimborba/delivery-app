import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/HeaderProducts';
import TableDetails from '../components/TableDetails';
import { getSalesById } from '../services/api';
import Button from '../components/Button';

export default function CustomerOrderDetails() {
  const [order, setOrder] = useState({ products: [] });
  const { id } = useParams();
  const dataTestId = 'customer_order_details__element-order-';

  useEffect(() => {
    const getOrder = async () => {
      const result = await getSalesById(id);
      if (!result) return setOrder([]);
      setOrder(result);
    };

    getOrder();
  }, []);

  const formatDate = (date) => {
    const lastIndex = 10;
    if (date) {
      const result = date.substring(0, lastIndex);
      const dateFormated = result.split('-').reverse().join('/');
      return dateFormated;
    }
  };

  const formatTotal = (total) => {
    if (total) {
      const formatedTotal = total.replace('.', ',');
      return formatedTotal;
    }
  };

  console.log(order);

  return (
    <>
      <Header />
      <h1>Customer Order Details</h1>
      <span data-testid={ `${dataTestId}total-price` }>
        {formatTotal(order.totalPrice)}
      </span>
      <span data-testid={ `${dataTestId}details-label-delivery-status${order.id}` }>
        {order.status}
      </span>
      <span data-testid={ `${dataTestId}details-label-order-id` }>
        {order.id}
      </span>
      <span data-testid={ `${dataTestId}details-label-order-date` }>
        {formatDate(order.saleDate)}
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

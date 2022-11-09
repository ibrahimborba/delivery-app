import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/HeaderProducts';
import TableDetails from '../components/TableDetails';
import { getSalesById, updateStatus } from '../services/api';
import Button from '../components/Button';

export default function CustomerOrderDetails() {
  const [order, setOrder] = useState({ products: [], seller: { name: '' } });
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const dataTestId = 'customer_order_details__element-order-';

  useEffect(() => {
    const getOrder = async () => {
      const result = await getSalesById(id);
      setOrder(result);
      setStatus(result.status);
    };

    getOrder();
  }, []);

  useEffect(() => {
    const updateOrderStatus = async () => {
      const result = await updateStatus({ id, status });
      setOrder(result);
    };

    updateOrderStatus();
  }, [status, id]);

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

  const handleChangeStatus = ({ target }) => {
    setStatus(target.name);
  };

  return (
    <>
      <Header />
      <h1>Customer Order Details</h1>
      <span data-testid={ `${dataTestId}details-label-order-id` }>
        {order.id}
      </span>
      <span data-testid={ `${dataTestId}details-label-seller-name` }>
        {order.seller.name}
      </span>
      <span data-testid={ `${dataTestId}details-label-delivery-status${order.id}` }>
        {order.status}
      </span>
      <span data-testid={ `${dataTestId}details-label-order-date` }>
        {formatDate(order.saleDate)}
      </span>
      <Button
        dataTestId="customer_order_details__button-delivery-check"
        type="button"
        name="Entregue"
        text="Marcar Como Entregue"
        disabled={ status !== 'Em Trânsito' }
        onClick={ handleChangeStatus }
      />
      <p data-testid={ `${dataTestId}total-price` }>
        {formatTotal(order.totalPrice)}
      </p>
      <TableDetails orderById={ order.products } />
    </>
  );
}

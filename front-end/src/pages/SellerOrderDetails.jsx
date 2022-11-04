import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderSeller from '../components/HeaderSeller';
import TableDetailsSeller from '../components/TableDetailsSeller';
import { getSalesById, updateStatus } from '../services/api';
import Button from '../components/Button';

export default function SellerOrderDetails() {
  const [order, setOrder] = useState({ products: [], seller: { name: '' } });
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const dataTestId = 'seller_order_details__element-order-';

  useEffect(() => {
    const getOrder = async () => {
      const result = await getSalesById(id);
      if (!result) return setOrder([]);
      setOrder(result);
      setStatus(result.status);
    };

    getOrder();
  }, []);

  useEffect(() => {
    const updateOrderStatus = async () => {
      const result = await updateStatus({ id, status });
      if (!result) return setOrder([]);
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
      <HeaderSeller />
      <h1>Seller Order Details</h1>
      <span data-testid={ `${dataTestId}details-label-order-id` }>
        {order.id}
      </span>
      <span data-testid={ `${dataTestId}details-label-delivery-status` }>
        {order.status}
      </span>
      <span data-testid={ `${dataTestId}details-label-order-date` }>
        {formatDate(order.saleDate)}
      </span>
      <Button
        dataTestId="seller_order_details__button-preparing-check"
        type="button"
        name="Preparando"
        text="Preparar pedido"
        disabled={ status !== 'Pendente' }
        onClick={ handleChangeStatus }
      />
      <Button
        dataTestId="seller_order_details__button-dispatch-check"
        type="button"
        name="Em Trânsito"
        text="Saiu para entrega"
        disabled={ status !== 'Preparando' }
        onClick={ handleChangeStatus }
      />
      <p data-testid={ `${dataTestId}total-price` }>
        {formatTotal(order.totalPrice)}
      </p>
      <TableDetailsSeller orderById={ order.products } />
    </>
  );
}

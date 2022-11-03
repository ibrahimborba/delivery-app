import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from './Button';

function SellerOrderCard({ id, status, saleDate, totalPrice, deliveryAddress }) {
  // const formatedDate =  date.replace('T', ' ');
  // const formatedPrice =  price.replace('.', ',');
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();

    // const result = await checkout(
    //   { id, status, saleDate, totalPrice, deliveryAddress },
    // );

    history.push(`/seller/orders/${id}`);
  };
  console.log(id);
  return (
    <div>
      <p
        data-testid={ `seller_orders__element-order-id-${id}` }
      >
        {`Pedido ${id}`}
      </p>
      <p
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        {status}
      </p>
      <p
        data-testid={ `seller_orders__element-order-date-${id}` }
      >
        {saleDate}
      </p>
      <p
        data-testid={ `seller_orders__element-card-price-${id}` }
      >
        {totalPrice}
      </p>
      <p
        data-testid={ `seller_orders__element-card-address-${id}` }
      >
        {deliveryAddress}
      </p>
      <Button
        data-testid={ `seller_orders__element-order-id-${id}` }
        type="button"
        name="pedido"
        text="detalhes"
        onClick={ handleClick }
      />
    </div>
  );
}

SellerOrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
};

export default SellerOrderCard;

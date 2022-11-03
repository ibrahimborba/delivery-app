import React from 'react';
import PropTypes from 'prop-types';

function SellerOrderCard({ id, status, saleDate, totalPrice, deliveryAddress }) {
  // const formatedDate =  date.replace('T', ' ');
  // const formatedPrice =  price.replace('.', ',');

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
    </div>
  );
}

SellerOrderCard.PropTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
};

export default SellerOrderCard;

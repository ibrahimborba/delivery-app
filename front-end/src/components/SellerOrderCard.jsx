import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function SellerOrderCard({ id, status, saleDate, totalPrice, deliveryAddress }) {
  const history = useHistory();

  const handlePushPath = (orderId) => (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      history.push(`/seller/orders/${orderId}`);
    }
  };

  return (
    <div
      tabIndex={ 0 }
      role="button"
      onClick={ handlePushPath(id) }
      onKeyDown={ handlePushPath(id) }
    >
      <p
        data-testid={ `seller_orders__element-order-id-${id}` }
      >
        { `Pedido ${id}` }
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

SellerOrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
};

export default SellerOrderCard;

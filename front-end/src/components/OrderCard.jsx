import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function OrderCard({ id, status, saleDate, totalPrice }) {
  const history = useHistory();

  const formatedDate = new Date(saleDate).toLocaleDateString('pt-BR');
  const formatedPrice = totalPrice.replace('.', ',');

  const redirectOrderDetail = () => {
    history.push(`/customer/orders/${id}`);
  };

  return (
    <button type="button" onClick={ redirectOrderDetail }>
      <div>
        <p
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {`Pedido ${id}`}
        </p>
        <p
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          { status }
        </p>
        <p
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          { formatedDate }
        </p>
        <p
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          { `R$${formatedPrice}` }
        </p>
      </div>
    </button>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
};

export default OrderCard;

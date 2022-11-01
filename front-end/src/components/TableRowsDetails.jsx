import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { OrdersContext } from '../context/OrdersContext';
import Button from './Button';

function TableRowDetails({ order, index }) {
  const { orders, setOrders } = useContext(OrdersContext);

  const stringPrice = order.price.toFixed(2);

  const formatedPrice = stringPrice.replace('.', ',');

  const subTotalPrice = () => {
    const subtotal = order.quantity * order.price;

    const stringTotal = subtotal.toFixed(2);

    const formatedTotal = stringTotal.replace('.', ',');

    return formatedTotal;
  };

  const handleCartRemove = (productId) => () => {
    const filteredOrders = orders.filter(({ id }) => id !== productId);
    setOrders(filteredOrders);
  };

  return (
    <tr>
      <td data-testid={ `customer_checkout__element-order-table-item-number-${index}` }>
        {index + 1}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>
        {order.name}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-quantity-${index}` }>
        {order.quantity}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }>
        {formatedPrice}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }>
        {subTotalPrice()}
      </td>
      <td>
        <Button
          dataTestId={ `customer_checkout__element-order-table-remove-${index}` }
          type="button"
          name="remove"
          text="-"
          onClick={ handleCartRemove(order.id) }
        />
      </td>
    </tr>
  );
}

TableRowDetails.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TableRowDetails;

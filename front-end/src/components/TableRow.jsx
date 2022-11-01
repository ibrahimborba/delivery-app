import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { OrdersContext } from '../context/OrdersContext';
import Button from './Button';

function TableRow({ order, index }) {
  const { orders, setOrders } = useContext(OrdersContext);

  const stringPrice = order.price.toString();

  const formatedPrice = stringPrice.replace('.', ',');

  const subTotalPrice = () => {
    const subtotal = order.quantity * order.price;

    const stringTotal = subtotal.toString();

    const formatedTotal = stringTotal.replace('.', ',');

    return formatedTotal;
  };

  const handleCartRemove = (productId) => () => {
    const filteredOrders = orders.filter(({ id }) => id !== productId);
    setOrders(filteredOrders);
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{ order.name }</td>
      <td>{ order.quantity }</td>
      <td>{ formatedPrice }</td>
      <td>{ subTotalPrice() }</td>
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

TableRow.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TableRow;

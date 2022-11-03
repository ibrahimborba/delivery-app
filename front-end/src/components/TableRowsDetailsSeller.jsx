import React from 'react';
import PropTypes from 'prop-types';

function TableRowsDetailsSeller({ order, index }) {
  const formatPrice = (price) => {
    if (price) {
      const formatedPrice = price.replace('.', ',');
      return formatedPrice;
    }
  };

  const subTotalPrice = () => {
    const subtotal = order.salesProduct.quantity * Number(order.price);

    const stringTotal = subtotal.toFixed(2);

    const formatedTotal = stringTotal.replace('.', ',');

    return formatedTotal;
  };

  const dataTestId = 'seller_order_details__element-order-';

  return (
    <tr>
      <td data-testid={ `${dataTestId}table-item-number-${index}` }>
        {index + 1}
      </td>
      <td data-testid={ `${dataTestId}table-name-${index}` }>
        {order.name}
      </td>
      <td data-testid={ `${dataTestId}table-quantity-${index}` }>
        {order.salesProduct.quantity}
      </td>
      <td data-testid={ `${dataTestId}table-unit-price-${index}` }>
        {formatPrice(order.price)}
      </td>
      <td data-testid={ `${dataTestId}table-sub-total-${index}` }>
        {subTotalPrice()}
      </td>
    </tr>
  );
}

TableRowsDetailsSeller.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    salesProduct: PropTypes.shape({
      saleId: PropTypes.number,
      productId: PropTypes.number,
      quantity: PropTypes.number,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TableRowsDetailsSeller;

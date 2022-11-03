import React from 'react';
import PropTypes from 'prop-types';
import TableRowsDetailsSeller from './TableRowsDetailsSeller';

function TableDetailsSeller({ orderById }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {orderById.map((order, index) => (
          <TableRowsDetailsSeller
            order={ order }
            key={ order.id }
            index={ index }
          />
        ))}
      </tbody>
    </table>
  );
}

TableDetailsSeller.propTypes = {
  orderById: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
      urlImage: PropTypes.string,
      salesProduct: PropTypes.shape({
        saleId: PropTypes.number,
        productId: PropTypes.number,
        quantity: PropTypes.number,
      }),
    }),
  ).isRequired,
  // index: PropTypes.number.isRequired,
};

export default TableDetailsSeller;

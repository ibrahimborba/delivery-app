import React, { useContext } from 'react';
import { OrdersContext } from '../context/OrdersContext';
import TableRow from './TableRow';

function TableCheckout() {
  const { orders } = useContext(OrdersContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <TableRow
            order={ order }
            key={ order.id }
            index={ index }
          />
        ))}
      </tbody>
    </table>
  );
}

export default TableCheckout;

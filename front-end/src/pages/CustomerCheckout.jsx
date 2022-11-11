import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import HeaderProducts from '../components/HeaderProducts';
import Input from '../components/Input';
import TableCheckout from '../components/TableCheckout';
import { OrdersContext } from '../context/OrdersContext';
import { checkout, sellers } from '../services/api';

function CustomerCheckout() {
  const history = useHistory();
  const { orders } = useContext(OrdersContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [sellersInfo, setSellersInfo] = useState([]);
  const [total, setTotal] = useState('0.00');
  const [customerInfo, setCustomerInfo] = useState(
    { sellerId: '', deliveryAddress: '', deliveryNumber: '' },
  );

  useEffect(() => {
    async function sellersData() {
      const sellersResult = await sellers();
      setSellersInfo(sellersResult);
      setCustomerInfo((prevstate) => ({
        ...prevstate,
        sellerId: sellersResult[0].id,
      }));
    }
    sellersData();
  }, []);

  useEffect(() => {
    setIsDisabled(
      !customerInfo.deliveryAddress.length > 0
      || !customerInfo.deliveryNumber.length > 0,
    );
  }, [customerInfo]);

  const formatTotal = (newTotal) => {
    const strTotal = Number(newTotal).toFixed(2);
    const formatedTotal = strTotal.replace('.', ',');
    return formatedTotal;
  };

  useEffect(() => {
    const newTotal = orders.reduce((acc, order) => {
      const floatPrice = parseFloat(order.price);
      acc += (floatPrice * order.quantity);
      return acc;
    }, 0);

    setTotal(newTotal);
  }, [orders]);

  const handleChange = ({ target: { name, value } }) => {
    setCustomerInfo((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
    console.log(customerInfo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(orders);

    const result = await checkout(
      { ...customerInfo, totalPrice: total, products: orders },
    );

    history.push(`/customer/orders/${result.id}`);
  };

  return (
    <section>
      <HeaderProducts />
      <h1>Finalizar pedido</h1>
      <section>
        <TableCheckout />
        <section>
          <span>Total:</span>
          <span data-testid="customer_checkout__element-order-total-price">
            {formatTotal(total)}
          </span>
        </section>
      </section>
      <section>
        <h2>Detalhes e Endereço para Entrega</h2>
        <form onSubmit={ handleSubmit }>
          <label htmlFor="sellerId">
            P. Vendedora Responsável
            <select
              id="sellerId"
              name="sellerId"
              data-testid="customer_checkout__select-seller"
              onChange={ handleChange }
              value={ customerInfo.sellerId }
            >
              {sellersInfo.map((seller) => (
                <option value={ seller.id } key={ seller.id }>
                  {seller.name}
                </option>))}
            </select>
          </label>
          <Input
            label="endereço"
            dataTestId="customer_checkout__input-address"
            type="text"
            name="deliveryAddress"
            value={ customerInfo.deliveryAddress }
            onChange={ handleChange }
            placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
          />
          <Input
            label="Número"
            dataTestId="customer_checkout__input-address-number"
            type="number"
            name="deliveryNumber"
            value={ customerInfo.deliveryNumber }
            onChange={ handleChange }
            placeholder="198"
          />
          <Button
            dataTestId="customer_checkout__button-submit-order"
            type="submit"
            name="pedido"
            text="Finalizar Pedido"
            disabled={ isDisabled }
          />
        </form>
      </section>
    </section>
  );
}

export default CustomerCheckout;

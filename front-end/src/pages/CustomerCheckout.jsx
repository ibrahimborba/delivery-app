import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { checkout, sellers } from '../services/api';

function CustomerCheckout() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [sellersInfo, setSellersInfo] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(
    { sellerId: '', deliveryAddress: '', deliveryNumber: '' },
  );

  useEffect(() => {
    async function sellersData() {
      const sellersResult = await sellers();
      setSellersInfo(sellersResult);
    }
    sellersData();
  }, []);

  useEffect(() => {
    setIsDisabled(
      !customerInfo.deliveryAddress.length > 0
      || !customerInfo.deliveryNumber.length > 0,
    );
  }, [customerInfo]);

  const handleChange = ({ target: { name, value } }) => {
    setCustomerInfo((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await checkout({ ...customerInfo });
  };

  return (
    <section>
      <h1>Finalizar pedido</h1>
      <section>
        {/* <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-totla</th>
              <th>Remover Item</th>
            </tr>
          </thead>
          <tbody />
        </table> */}
        <section>
          <span>Total:</span>
          <span data-testid="customer_checkout__element-order-total-price">{ 28 }</span>
        </section>
      </section>
      <section>
        <h2>Detalhes e Endereço para Entrega</h2>
        <form onSubmit={ handleSubmit }>
          <select name="sellerId" data-testid="customer_checkout__select-seller">
            {sellersInfo.map((seller) => (
              <option value={ seller.id } key={ seller.id }>
                {seller.name}
              </option>))}
          </select>
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

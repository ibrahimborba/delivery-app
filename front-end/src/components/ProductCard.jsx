import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { OrdersContext } from '../context/OrdersContext';
import Input from './Input';

function ProductCard({ id, urlImage, name, price }) {
  const { orders, setOrders } = useContext(OrdersContext);
  const [productId] = useState(id);
  const [quantity, setQuantity] = useState(0);

  const floatPrice = parseFloat(price);

  const formatedPrice = price.replace('.', ',');

  useEffect(() => {
    let newOrders = [];

    if (orders.some((order) => order.id === productId)) {
      newOrders = orders.map((order) => {
        if (order.id === productId) {
          return { ...order, quantity };
        }
        return order;
      });
    }

    if (orders.some((order) => order.id === productId) && quantity === 0) {
      newOrders = orders.filter((order) => order.id !== productId);
    }

    if (!orders.some((order) => order.id === productId) && quantity === 1) {
      newOrders = [...orders, { id, urlImage, name, price: floatPrice, quantity }];
    }

    setOrders(newOrders);
  }, [quantity]);

  const handleCartAdd = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const handleCartRemove = () => {
    setQuantity((prevState) => {
      if (prevState > 0) return prevState - 1;
      return 0;
    });
  };

  const handleChange = ({ target }) => {
    const newQuantity = parseInt(target.value, 10);
    setQuantity(newQuantity);
  };

  return (
    <div>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { formatedPrice }
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </p>
      <div>
        <Button
          dataTestId={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          name="remove"
          text="-"
          onClick={ handleCartRemove }
        />
        <Input
          label=""
          dataTestId={ `customer_products__input-card-quantity-${id}` }
          type="number"
          name={ id }
          value={ quantity }
          onChange={ handleChange }
          placeholder="0"
        />
        <Button
          dataTestId={ `customer_products__button-card-add-item-${id}` }
          type="button"
          name="add"
          text="+"
          onClick={ handleCartAdd }
        />
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductCard;

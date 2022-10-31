import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { OrdersContext } from '../context/OrdersContext';
import Input from './Input';

function ProductCard({ id, urlImage, name, price }) {
  const { orders, setOrders } = useContext(OrdersContext);
  const [quantity, setQuantity] = useState(0);

  const floatPrice = parseFloat(price);

  const formatedPrice = price.replace('.', ',');

  const addOrders = (productId) => {
    if (orders.some((order) => order.id === productId)) {
      const sumOrderQuant = orders.map((order) => {
        if (order.id === productId) {
          setQuantity(order.quantity + 1);
          return { ...order, quantity: order.quantity + 1 };
        }
        return order;
      });
      return sumOrderQuant;
    }

    const newOrders = [...orders, { id, urlImage, name, price: floatPrice, quantity: 1 }];
    setQuantity(1);
    return newOrders;
  };

  const removeOrders = (productId) => {
    if (orders.some((order) => (order.id === productId && order.quantity > 1))) {
      const subOrderQuant = orders.map((order) => {
        if (order.id === productId) {
          setQuantity(order.quantity - 1);
          return { ...order, quantity: order.quantity - 1 };
        }
        return order;
      });
      return subOrderQuant;
    }

    const filteredOrders = orders.filter((order) => order.id !== productId);
    setQuantity(0);
    return filteredOrders;
  };

  const handleCartAdd = (productId) => () => {
    const newOrders = addOrders(productId);
    setOrders(newOrders);
  };

  const handleCartRemove = (productId) => () => {
    const newOrders = removeOrders(productId);
    setOrders(newOrders);
  };

  const handleChange = ({ target }) => {
    const productId = parseInt(target.name, 10);
    if (target.value < quantity) {
      const newOrders = removeOrders(productId);
      return setOrders(newOrders);
    }
    const newOrders = addOrders(productId);
    return setOrders(newOrders);
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
          onClick={ handleCartRemove(id) }
        />
        <Input
          label=""
          dataTestId={ `customer_products__input-card-quantity-${id}` }
          type="number"
          name={ id.toString() }
          value={ quantity }
          onChange={ handleChange }
          placeholder="0"
        />
        <Button
          dataTestId={ `customer_products__button-card-add-item-${id}` }
          type="button"
          name="add"
          text="+"
          onClick={ handleCartAdd(id) }
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

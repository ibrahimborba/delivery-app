import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function ProductCard({ id, image, name, price }) {
  const handleCartAdd = () => () => {};

  const handleCartRemove = () => () => {};

  return (
    <div>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price }
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ image }
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
        <p
          data-testid={ `customer_products__input-card-quantity-${id}` }
        >
          Quantity
        </p>
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
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;

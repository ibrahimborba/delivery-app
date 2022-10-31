import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import HeaderProducts from '../components/HeaderProducts';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { OrdersContext } from '../context/OrdersContext';

function CustomerProducts() {
  const history = useHistory();
  const { orders } = useContext(OrdersContext);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState('0.00');

  const handleRedirectCheckout = async (event) => {
    event.preventDefault();
    history.push('/customer/checkout');
  };

  const formatTotal = (newTotal) => {
    const strTotal = newTotal.toFixed(2);
    const formatedTotal = strTotal.replace('.', ',');
    return formatedTotal;
  };

  useEffect(() => {
    const newTotal = orders.reduce((acc, order) => {
      const floatPrice = parseFloat(order.price);
      acc += (floatPrice * order.quantity);
      return acc;
    }, 0);

    const formatedTotal = formatTotal(newTotal);
    setTotal(formatedTotal);
  }, [orders]);

  useEffect(() => {
    const getAllProducts = async () => {
      const result = await getProducts();
      if (!result) return setProducts([]);
      setProducts(result);
    };

    getAllProducts();
  }, []);

  return (
    <>
      <HeaderProducts />
      <Button
        dataTestId="customer_products__checkout-bottom-value"
        type="button"
        name="orders"
        text={ `Ver Carrinho: R$ ${total}` }
        onClick={ handleRedirectCheckout }
        disabled={ orders.length < 1 }
      />
      {
        products.map((product) => (
          <ProductCard
            key={ product.id }
            id={ product.id }
            urlImage={ product.urlImage }
            name={ product.name }
            price={ product.price }
          />
        ))
      }
    </>

  );
}

export default CustomerProducts;

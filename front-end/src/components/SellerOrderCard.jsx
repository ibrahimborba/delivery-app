import React from "react";
import PropTypes from 'prop-types';

 function SellerOrderCard ({id, status,saleDate, totalPrice}){
    //const formatedDate =  date.replace('T', ' ');
    //const formatedPrice =  price.replace('.', ',');

    return(
        <div>
            <p
            data-testid={`customer_orders__element-order-id-${id}`}>
                {`Pedido ${id}`}
            </p>
            <p
            data-testid={`customer_orders__element-delivery-status-${id}`}>
                {status}
            </p>
            <p
            data-testid={`customer_orders__element-order-date-${id}`}>
                {saleDate}
            </p>
            <p
            data-testid={`customer_orders__element-card-price-${id}`}>
                {totalPrice}
            </p>
        </div>
    );
}

SellerOrderCard.prototype = {
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
}

export default SellerOrderCard;
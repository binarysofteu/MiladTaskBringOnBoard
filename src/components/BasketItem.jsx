import './basketitem.css';

import DeleteForever from '@material-ui/icons/DeleteForever';
import PropTypes from 'prop-types';
import React from 'react';

export default function BasketItem({
  uId, name, price, setBasket, basket, balance, setBalance,
}) {
  BasketItem.propTypes = {
    uId: PropTypes.number.isRequired,
    name: PropTypes.number.isRequired,
    price: PropTypes.func.isRequired,
    setBasket: PropTypes.func.isRequired,
    basket: PropTypes.func.isRequired,
    balance: PropTypes.func.isRequired,
    setBalance: PropTypes.func.isRequired,
  };
  const removeItemToBasket = () => {
    const newBasket = basket.filter((item) => item.id !== uId);
    setBasket(newBasket);
    setBalance(balance + price);
  };
  return (
    <div className="itemHolder">
      <div className="itemName">{name}</div>
      <div className="itemPrice">
        {price.toLocaleString('en-US', {
          style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0,
        })}
      </div>
      <button type="button" className="BottonSection2" onClick={removeItemToBasket}>
        <DeleteForever fontSize="large" />
      </button>
    </div>
  );
}

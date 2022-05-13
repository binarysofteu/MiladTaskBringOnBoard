import './box.css';

import PropTypes from 'prop-types';
import React from 'react';

export default function Box(
  {
    uId, name, weight, setBasket, basket, balance, setBalance, setShowAlert,
  },
) {
  Box.propTypes = {
    uId: PropTypes.number.isRequired,
    name: PropTypes.number.isRequired,
    weight: PropTypes.func.isRequired,
    setBasket: PropTypes.func.isRequired,
    basket: PropTypes.func.isRequired,
    balance: PropTypes.func.isRequired,
    setBalance: PropTypes.func.isRequired,
    setShowAlert: PropTypes.func.isRequired,
  };
  const addItemToBasket = () => {
    if (balance >= (weight * 100)) {
      const newItem = {
        id: uId,
        name,
        price: weight * 100,
      };
      setBasket([...basket, newItem]);
      const newBalance = balance - newItem.price;
      setBalance(newBalance);
      if (newBalance < 2000) {
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
    }
  };
  return (
    <div className="boxHolder">
      <div className="nameSection">{name}</div>
      <div className="seperator" />
      <div className="priceSection">
        {(weight * 100).toLocaleString('en-US', {
          style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0,
        })}
      </div>
      {
        basket.find((c) => c.id === uId) === undefined
          ? (
            <button type="button" className="BottonSection" onClick={addItemToBasket}>
              Buy
            </button>
          )
          : (
            <button type="button" className="BottonSection">
              Added to basket
            </button>
          )
      }

    </div>
  );
}

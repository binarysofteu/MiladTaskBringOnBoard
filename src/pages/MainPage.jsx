import './index.css';

import Modal from '@material-ui/core/Modal/Modal';
import TextField from '@material-ui/core/TextField/TextField';
import AddBox from '@material-ui/icons/AddBox';
import CreditCard from '@material-ui/icons/CreditCard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import React, { useEffect, useState } from 'react';

import BasketItem from '../components/BasketItem';
import Box from '../components/Box';

export default function MainPage() {
  const [balance, setBalance] = useState(15000);
  const [alert, setShowAlert] = useState(false);
  const [showBasket, setShowBasket] = useState(false);
  const [num, setNum] = useState(0);
  const [basket, setBasket] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pokemon, setMainPoks] = useState([]);
  const [searchedPoks, setSearchedPoks] = useState([]);
  const toggleBasket = () => {
    if (true === showBasket) {
      setShowBasket(false);
    } else {
      setShowBasket(true);
    }
  };
  const searchPoks = (e) => {
    const result = pokemon.filter((item) => item.name.match(e.target.value));
    setSearchedPoks(result);
  };
  const addMoney = () => {
    setBalance(balance + parseInt(num, 10));
    setNum(0);
    handleClose();
  };
  useEffect(() => {
    const fetchPokemon = async () => {
      const newPoks = [];
      await fetch('https://pokeapi.co/api/v2/pokemon?offset=10&limit=10')
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((data) => Promise.all(
          data.results.map((item) => fetch(`${item.url}`)
            .then((data2) => {
              if (data2.ok) {
                return data2.json();
              }
              throw data2;
            }).then((data3) => {
              const object = {
                id: data3.id,
                name: data3.name,
                weight: data3.weight,
              };
              newPoks.push(object);
            })),
        )
          .catch(() => {
            // show eeror message
          }));
      setMainPoks(newPoks);
      setSearchedPoks(newPoks);
    };
    fetchPokemon();
  }, []);
  return (
    <div className="main">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalBox">
          <span className="title">Add money to your balance</span>
          <TextField id="outlined-basic" label="Amount" variant="outlined" fullWidth type="number" value={num} onChange={(e) => setNum(e.target.value)} />
          <button type="button" className="addMoney2" onClick={addMoney}>Add Money</button>
          <span onClick={handleClose} onKeyDown={handleClose} aria-label="closeModal" role="button" tabIndex={0} className="closeModal">×</span>
        </div>
      </Modal>
      <div className="header">
        <div className="balace">
          <CreditCard fontSize="large" />
          <span className="price">
            {balance.toLocaleString('en-US', {
              style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0,
            })}
          </span>
          <AddBox fontSize="large" className="addMoney" onClick={handleOpen} />
          {
            true === alert ? (
              <p className="low">
                Low money
                <span onClick={() => setShowAlert(false)} onKeyDown={toggleBasket} aria-label="close" role="button" tabIndex={0} className="close">×</span>
              </p>
            ) : null
          }
        </div>
        <span className="basket" onClick={toggleBasket} onKeyDown={toggleBasket} aria-label="bas" role="button" tabIndex={0}>
          <ShoppingBasketIcon fontSize="large" />
          <span className="badge">{basket.length}</span>
        </span>
      </div>
      <div className="search">
        <TextField id="outlined-basic" label="Search Pokmons" variant="outlined" fullWidth onChange={(e) => searchPoks(e)} />
      </div>
      <div className="pokemons">
        {
          0 === searchedPoks.length
            ? <span className="no">Nothing to show!</span>
            : searchedPoks.map((item) => (
              <Box
                key={item.id}
                uId={item.id}
                name={item.name}
                weight={item.weight}
                setBasket={setBasket}
                basket={basket}
                balance={balance}
                setBalance={setBalance}
                setShowAlert={setShowAlert}
              />
            ))
        }
      </div>
      <div
        className={true === showBasket ? 'showBasket' : 'hiddenBasket'}
      >
        <div className="fl">
          {
          0 === basket.length ? <p className="nothing">Noting to show!</p>

            : basket.map((item2) => (
              <BasketItem
                key={item2.id}
                uId={item2.id}
                name={item2.name}
                price={item2.price}
                setBasket={setBasket}
                basket={basket}
                balance={balance}
                setBalance={setBalance}
              />
            ))
        }
        </div>
        <div className="total">
          Total :&nbsp;
          {(basket.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0)).toLocaleString('en-US', {
            style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0,
          })}
        </div>
      </div>
    </div>

  );
}

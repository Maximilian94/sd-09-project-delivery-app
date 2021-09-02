import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import qs from 'qs';

import { useDeliveryContext } from '../../context/deliveryProvider';
import OrderLIst from '../../components/checkout/OrderLIst';
import AddressDetails from '../../components/checkout/AddressDetails';
import Header from '../../components/Header';
import api from '../../service/axiosApi';
import './style.css';

const Checkout = () => {
  const [sellers, setSellers] = useState([]);

  const { address, products, total } = useDeliveryContext();

  const getSellers = async () => {
    const fetchSellers = await api.get('/seller')
      .then((response) => response.data);

    // console.log(fetchSellers);

    const sellersNames = fetchSellers.map(({ name }) => name);
    setSellers(sellersNames);
    console.log('sellersNames > ', sellersNames);
  };

  useEffect(() => {
    getSellers();
  }, []);

  // const { totalPrice, deliveryNumber, deliveryAddress, name, products } = req.body;

  const handeClick = async () => {
    console.log('click');

    const data = {
      totalPrice: Number(total.toFixed(2)),
      deliveryNumber: address.numero,
      deliveryAddress: address.address,
      name: address.vendedor,
      products,
    };

    const { token } = JSON.parse(localStorage.getItem('user'));

    const headers = { 'Content-Type': 'application/json', authorization: token };

    await api.post('/sales', {
      headers,
      data: qs.stringify(data),
    })
      .then((response) => console.log('response > ', response))
      .catch((err) => console.log(err));

    // console.log('data > ', data);
    console.log('token > ', token);
  };

  return (
    <div className="checkout-container">
      <header>
        <Header />
      </header>
      <div className="checkout-main-container">
        <h2>Finalizar pedidos</h2>
        <OrderLIst />
        <h2>Detalhes e Endereço para Entrega</h2>
        <AddressDetails names={ sellers } />
      </div>
      <button
        type="button"
        className="finalize-order"
        data-testid="customer_checkout__button-submit-order"
        onClick={ handeClick }
      >
        FINALIZAR PEDIDO
      </button>
    </div>
  );
};

export default Checkout;

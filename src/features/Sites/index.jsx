import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../../components/NotFound';

import HomePage from './pages/Home';
import Search from './pages/Search/Search';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';

console.log('site');

function Products(props) {

  return (
    <Fragment>
        <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="home" element={<HomePage />} />
            <Route path="search" element={<Search />} />
            <Route path="shop/:id" element={<Shop />} />
            <Route path="cart" element={<Cart />} />

            <Route path="payment" element={<Payment />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/not-found" element={<NotFound />} />
        </Routes>
    </Fragment>
  );
}

export default Products;
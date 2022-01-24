import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { increaseItem, decreaseItem, removeItem } from '../../../../app/cartSlice';
import { addPaymentItem, resetPayment } from '../../../../app/paymentSlice';


function CartItem(props) {
    const { product } = props;
    const dispatch = useDispatch();

    const [checked, setChecked] = useState([]);

    const handleRemoveProductToCart = (name, id) => {
        const result = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}" khỏi giỏ hàng không?`);

        if(result) {
            const action = removeItem(id)
            dispatch(action)
        }
    }

    useEffect(() => {
        dispatch(resetPayment())
    }, [])

    const handleCheck = (product) => {
        setChecked(prev => {
            const isChecked = checked.includes(product._id);
            if(isChecked) {
                return checked.filter(item => item !== product._id)
            }
            else {
                return [...prev, product._id]
            }
        })
        dispatch(addPaymentItem(product));
    }

    return (
        <div className="cart-item-group">
            <input 
                checked = {checked.includes(product._id)}
                onChange={() => handleCheck(product)}
                className="check-box" type="checkbox" name="item"/>
            <img className="cart-item-img" src={product.image?.path} alt="hinh anh san pham"/>
            <div className="cart-item-name">
                {product.name}
            </div>

            <div className="cart-item-price">
                {product.salePrice.toLocaleString("vi")} đ
            </div>

            <div className="cart-item-quantity">
                <span className="btn-add-cart">
                    <i onClick={() => dispatch(decreaseItem(product._id))} className="fas fa-minus"></i>
                </span>
                <span className="quantity-add-cart">{product.quantity.toLocaleString("vi")}</span>
                <span className="btn-add-cart">
                    <i onClick={() => dispatch(increaseItem(product._id))} className="fas fa-plus"></i>
                </span>
            </div>

            <div className="cart-item-price">
                {(product.salePrice * product.quantity).toLocaleString("vi")} đ
            </div>

            <div className="cart-item-delete">
                <i  onClick={() => handleRemoveProductToCart(product.name, product._id)} className="cart-item-delete fas fa-trash-alt"></i>
            </div>
        </div>
    );
}

export default CartItem;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import "./Cart.css";
import CartTab from '../../components/CartTab/CartTab';
import { addItem, removeItem } from '../../../../app/cartSlice';


function Cart(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const payment = useSelector(state => state.payment);
    const [cartTabs, setCartTabs] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        document.title = "ToMe - Giỏ hàng";

        const getListShopId = (cart) => {
            const listShopId = [];
    
            if(cart.length > 0) {
                cart.forEach(item => {
                    if (!listShopId.includes(item.product.shopId)) {
                        return listShopId.push(item.product.shopId)
                    }
                })
            }
            return listShopId;
        }
    
        const getListShopInfo = (cart) => {
            const listShopInfo = [];
            const listShopId = getListShopId(cart);
    
            if(listShopId.length > 0) {
                listShopId.forEach(shopId => {
                    const product = cart.find(item => {
                        return item.product.shopId === shopId;
                    })
    
                    const shopName = product.product.shopName;
                    let obj = {
                        shopId,
                        shopName
                    }; 
    
                    listShopInfo.push(obj);
                })
            }
            return listShopInfo;
        }
    
        const handleCart = (cart) => {
            const cartShop = [];
            const listShopId = getListShopId(cart);
            const listShopInfo = getListShopInfo(cart);
    
            if(listShopId.length > 0) {
                listShopId.forEach((shopId, index) => {
                    let obj = {
                        shopName: listShopInfo[index].shopName,
                        shopId: listShopInfo[index].shopId,
                        products: []
                    }; 
    
                    cart.forEach(item => {
                        if(item.product.shopId === shopId) {
                            let newProduct = {...item.product};
                            newProduct.quantity = item.quantity;
                            obj.products.push(newProduct);
                        }
                    })
    
                    cartShop.push(obj);
                })
            }
    
            return cartShop;
        }

        setCartTabs(handleCart(cart));
    }, [cart])

    useEffect(() => {
        const totalPrice = payment.reduce((total, item) => {
            return total + item.salePrice * item.quantity
        }, 0)

        console.log(totalPrice);
        setTotalPrice(totalPrice)
    }, [payment])

    const handlePayment = () => {
        if(totalPrice !== 0)
            navigate("/payment")
    }

    const showCartTabs = (cartTabs) => {
    let result = "";

    if(cartTabs.length > 0) {
        result = cartTabs.map((cartTab, index) => {
            return <CartTab key={index} cartTab={cartTab} />
        })
    }

    return result;
    }


    return (
        <div className="body">
            <div className="grid wide">
                <div className="search-result__title">Giỏ hàng</div>
                <div className="row no-gutters">
                    
                    <div className="col l-9">
                        <div className="cart-sub">
                            <div className="cart-item-group">
                                <div className="check-box"></div>
                                <div className="cart-item-img"></div>
                                <div className="cart-item-name"></div>

                                <div className="cart-item-price">Đơn giá</div>

                                <div className="cart-item-quantity">Số lượng</div>

                                <div className="cart-item-price">Thành tiền </div>

                                <div className="cart-item-delete"></div>
                            </div>
                        </div>  
                        {showCartTabs(cartTabs)}
                    </div>
                    <div className="col l-3">
                        <div className="total">
                            <div className="total-price">
                                <span className="total-price__label">Tổng cộng:</span>
                                <span className="total-price__price">{totalPrice.toLocaleString("vi")} đ</span>
                            </div>
                            <button onClick={handlePayment} className="form-submit">Mua hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
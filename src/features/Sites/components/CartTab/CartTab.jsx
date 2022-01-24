import React, { Fragment, useEffect, useRef } from 'react';

import CartItem from '../CartItem/CartItem';
import "./CartTab.css";

function CartTab(props) {
    const { cartTab } = props;
    const products = cartTab.products;

    const showProducts = (products) => {
        let result = "";

        if(products.length > 0) {
            result = products.map((product, index) => {
                return <CartItem key={index} product={product} />
            })
        }

        return result;
    }

    const handleChangeCheckbox = (event) => {
        var checkboxShop = event.target;
        const indexShop = event.target.dataset.index;
        var checkboxItems = document.querySelectorAll(`[data-index="item${indexShop}"]`)

        var isCheckedAll = checkboxShop.checked;
        checkboxItems.checked = isCheckedAll;
    }

    return (
        <Fragment>
            <div className="cart-tab">
                <div className="cart-tab-header">
                    {/* <input data-index={0} onChange={handleChangeCheckbox} className="check-box" type="checkbox" name="shop"/> */}
                    <div className="">
                        <i className="cart-tab-header__shop-icon fas fa-store"></i>
                        <span className="cart-tab-header__shop-name">{cartTab.shopName}</span>
                    </div>
                </div>

                {showProducts(products)}

                {/* <div className="cart-item-group">
                    <input data-index={"item" + 0} className="check-box" type="checkbox" name="item"/>
                    <img className="cart-item-img" src="https://res.cloudinary.com/tome-ecommer/image/upload/v1638920949/Users/store_is7ufs.png" alt="hinh anh san pham"/>
                    <div className="cart-item-name">
                        Giày 𝐉𝐨𝐫𝐝𝐚𝐧 1 low panda màu đen trắng nam nữ, Giày JD1 low panda đen trắng bản đẹp 2021
                    </div>

                    <div className="cart-item-price">
                        100.000 đ
                    </div>

                    <div className="cart-item-quantity">
                        <span className="btn-add-cart">
                            <i className="fas fa-minus"></i>
                        </span>
                        <span className="quantity-add-cart">10</span>
                        <span className="btn-add-cart">
                            <i className="fas fa-plus"></i>
                        </span>
                    </div>

                    <div className="cart-item-price">
                        100.000 đ
                    </div>

                    <div className="cart-item-delete">
                        <i className="cart-item-delete fas fa-trash-alt"></i>
                    </div>
                </div> */}
            </div>
            {/* <div className="col l-3">
                <div className="total">
                    <div className="total-price">
                        <span className="total-price__label">Tổng cộng:</span>
                        <span className="total-price__price">1.000.000đ</span>
                    </div>
                    <button className="form-submit">Mua hàng</button>
                </div>
            </div> */}
        </Fragment>
    );
}

export default CartTab;
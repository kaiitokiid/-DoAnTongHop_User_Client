import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './ShopItem.css'

require('dotenv').config();

function ShopItem(props) {
    const { shop } = props;
    const navigate = useNavigate();

    const showRating = (rate) => {

        var result = [];

        for (let i = 1; i <= 5 - rate; i++) {
            result.push(<i key={i + 10} className="fas fa-star"></i>);
        }
        for (let i = 1; i <= rate; i++) {
            result.push(<i key={i} className="home-product__rank-icon--active fas fa-star"></i>);
        }

        return result;
    }

    return (
        <div onClick={() => navigate(`/shop/${shop._id}`)} className="col l-2" >
            <div className="home-product">
                <div className="shop-item__img">
                    <img className="shop-item__img1" src={shop.image?.path} alt="akldjaslkdj"/>
                </div>

                <h4 className="home-product__name shop-item__name">{shop.shopName}</h4>

                {/* <div className="home-product__price-box">
                    <span className="home-product__price">{shop.salePrice.toLocaleString("vi")} đ</span>
                    <span className="home-product__sold">{shop.sold !== 0 && `${shop.sold.toLocaleString("vi")} đã bán`}</span>
                </div> */}
                {/* 
                <div className="home-product__action-box">
                    <!-- Heart -->
                    <span className="home-product__heart home-product__heart--active">
                        <i className="home-product__heart-icon far fa-heart"></i>
                        <i className="home-product__heart-icon--active fas fa-heart"></i>
                    </span>
                    <!-- Rank -->
                    <span className="home-product__rank">
                        {showRating(shop.rate)}
                    </span>
                </div> */}

                {/* <div className="home-product__brand-box">
                    <span className="home-product__brand">{shop.branch}</span>
                    <span className="home-product__origin">{shop.originCountry}</span>
                </div> */}
            </div>
        </div>
    );

}

export default ShopItem;
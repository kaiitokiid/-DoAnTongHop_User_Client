import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './ProductsBlock.css';
require('dotenv').config();

function ProductsBlock(props) {
    const { product } = props;
    const navigate = useNavigate();

    const handleClickProduct = (id) => {
        axios.put('http://localhost:5000/api/products/viewcount',
            { id },
        )
            .then(res => {
                if (res.data.isSuccess) {
                    navigate(`/product/${id}`, { replace: true })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

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
        <div to={`/product/${product._id}`} onClick={() => handleClickProduct(product._id)} className="col l-2-4" >
            <div className="home-product">
                <div className="home-product__img" style={{ backgroundImage: `url(${product.image?.path})` }}></div>

                <h4 className="home-product__name">{product.name}</h4>

                <div className="home-product__price-box">
                    <span className="home-product__price">{product.salePrice.toLocaleString("vi")} đ</span>
                    <span className="home-product__sold">{product.sold !== 0 && `${product.sold.toLocaleString("vi")} đã bán`}</span>
                </div>

                <div className="home-product__action-box">
                    {/* <!-- Heart --> */}
                    <span className="home-product__heart home-product__heart--active">
                        <i className="home-product__heart-icon far fa-heart"></i>
                        <i className="home-product__heart-icon--active fas fa-heart"></i>
                    </span>
                    {/* <!-- Rank --> */}
                    <span className="home-product__rank">
                        {/* <i className="home-product__rank-icon--active fas fa-star"></i>
                        <i className="home-product__rank-icon--active fas fa-star"></i>
                        <i className="home-product__rank-icon--active fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i> */}
                        {showRating(product.rate)}
                    </span>
                </div>

                <div className="home-product__brand-box">
                    <span className="home-product__brand">{product.branch}</span>
                    <span className="home-product__origin">{product.originCountry}</span>
                </div>

                {/* <div className="home-product__favorite">
                    <i className="fas fa-check"></i>
                    <span>Yêu thích</span>
                </div> */}

                {/* <div className="home-product__sale-off">
                    <span className="home-product__sale-off-percent">10%</span>
                    <span className="home-product__sale-off-label">GIẢM</span>
                </div> */}
            </div>
        </div>
    );

}

export default ProductsBlock;
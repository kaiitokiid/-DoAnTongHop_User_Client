import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import './ProductDetail.css';
import { addItem, removeItem } from '../../../../app/cartSlice';
import ProductsTab from '../../components/Product/ProductsTab/ProductsTab';

function ProductDetail(props) {
    const cart = useSelector(state => state.cart);
    const [productTab, setProductTab] = useState(
        {
            title: 'Sản phẩm tương tự',
            products: [
            ]
        },
    );
    const dispatch = useDispatch();

    // const getListShopId = (cart) => {
    //     const listShopId = [];

    //     if(cart.length > 0) {
    //         cart.forEach(item => {
    //             if (!listShopId.includes(item.product.shopId)) {
    //                 return listShopId.push(item.product.shopId)
    //             }
    //         })
    //     }
    //     return listShopId;
    // }

    // const getListShopInfo = (cart) => {
    //     const listShopInfo = [];
    //     const listShopId = getListShopId(cart);

    //     if(listShopId.length > 0) {
    //         listShopId.forEach(shopId => {
    //             const product = cart.find(item => {
    //                 return item.product.shopId === shopId;
    //             })

    //             const shopName = product.product.shopName;
    //             let obj = {
    //                 shopId,
    //                 shopName
    //             }; 

    //             listShopInfo.push(obj);
    //         })
    //     }
    //     return listShopInfo;
    // }

    // const handleCart = (cart) => {
    //     const cartShop = [];
    //     const listShopId = getListShopId(cart);
    //     const listShopInfo = getListShopInfo(cart);

    //     if(listShopId.length > 0) {
    //         listShopId.forEach((shopId, index) => {
    //             let obj = {
    //                 shopName: listShopInfo[index].shopName,
    //                 products: []
    //             }; 

    //             cart.forEach(item => {
    //                 if(item.product.shopId === shopId) {
    //                     obj.products.push(item.product)
    //                 }
    //             })

    //             cartShop.push(obj);
    //         })
    //     }

    //     return cartShop;
    // }

    // console.log(handleCart(cart));

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [shop, setShop] = useState({});
    const params = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        
        axios.get(`http://localhost:5000/api/products/${params.id}`
        )
        .then(res => {
            if(res.data.isSuccess){
                document.title= 'ToMe - ' + res.data.data.name;
                setProduct({...res.data.data})

                return Promise.all([res.data.data, axios.get(`http://localhost:5000/api/user/${res.data.data.shopId}`)])
            }
        })
        .then((results) => {
            const [ product, shop ] = results;

            if(shop.data.isSuccess){
                setShop({...shop.data.data})
            }

            return axios.post(`http://localhost:5000/api/products/similar/`, {
                ...product
            })
        })
        .then(similarProducts => {
            if(similarProducts.data.isSuccess) {
                const newProduct = [];

                similarProducts.data.data.forEach(similarProduct => {
                    newProduct.push(similarProduct)
                });

                console.log(newProduct);

                setProductTab({...productTab, products: newProduct});
            }
        })
        .catch(err => {
            console.log(err);
            navigate("/not-found")
        })
    }, [params.id])

    const handleAddProductToCart = (product, quantity) => {
        const action = addItem({product, quantity})
        dispatch(action)
    }

    const handleRemoveProductToCart = (id) => {
        const action = removeItem(id)
        dispatch(action)
    }

    if(Object.keys(product).length === 0 || Object.keys(shop).length === 0){
        return ""
    }
    else
    return (
        <div className="body">
            <div className="grid wide">
                <div className="row" >
                    <div className="product-detail__image col l-4 l-o-1">
                        <div className="home-product__img" style={{ backgroundImage: `url(${product.image.path})` }}></div>
                    </div>
                    <div className="product-detail col l-4">
                        <div className="product-detail__block product-detail__info">
                            <p className="product-detail__info-name">{product.name}</p>
                            <p className="product-detail__info-price">{product.salePrice.toLocaleString("vi")} đ</p>
                        </div>
                        <div className="product-detail__block product-detail__desc">

                            <div className="product-detail__group">
                                <span className="product-detail__label">
                                    Thương hiệu:
                                </span>
                                <span className="product-detail__value">
                                    {product.branch}
                                </span>
                            </div>

                            <div className="product-detail__group">
                                <span className="product-detail__label">
                                    Xuất xứ:
                                </span>
                                <span className="product-detail__value">
                                    {product.originCountry}
                                </span>
                            </div>

                            <div className="product-detail__group">
                                <span className="product-detail__label">
                                    Mô tả:
                                </span>
                                <p className="product-detail__value product-detail__desc">
                                    {product.otherInfo}
                                </p>
                            </div>
                        </div>

                        <div className="product-detail__block product-detail__control">
                            <div className="product-detail__group">
                                <span className="product-detail__label">
                                    Còn hàng:
                                </span>
                                <span className="product-detail__value">
                                    <span className="product-detail__stock">{product.stock}</span> sản phẩm
                                </span>
                            </div>

                            <div className="product-detail__group">
                                <span className="product-detail__label">
                                    Số lượng:
                                </span>
                                <span className="product-detail__value">
                                    <span onClick={() => quantity === 0 ? 0 : setQuantity(quantity - 1)} className="btn-add-cart">
                                        <i className="fas fa-minus"></i>
                                    </span>
                                    <span className="quantity-add-cart">{quantity}</span>
                                    <span onClick={() => setQuantity(quantity + 1)} className="btn-add-cart">
                                        <i className="fas fa-plus"></i>
                                    </span>
                                </span>
                                <span className="product-detail__value">

                                    <button className="btn" type="button" onClick={() => handleAddProductToCart(product, quantity)}>Thêm vào giỏ hàng</button>
                                </span>
                            </div>

                            {/* <div className="product-detail__group">
                                <span className="product-detail__value">

                                    <button className="btn" type="button" onClick={() => handleAddProductToCart(product, quantity)}>Thêm vào giỏ hàng</button>
                                </span>
                            </div> */}
                        </div>


                        {/* <button type="button" onClick={() => handleAddProductToCart(product, 3)}>Thêm</button>
                        <button type="button" onClick={() => handleRemoveProductToCart(product._id)}>Xóa</button> */}
                    </div>
                    <div className="col l-3">
                        <div className="product-detail__shop">
                            <div className="product-detail__shop-title">
                                <h2>Thông tin cửa hàng</h2>
                            </div>
                            <div className="product-detail__shop-top">
                                <img className="product-detail__shop-image" src={shop.image?.path} alt="shop logo"/>
                                <div className="product-detail__shop-name">{shop.shopName}</div>
                            </div>
                            <div className="product-detail__shop-group">
                                <label className="product-detail__shop-label">Email:</label>
                                <span className="product-detail__shop-value">{shop.email}</span>
                            </div>
                            <div className="product-detail__shop-group">
                                <label className="product-detail__shop-label">Số điện thoại:</label>
                                <span className="product-detail__shop-value">{shop.phoneNumber}</span>
                            </div>
                            <div className="product-detail__shop-group">
                                <label className="product-detail__shop-label">Địa chỉ:</label>
                                <span className="product-detail__shop-value">
                                    { `${shop.address?.wardName}, ${shop.address?.districtName}, ${shop.address?.provinceName}` }
                                </span>
                            </div>

                            <div className="product-detail__shop-btn">
                                <Link to={`/shop/${shop._id}`} className='btn form-submit'>Vào cửa hàng</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col l-11 l-o-1">
                        <ProductsTab productTab={productTab} />
                    </div>
                </div>

                <div className="row">
                    <div className="col l-10 l-o-1">
                        
                    </div>
                </div>
            </div>
        </div>
        );
}

export default ProductDetail;
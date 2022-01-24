import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import "./Search.css";
import ProductsTabNoG from '../../components/Product/ProductsTabNoG/ProductsTabNoG';
import ShopsTab from '../../components/Shop/ShopTab/ShopTab';
import { setSubmit } from '../../../../app/submitSlice';


function Search(props) {
    const dispatch = useDispatch();
    const keyword = useSelector(state => state.keyword);
    const isSubmit = useSelector(state => state.isSubmit);
    const [isShowMore, setIsShowMore] = useState(false);
    const [isSubmitSearch, setIsSubmitSearch] = useState(false);


    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        minPrice: '',
        maxPrice: '',
        priceOrder: 0,
        categoryId: 0,
    });

    const [categories, setCategories] = useState([]);
    const [totalPage, setTotalPage] = useState();

    const [productTab, setProductTab] = useState(
        {
            title: 'Danh sách sản phẩm',
            products: [
                
            ]
        },
    );

    useEffect(() => {
        setParam({...param, page: 1});
        const url = `http://localhost:5000/api/products?page=1&pageSize=${param.pageSize}&keyword=${keyword}&minPrice=${param.minPrice}&maxPrice=${param.maxPrice}&priceOrder=${param.priceOrder}&categoryId=${param.categoryId}`;
        
        axios.get(url)
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess) {

                setProductTab({...productTab, products: res.data.data})
                setTotalPage(res.data.totalPage)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [isSubmit])

    // useEffect(() => {
    //     setParam({...param, page: 1});
    //     const url = `http://localhost:5000/api/products?page=${param.page}&pageSize=${param.pageSize}&keyword=${keyword}&minPrice=${param.minPrice}&maxPrice=${param.maxPrice}&priceOrder=${param.priceOrder}&categoryId=${param.categoryId}`;
        
    //     axios.get(url)
    //     .then(res => {
    //         console.log(res.data);
    //         if(res.data.isSuccess) {
    //             // const newProducts = productTab.products;
                
    //             // res.data.data.forEach(product => {
    //             //     console.log(product);
    //             //     newProducts.push(product)
    //             // })

    //             setProductTab({...productTab, products: res.data.data})
    //             setTotalPage(res.data.totalPage)
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }, [isSubmitSearch])

    useEffect(() => {
        const url = `http://localhost:5000/api/products?page=${param.page}&pageSize=${param.pageSize}&keyword=${keyword}&minPrice=${param.minPrice}&maxPrice=${param.maxPrice}&priceOrder=${param.priceOrder}&categoryId=${param.categoryId}`;
        
        axios.get(url)
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess) {
                const newProducts = productTab.products;
                
                res.data.data.forEach(product => {
                    console.log(product);
                    newProducts.push(product)
                })

                setProductTab({...productTab, products: newProducts})
                setTotalPage(res.data.totalPage)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [isShowMore])

    const [shopTab, setShopTab] = useState( 
        {
            title: 'Cửa hàng liên quan',
            shops: [
                {
                    image: {
                        path: "https://static.vecteezy.com/system/resources/thumbnails/003/346/398/small/shopping-store-or-market-icon-free-vector.jpg"
                    },
                    shopName: "Obito Shop",
                    _id: "61a70b56ed1e4aa62dc1c8a9",
                },
                {
                    image: {
                        path: "https://static.vecteezy.com/system/resources/thumbnails/003/346/398/small/shopping-store-or-market-icon-free-vector.jpg"
                    },
                    shopName: "ToMe Shop",
                    _id: "61a70b56ed1e4aa62dc1c8a9",
                },
                {
                    image: {
                        path: "https://static.vecteezy.com/system/resources/thumbnails/003/346/398/small/shopping-store-or-market-icon-free-vector.jpg"
                    },
                    shopName: "Doraemon Shop",
                    _id: "61a70b56ed1e4aa62dc1c8a9",
                },
                {
                    image: {
                        path: "https://static.vecteezy.com/system/resources/thumbnails/003/346/398/small/shopping-store-or-market-icon-free-vector.jpg"
                    },
                    shopName: "Nobita Shop",
                    _id: "61a70b56ed1e4aa62dc1c8a9",
                },
                {
                    image: {
                        path: "https://static.vecteezy.com/system/resources/thumbnails/003/346/398/small/shopping-store-or-market-icon-free-vector.jpg"
                    },
                    shopName: "Dorami Shop",
                    _id: "61a70b56ed1e4aa62dc1c8a9",
                },
            ]
        },
    );

    //http://localhost:5000/api/user/shop?page=1

    useEffect(() => {
        axios.get('http://localhost:5000/api/user/shop?page=1', {})
        .then(res => {
            if(res.data.isSuccess){
                setShopTab({...shopTab, shops: res.data.data})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/api/categories/', {})
        .then(res => {
            if(res.data.isSuccess){
                const data = res.data.data.map((item) => {
                    return { 
                        name: item.name,
                        id: item._id
                    }
                })

                setCategories(data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = setSubmit();
        dispatch(action)
    }

    const handleShowMore = () => {
        if(totalPage === 1 || param.page === totalPage) {
            return '';
        }
        else if(totalPage === 0) {
            return(
                <div className="col l-4 l-o-4">
                    <div className="no-product">Không có sản phẩm nào được tìm thấy</div>
                </div>
            )
        }
        else {
            return (
                <div className="col l-2 l-o-5">
                    <button onClick={() => {
                        setParam({...param, page: param.page + 1});
                        setIsShowMore(!isShowMore)
                    }} type='submit' className="form-submit">Xem thêm</button>
                </div>
            )
        }
    }

    return (
        <div className="body">
            <div className="grid wide search-page">
                <div className="search-result__title">Kết quả tìm kiếm cho: "{keyword}"</div>
                <div className="row no-gutters">
                    <div className="col l-12">
                        <div className="row no-gutters">
                            <ShopsTab shopTab={shopTab}/>
                        </div>
                    </div>
                </div>

                <div className="row no-gutters">
                    <div className="col l-2">
                        <div className="search-page__menu-list">
                            <div className="search-page__menu-list-title">Bộ lọc tìm kiếm</div>

                            <select value={param.categoryId} onChange={(e) => setParam({...param, categoryId: e.target.value})} className="price-order form-control width-100 mt-20">
                                <option value="">--Chọn loại sản phẩm--</option>
                                {categories.map((category, index) => {
                                    return (<option key={index} value={category.id}>{category.name}</option>)
                                })}
                            </select>

                            <select value={param.priceOrder} onChange={(e) => setParam({...param, priceOrder: e.target.value})}  className="price-order form-control width-100 mt-30">
                                <option value="0">--Sắp xếp giá--</option>
                                <option value="1">Thấp đến cao</option>
                                <option value="-1">Cao đến thấp</option>
                            </select>

                            <div htmlFor="min-price" className="ml-10 form-label mt-20">Giá từ:</div>
                            <input
                                value={param.minPrice.toLocaleString("vi")} 
                                onChange={(e) => setParam({...param, minPrice: e.target.value})} 
                                type="number" id="min-price" 
                                className="price-input align-right form-control width-100" 
                                placeholder="Giá bán thấp nhất" 
                            />
                            <div htmlFor="max-price" className="form-label mt-20">Đến</div>
                            <input
                                value={param.maxPrice.toLocaleString("vi")} 
                                onChange={(e) => setParam({...param, maxPrice: e.target.value})} 
                                type="number" id="max-price" 
                                className="price-input align-right form-control width-100" 
                                placeholder="Giá bán cao nhất" 
                            />

                            <button onClick={handleSubmit} type='button' className='form-submit'>Lọc sản phẩm</button>
                            {/* <button type='button' className='form-submit'>Tạo mới</button> */}
                        </div>
                    </div>

                    <div className="col l-10 search-product-result">
                        <ProductsTabNoG productTab={productTab}/>
                        
                        <div className="row">
                            {handleShowMore()}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
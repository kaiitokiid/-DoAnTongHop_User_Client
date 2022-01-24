import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


import "./Shop.css";
import ProductsTab from '../../components/Product/ProductsTab/ProductsTab';
import { setSubmit } from '../../../../app/submitSlice';
import { useDispatch } from 'react-redux';



function Shop(props) {
    const params = useParams();
    const dispatch = useDispatch();

    const [shopKeyword, setShopKeyword] = useState('');
    const isSubmit = useSelector(state => state.isSubmit);

    const [shop, setShop] = useState({});
    const [productTab, setProductTab] = useState(
        {
            title: 'Danh sách sản phẩm',
            products: [
                
            ]
        },
    );

    const [totalPage, setTotalPage] = useState();
    const [param, setParam] = useState({
        page: 1,
        pageSize: 15,
    });

    useEffect(() => {
        const url = `http://localhost:5000/api/products/shop-product/${shop._id}?page=${param.page}&pageSize=${param.pageSize}&keyword=${shopKeyword}`;
        
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
    }, [shop])
    

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${params.id}`, {})
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess) {
                setShop(res.data.data)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [params]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/products/shop-product/${shop._id}?page=1&pageSize=${param.pageSize}&keyword=${shopKeyword}`;
        
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
        setParam({...param, page: 1})
    }
    const showProductTab = (productTab) => {
        if(Object.keys(productTab).length > 0) {
            return  (<ProductsTab  productTab={productTab}/>)
        }
    }

    const handleShowMore = () => {
        if(totalPage === 1 || param.page === totalPage) {
            return '';
        }
        else if(totalPage === 0) {
            return(
                <div className="col l-4 l-o-4">
                    <div className="no-product mt-100 mb-250">Không có sản phẩm nào được tìm thấy</div>
                </div>
            )
        }
        else {
            return (
                <div className="col l-2 l-o-5">
                    <button onClick={() => {
                        setParam({...param, page: param.page + 1});
                        const action = setSubmit();
                        dispatch(action)
                    }} className="form-submit">Xem thêm</button>
                </div>
            )
        }
    }

    return (
        <div className="body">
            <div className="grid wide">
                <div className="shop-header" style={{background: `url(https://res.cloudinary.com/tome-ecommer/image/upload/v1639228190/Users/fa985917a5757f8b030ef28374d9f7c0_labccp.jpg)`}}>
                    <div className="row no-gutters">
                        <img className="shop-header__img" src={shop.image?.path} alt="logo shop" />
                        <div className="shop-header__shop-name">{shop.shopName}</div>
                    </div>
                    <div className="shop-header__contact">
                        <div>
                            <span className="shop-header__contact-item">
                                <span className='strong'>Số điện thoại:</span> {shop.phoneNumber}
                            </span>
                            <span className="shop-header__contact-item">
                                <span className='strong'>Email:</span> {shop.email}
                            </span>
                            <span className="shop-header__contact-item">
                                <span className='strong'>Địa chỉ:</span> {`${shop.address?.wardName}, ${shop.address?.districtName}, ${shop.address?.provinceName}`}
                            </span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input className='shop-input' type="text" value={shopKeyword} onChange={(e) => setShopKeyword(e.target.value)} placeholder='Tìm sản phẩm trong cửa hàng'/>
                            <button type='submit' className='shop-submit'></button>
                        </form>
                    </div>
                </div>

                <div className="row">
                    {showProductTab(productTab)}
                </div>
                <div className="row">
                    {handleShowMore()}
                </div>
            </div>
        </div>
    );
}

export default Shop;
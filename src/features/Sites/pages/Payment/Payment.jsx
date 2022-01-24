import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import './Payment.css'
import * as Error from '../../../constants/error';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../../app/userSlice'


const schema = yup.object().shape({
    username: yup.string().required(Error.REQUIRED_USERNAME),
    phoneNumber: yup.string().required(Error.REQUIRED_PHONENUMBER).matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, Error.REQUIRED_PHONENUMBER),
    addressInfo: yup.string().required(Error.REQUIRED_ADDRESSINFO),
    provinceName: yup.string().required(Error.REQUIRED_PROVINCE),
    districtName: yup.string().required(Error.REQUIRED_DISTRICT),
    wardName: yup.string().required(Error.REQUIRED_WARD),
})

function Payment(props) {
    document.title = "Tome - Thanh toán";

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate()
    const location = useLocation();
    let params = new URLSearchParams(location.search);

    const dispatch = useDispatch();
    const payment = useSelector(state => state.payment);

    const [totalPrice, setTotalPrice] = useState(0);
    const [provinceId, setProvinceId] = useState(-1);
    const [districtId, setDistrictId] = useState(-1);
    const [wardId, setWardId] = useState(-1);

    const [kindOfTransaction, setKindOfTransaction] = useState(0);
    
    const [provinces, setProvinces] = useState([]);
    const [wards, setWards] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const resultCode = params.get("resultCode");
        const momoId = params.get('requestId')

        if(resultCode === "0") {
            axios.post(`http://localhost:5000/api/transaction/save`, 
            {
                momoId
            })
            .then(res => {
                if(res.data.isSuccess) {
                    navigate("/payment-success");
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    })

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('TOKEN'));
        axios.post('http://localhost:5000/api/user/token',
            {
                token
            },
        )
            .then(res => {
                if (res.data.isSuccess) {
                    const action = getUser(res.data.data)
                    dispatch(action);

                    const data = res.data.data;

                    setProvinceId(data.address.provinceId);
                    setDistrictId(data.address.districtId);
                    setWardId(data.address.wardId);
                    setValue('provinceName', data.address.provinceName);
                    setValue('districtName', data.address.districtName);
                    setValue('wardName', data.address.wardName);
                    setValue('addressInfo', data.address.addressInfo);
                    
                    setValue('userId', data._id);
                    setValue('username', data.fullname);
                    setValue('phoneNumber', data.phoneNumber);
                }
                else {
                    navigate("/login");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleProvinceChange = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        setProvinceId(e.target.value);
        setValue('provinceName', e.nativeEvent.target[index].text);

        setDistrictId(-1);
        setValue('districtName', '');

        setWardId(-1);
        setValue('wardName', '');
    }

    const handleDistrictChange = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        setDistrictId(e.target.value);
        setValue('districtName', e.nativeEvent.target[index].text);
    }

    const handleWardChange = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        setWardId(e.target.value);
        setValue('wardName', e.nativeEvent.target[index].text);
    }


    useEffect(() => {
        axios.get('https://api.mysupership.vn/v1/partner/areas/province', {})
        .then(res => {
            if(res.data.status === 'Success') {
                const data = res.data.results.map((item) => {
                    return { 
                        id: item.code,
                        name: item.name,
                    }
                })

                setProvinces(data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceId}`, {})
        .then(res => {
            // console.log("district", res.data);
            if(res.data.status === 'Success') {
                const data = res.data.results.map((item) => {
                    return { 
                        id: item.code,
                        name: item.name,
                    }
                })

                setDistricts(data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [provinceId])

    useEffect(() => {
        axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtId}`, {})
        .then(res => {
            // console.log("ward", res.data);
            if(res.data.status === 'Success') {
                const data = res.data.results.map((item) => {
                    return { 
                        id: item.code,
                        name: item.name,
                    }
                })

                setWards(data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [districtId])

    useEffect(() => {
        const totalPrice = payment.reduce((total, item) => {
            return total + item.salePrice * item.quantity
        }, 0)

        setTotalPrice(totalPrice)
    }, [payment])

    const showProducts = (payment) => {
        let result = '';

        if(payment.length > 0) {
            result = payment.map(item => {
                return (
                    <div className="cart-item-group" key={item._id}>
                        <img className="cart-item-img" src={item.image?.path} alt="hinh anh san pham"/>
                        <div className="cart-item-name">
                            {item.name}
                        </div>

                        <div className="cart-item-price">
                            {item.salePrice.toLocaleString("vi")} đ
                        </div>

                        <div className="cart-item-quantity">
                            {item.quantity}
                        </div>

                        <div className="cart-item-price">
                            {(item.salePrice * item.quantity).toLocaleString("vi")} đ
                        </div>
                    </div>
                )
            })
        }

        return result;
    }

    const getListShopId = (cart) => {
        const listShopId = [];

        if(cart.length > 0) {
            cart.forEach(item => {
                if (!listShopId.includes(item.shopId)) {
                    return listShopId.push(item.shopId)
                }
            })
        }
        return listShopId;
    }

    const handleOnSubmit = (data, e) => {
        e.preventDefault();
        const shops = getListShopId(payment);
        var { userId, username, phoneNumber,...address } = data;
        console.log(username, address);
        console.log(data);
        console.log(payment);
        console.log(getListShopId(payment));
        console.log(kindOfTransaction);
        console.log(provinceId);
        console.log(districtId);
        console.log(wardId);

        axios.post(`http://localhost:5000/api/transaction/`, 
        {
            userId,
            username,
            phoneNumber,
            shops,
            address,
            products: payment,
            totalPrice,
            kindOfTransaction,
        })
        .then(res => {
            if(res.data.isSuccess) {
                if(kindOfTransaction === 1) {
                    window.location = res.data.url;
                }
                else {
                    setTimeout(() => {
                        navigate("/payment-success");
                    }, 1000)
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <div className="body">
            <div className="grid wide">
                <div className="search-result__title">Thanh toán</div>
                <div className="row no-gutters">
                    <form className="col l-9 l-o-2" onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="payment-title">1. Danh sách sản phẩm</div>

                        <div className="payment-group payment-menu-sub">
                            <div className="cart-item-group">
                                <div className="cart-item-img"></div>
                                <div className="cart-item-name"></div>

                                <div className="cart-item-price">Đơn giá</div>

                                <div className="cart-item-quantity">Số lượng</div>

                                <div className="cart-item-price">Thành tiền </div>
                            </div>
                        </div>

                        <div className="payment-group">
                            {showProducts(payment)}
                        </div>
                        <div className="payment-group">
                            <div className="payment-footer">
                                <div className="payment-footer__label">
                                    Tổng tiền:
                                </div>
                                <div className="payment-footer__total-price">
                                    {totalPrice.toLocaleString("vi")}
                                </div>
                            </div>
                        </div>

                        <div className="payment-title">2. Hình thức thanh toán</div>
                        <div className="payment-group">
                            <div className="row">
                                <div className="col l-6">
                                    <div className="payment__radio-group">
                                        <input className="payment-radio" checked={kindOfTransaction === 0} onChange={() => setKindOfTransaction(0)} name="kindOfTransaction" type="radio" />
                                        <img className="payment-img" src="https://hatsu.com.vn/wp-content/uploads/2018/08/cod.png" alt="Icon-MoMo" />
                                        <label className="payment__radio-label">Thanh toán tiền mặt khi nhận hàng</label>
                                    </div>
                                </div>
                                <div className="col l-6">
                                    <div className="payment__radio-group">
                                        <input className="payment-radio" name="kindOfTransaction" checked={kindOfTransaction === 1} onChange={() => setKindOfTransaction(1)} type="radio" />
                                        <img className="payment-img" src="https://laz-img-cdn.alicdn.com/tfs/O1CN0174CwSq2NjastWFX1u_!!19999999999999-2-tps.png" alt="Icon-MoMo" />
                                        <label className="payment__radio-label">Thanh toán bằng ví Momo</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="payment-title">3. Thông tin giao hàng</div>
                        <div className="payment-group">
                            <div className="row">
                                <div className="col l-5">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Tên người nhận hàng:</label>
                                        <input autoComplete="off" id="name" name="name" type="text" placeholder="Tên người nhận hàng" className="form-control"{...register("username", {})}/>
                                        <span className="form-message">{errors.username?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Số điện thoại:</label>
                                        <input autoComplete="off" id="name" name="name" type="text" placeholder="Số điện thoại" className="form-control" {...register("phoneNumber", {})}/>
                                        <span className="form-message">{errors.phoneNumber?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Địa chỉ:</label>
                                        <input autoComplete="off" id="name" name="name" type="text" placeholder="Địa chỉ" className="form-control" {...register("addressInfo", {})}/>
                                        <span className="form-message">{errors.addressInfo?.message}</span>
                                    </div>
                                </div>

                                <div className="col l-5 l-o-1">
                                    <div className="form-group">
                                        <label htmlFor="province" className="form-label">Tỉnh/Thành Phố:</label>
                                        <select name="province" className="price-order form-control" value={provinceId} onChange={handleProvinceChange}>
                                            <option value="-1">--Chọn Tỉnh/Thành Phố--</option>
                                            {provinces.map((province, index) => {
                                                return (<option key={index} value={province.id}>{province.name}</option>)
                                            })}
                                        </select>
                                        <span className="form-message">{errors.provinceName?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="district" className="form-label">Quận/Huyện</label>
                                        <select name="district" className="price-order form-control" value={districtId} onChange={handleDistrictChange
                                        }>
                                            <option value="-1">--Chọn Quận/Huyện--</option>
                                            {districts.map((district, index) => {
                                                return (<option key={index} value={district.id}>{district.name}</option>)
                                            })}
                                        </select>
                                        <span className="form-message">{errors.districtName?.message}</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ward" className="form-label">Phường/Xã:</label>
                                        <select name="ward" className="price-order form-control" value={wardId} onChange={handleWardChange}>
                                            <option value="-1">--Chọn Phường/Xã--</option>
                                            {wards.map((ward, index) => {
                                                return (<option key={index} value={ward.id}>{ward.name}</option>)
                                            })}
                                        </select>
                                        <span className="form-message">{errors.wardName?.message}</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="row no-gutters">
                            <div className="col l-4">
                                <button type="submit" className="form-submit">Đặt mua</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Payment;
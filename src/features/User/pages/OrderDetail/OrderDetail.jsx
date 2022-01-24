import axios from 'axios';
import React, { Fragment, useState} from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


import "./OrderDetail.css";

function OrderDetail(props) {
    const params = useParams();
    const [order, setOrder] = useState({})
    const [shop, setShop] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:5000/api/orders/get-order-by-id/${params.id}`, {})
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess){
                setOrder(res.data.data)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [params])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${order.shopId}`, {})
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess){
                setShop(res.data.data)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [order])

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('/');
    }

    function showTransaction(tran) {
        if(tran == '1')
            return "Thanh toán Momo"
        else {
            return "Thanh toán khi nhận hàng"
        }
    }

    function showStatus(status) {
        switch(status) {
            case 0: return <span className='label label-warning'>Chờ xác nhận</span>
            case 1: return <span className='label label-success'>Đã nhận</span>
            case 2: return <span className='label label-info '>Đang giao hàng</span>
            case 3: return <span className='label label-primary '>Đã giao hàng</span>
            case 9:  return <span className='label label-danger'>Đã hủy</span>
            default:
                return 'default'
        }
    }

    return (
        <>
            <div className="user-info__body-head">
                Chi tiết đơn hàng
            </div>

            <div className='user-info__body-info'>
                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Mã đơn hàng:
                    </div>
                    <div className='user-info__value'>
                        {order._id}
                    </div>
                </div>

                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Tên cửa hàng:
                    </div>
                    <div className='user-info__value'>
                        {shop.shopName}
                    </div>
                </div>
                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Liên hệ:
                    </div>
                    <div className='user-info__value'>
                        {shop.phoneNumber}
                    </div>
                </div>
                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Ngày đặt hàng:
                    </div>
                    <div className='user-info__value'>
                        {formatDate(order.createdAt)}
                    </div>
                </div>
                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Hình thức thanh toán:
                    </div>
                    <div className='user-info__value'>
                        {showTransaction(order.kindOfTransaction)}
                    </div>
                </div>
                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Trạng thái đơn hàng:
                    </div>
                    <div className='user-info__value'>
                        {showStatus(order.status)}
                    </div>
                </div>

                <h2 className='mt-20 mb-10'>Danh sách sản phẩm:</h2>
                <table id="customers">
                    <thead>
                        <tr>
                            <th style={{width: "180px"}}>Mã sản phẩm</th>
                            <th style={{width: "150px", textAlign: "center"}}>Hình ảnh sản phẩm</th>
                            <th style={{width: "300px", textAlign: "center"}}>Tên sản phẩm</th>
                            <th className="align-right" style={{width: "130px"}}>Giá bán</th>
                            <th className="align-right" style={{width: "110px"}}>Số lượng</th>
                            <th className="align-right">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!order.products || Object.keys(order.products).length === 0 ? (
                            <tr>
                                <td colSpan="9">
                                    <i className="fas fa-box-open"></i>
                                    Không có sản phẩm nào phù hợp
                                </td>
                            </tr>
                        ) : order.products.map(product => {
                            return (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>
                                        <img className="product-table__img" src={product.image.path} alt={product.name}/>
                                    </td>
                                    <td>{product.name}</td>
                                    <td className="align-right">{product.salePrice.toLocaleString("vi")} đ</td>
                                    <td className="align-right">{product.quantity.toLocaleString("vi")} sản phẩm</td>
                                    <td className="align-right">{(product.salePrice * product.quantity).toLocaleString("vi")} đ</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </ >
    );
}

export default OrderDetail;
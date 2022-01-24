import axios from 'axios';
import React, { Fragment, useState} from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import "./OrderHistory.css";

function OrderHistory(props) {
    const user = useSelector(state => state.user);

    const [orders, setOrders] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        const url = `http://localhost:5000/api/orders/get-order-by-user-id/${user._id}`;
        
        axios.get(url,{})
        .then(res => {
            console.log(res.data);
            if(res.data.isSuccess){
                setOrders(res.data.data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [isSubmit])

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

    function handleCancelOrder(e, id) {
        const result = window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng ${id}`);

        if(result) {
            e.preventDefault()

            axios.post(`http://localhost:5000/api/orders/change-state/${id}`, {status: 9})
            .then(res => {
                console.log(res.data);
                if(res.data.isSuccess){
                    alert(`Xóa đơn hàng ${id} thành công`);
                    setIsSubmit(!isSubmit);
                }
            })
            .catch(err => {
                console.log(err);
            })
            
        }
    }

    return (
        <Fragment>
            <div className="user-info__body-head">
                Lịch sử đơn hàng
            </div>

            <div className='user-info__body-info ml--40'>
                <table id="customers">
                    <thead>
                        <tr>
                            <th style={{width: "180px"}}>Mã đơn hàng</th>
                            <th className="align-right" style={{width: "150px"}}>Tổng giá đơn hàng</th>
                            <th className="align-right">Ngày đặt hàng</th>
                            <th className="align-right" style={{width: "200px"}}>Phương thức thanh toán</th>
                            <th className="align-right" >Trạng thái</th>
                            <th style={{width: "100px"}}></th>
                            <th style={{width: "100px"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!orders || Object.keys(orders).length === 0 ? (
                            <tr>
                                <td colSpan="9">
                                    <i className="fas fa-box-open"></i>
                                    Không có đơn hàng nào phù hợp
                                </td>
                            </tr>
                        ) : orders.map(order => {
                            return (
                                <tr key={order._id}>
                                    <td className='order-list-padding'>{order._id}</td>
                                    <td className="align-right">{order.totalPrice.toLocaleString("vi")} đ</td>
                                    <td className="align-right">{formatDate(order.createdAt)}</td>
                                    <td className="align-right">{showTransaction(order.kindOfTransaction)}</td>
                                    <td className="align-right">{showStatus(order.status)}</td>
                                    <td className='text-center'>
                                        <Link to={`/user/order/${order._id}` }className="btn my-btn btn_info form-submit">Chi tiết</Link>
                                    </td>
                                    <td className='text-center'>
                                        {order.status === 0 && <button to={''} onClick={(e) => handleCancelOrder(e, order._id)} className="btn-cancel btn_danger form-submit">Hủy bỏ</button>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default OrderHistory;
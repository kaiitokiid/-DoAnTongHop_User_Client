import React, { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './PaymentSuccess.css';
import { removeItem } from '../../../../app/cartSlice';
import { resetPayment } from '../../../../app/paymentSlice';

function PaymentSuccess(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const payment = useSelector(state => state.payment);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timerId = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1500)

        return () => {
            clearInterval(timerId);
        }
    }, [])

    useEffect(() => {

        payment.forEach(product => {
            dispatch(removeItem(product._id))
        });

        dispatch(resetPayment);

        const timerId = setTimeout(() => {
            navigate('/home');
        }, 1500 * 5)

        return () => {
            clearTimeout(timerId);
        }
    }, [])

    return (
        <div className='body'>
            <div className='grid wide'>
                <div className='row no-gutters'>
                    <div className='col l-4 l-o-4'>
                        <div className='payment-success'>
                            <h1 className='payment-success__head'>Đặt hàng thành công!</h1>
                            <div className='payment-success__mid'>Cảm ơn quý khách đã mua hàng tại <span className='tome'>ToMe</span></div>
                            <div className='payment-success__bot' onClick={() => navigate('/home')}>
                                <i className="fas fa-arrow-left"></i>&nbsp;Trở về trang chủ sau {countdown}s
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
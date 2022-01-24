import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import './Register.css';
import * as Error from '../../../constants/error';
import { changeStateHeader } from '../../../../app/headerSlice'
import HeaderLogo from '../../../../components/HeaderLogo/HeaderLogo';

const schema = yup.object().shape({
    username: yup.string().required(Error.REQUIRED_USERNAME),
    password: yup.string().required(Error.REQUIRED_PASSWORD).min(4, Error.MIN_MAX).max(16, Error.MIN_MAX),
    confirmPassword: yup.string().oneOf([yup.ref("password")], Error.REQUIRED_CONFIRMPASSWORD).required(Error.REQUIRED_CONFIRMPASSWORD).min(4, Error.MIN_MAX).max(16, Error.MIN_MAX),
    fullname: yup.string().required(Error.REQUIRED_FULLNAME),
    phoneNumber: yup.string().required(Error.REQUIRED_PHONENUMBER).matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, Error.REQUIRED_PHONENUMBER),
    email: yup.string().required(Error.REQUIRED_EMAIL).email(Error.IS_EMAIL),
})

function Register() {
    const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();

    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');

    useEffect(() => {
        document.title = "ToMe - Đăng ký"
        const action = changeStateHeader(false);
        dispatch(action)
        setFocus("username");
        return () => dispatch(changeStateHeader(true))
    }, [])

    const handleOnSubmit = (data) => {
        console.log(data);
        setServerError('');
        setServerSuccess('');
        axios.post('http://localhost:5000/api/user/register',
            {
                ...data
            },
        )
        .then(res => {
            console.log("Register: ", res.data);
            if(res.data.isSuccess){
                setServerSuccess(res.data.message);
                setFocus("username");
                reset();
            }
            else {
                setServerError(res.data.message)
                setFocus("username");
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <Fragment>
            <HeaderLogo />
            <div className="register-page">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-8"></div>
                        <div className="col l-4">
                            <div className="main-login">
                                <form className="form"
                                    onSubmit={handleSubmit(handleOnSubmit)}
                                >
                                    <h3 className="form-heading">Đăng ký</h3>
                                
                                    <div className="spacer"></div>
                                
                                    <div className="form-group">
                                        <label htmlFor="username" className="form-label">Tài khoản</label>
                                        <input autoComplete="off" id="username" name="username" type="text" placeholder="Nhập tài khoản" className="form-control"
                                        {...register("username", {})}
                                        />
                                        <span className="form-message">{errors.username?.message}</span>
                                    </div>
                                
                                    <div className="form-group">
                                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                                        <input autoComplete="off" id="password" name="password" type="password" placeholder="Nhập mật khẩu" className="form-control"
                                        {...register("password", {})}
                                        />
                                        <span className="form-message">{errors.password?.message}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                                        <input autoComplete="off" id="confirmPassword" name="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" className="form-control"
                                        {...register("confirmPassword", {})}
                                        />
                                        <span className="form-message">{errors.confirmPassword?.message}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fullname" className="form-label">Họ và tên</label>
                                        <input autoComplete="off" id="fullname" name="fullname" type="text" placeholder="Họ và tên" className="form-control"
                                        {...register("fullname", {})}
                                        />
                                        <span className="form-message">{errors.fullname?.message}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                                        <input autoComplete="off" id="phoneNumber" name="phoneNumber" type="text" placeholder="Số điện thoại" className="form-control"
                                        {...register("phoneNumber", {})}
                                        />
                                        <span className="form-message">{errors.phoneNumber?.message}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input autoComplete="off" id="email" name="email" type="email" placeholder="Email" className="form-control"
                                        {...register("email", {})}
                                        />
                                        <span className="form-message">{errors.email?.message}</span>
                                    </div>
                                    <span className="form-message__server form-message--error">{serverError}</span>
                                    <span className="form-message__server form-message--success">{serverSuccess}</span>
                                
                                    <input type="submit" value="Đăng ký" className="form-submit" />
                                    <p className="form-conf">Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;
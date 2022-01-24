import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';


import "./UserInfo.css";

function UserInfo(props) {
    const user = useSelector(state => state.user);
    console.log(user);
    return (
        <Fragment>
            <div className="user-info__body-head">
                Thông tin cá nhân
            </div>

            <div className='user-info__body-info'>
                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Họ và tên:
                    </div>
                    <div className='user-info__value'>
                        {user.fullname}
                    </div>
                </div>

                <div className='user-info__group'>
                    <div className='user-info__label'>
                       Email:
                    </div>
                    <div className='user-info__value'>
                        {user.email}
                    </div>
                </div>

                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Số điện thoại:
                    </div>
                    <div className='user-info__value'>
                        {user.phoneNumber}
                    </div>
                </div>

                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Tỉnh/Thành phố:
                    </div>
                    <div className='user-info__value'>
                        {user.address?.provinceName}
                    </div>
                </div>
                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Quận/Huyện:
                    </div>
                    <div className='user-info__value'>
                        {user.address?.districtName}
                    </div>
                </div>
                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Phường/Xã:
                    </div>
                    <div className='user-info__value'>
                        {user.address?.wardName}
                    </div>
                </div>
                <div className='user-info__group'>
                    <div className='user-info__label'>
                        Địa chỉ:
                    </div>
                    <div className='user-info__value'>
                        {user.address?.addressInfo}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default UserInfo;
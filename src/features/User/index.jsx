import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import NotFound from '../../components/NotFound';
import UserInfo from './pages/UserInfo/UserInfo';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import EditInfo from './pages/EditInfo/EditInfo';
import ChangePassword from './pages/ChangePassword/ChangePassword';

import './index.css';
import OrderDetail from './pages/OrderDetail/OrderDetail';

function Products(props) {
  const user = useSelector(state => state.user);

return (
    <Fragment>
    <div className='modal-change-image'>
		<div className='modal-container'>
			Container

			<label className="form-submit btn-default btn-file">
				Chọn hình ảnh <input type="file" />
			</label>
		</div>
      </div>
      <div className='body'>
        <div className='grid wide'>
          <div className='row'>
            <div className='col l-3'>
              <div className='user-info__left'>
                <img className='user-info__img' src={user.image?.path} alt="avatar user"></img>
                <div className='user-info__btn-block'>
                  <button className='form-submit'>Đổi avatar</button>
                </div>

                <ul className='user-info__nav'>
                  <li className='user-info__nav-items'>
                    <Link to='/user'>Thông tin cá nhân</Link>
                  </li>
                  <li className='user-info__nav-items'>
                    <Link to='/user/order-history'>Lịch sử đơn hàng</Link>
                  </li>
                  <li className='user-info__nav-items'>
                    <Link to='/user/change-info'>Thay đổi thông tin cá nhân</Link>
                  </li>
                  <li className='user-info__nav-items'>
                    <Link to='/user/change-pasword'>Thay đổi mật khẩu</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className='col l-9'>
              <div className='user-info__body'>
                <Routes>
                    <Route path="" element={<UserInfo />} >
                      
                    </Route>
                    <Route path="/order-history" element={<OrderHistory />} />
                    <Route path="/change-info" element={<EditInfo />} />
                    <Route path="/change-pasword" element={<ChangePassword />} />
                    <Route path="/order/:id" element={<OrderDetail />} />
                    
                    <Route path="not-found" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Products;
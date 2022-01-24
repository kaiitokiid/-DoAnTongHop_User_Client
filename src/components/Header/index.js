import React, { Fragment, useEffect } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./Header.css";
import { removeUser, getUser } from '../../app/userSlice'
import { setKeyword } from '../../app/keywordSlice'
import { setSubmit } from '../../app/submitSlice'

function Header(props) {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const keyword = useSelector(state => state.keyword);
    const dispatch = useDispatch();

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
                    dispatch(action)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleLogout = () => {
        localStorage.setItem('TOKEN', JSON.stringify('a'));
        const action = removeUser();
        dispatch(action);
    }

    const showUser = () => {
        if (Object.keys(user).length === 0)
            return (
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link to='/register'>Đăng ký</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to='/login'>Đăng nhập</Link>
                    </li>
                </ul>
            )
        else
            return (
                <ul className="navbar-list">
                    <li className="navbar-item header-user-name">
                        <Link to='/user'>
                            <img className="user-avatar" src={user.image.path} alt="abc" />
                            {user.fullname}
                            &nbsp;
                            <i className="fas fa-caret-down header-user-icon"></i>
                            {/* <i className="far fa-file-alt header-user-icon"></i> */}
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <div onClick={handleLogout}>Đăng xuất</div>
                    </li>
                </ul>
            )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setSubmit())
        navigate('/search')
    }

    return (
        <header className="header">
            <div className="grid wide">
                <div className="header-top">
                    <ul className="navbar-list">
                        <li className="navbar-item">
                            <a href='http://localhost:3001/'>Kênh người bán</a>
                        </li>
                        <li className="navbar-item">
                            <a href='http://localhost:3001/register'>Trở thành người bán hàng</a>
                        </li>
                        <li className="navbar-item">
                            <a href='http://localhost:4000/'>Kết nối</a>
                        </li>
                    </ul>
                    {showUser()}
                </div>
                <div className="header-bottom">
                    <div className="header__logo">
                        <Link to="/" >
                            <img src={require(`../../assets/ToMe-white.png`).default} alt="logo" />
                        </Link>
                    </div>
                    <form className="header__search" onSubmit={handleSubmit}>
                        <div className="header__search-input-wrap">
                            <input type="text" className="header__search-input" value={keyword} onChange={(e) => dispatch(setKeyword(e.target.value))} name='keyword' autoComplete='off' placeholder="Tìm kiếm sản phẩm..." />
                        </div>

                        <button type='submit' className="header__search-btn">
                            <i className="header__search-btn-icon fas fa-search"></i>
                        </button>
                    </form>

                    <div className="header__cart">
                        <div className="header__cart-icon-wrap">
                            <i className="fas fa-shopping-cart header__cart-icon"></i>

                            <span className="header__cart-notice">{cart.length}</span>

                            <div className="header__cart-list">
                                {cart.length === 0 ?
                                    <div className="header__cart--empty">
                                        <img src="https://theme.hstatic.net/1000223886/1000288172/14/empty_cart.png?v=1108" alt="empty" className="header__cart-img--empty" />
                                        <p className="header__cart-msg--empty">Bạn chưa có sản phẩm nào</p>
                                    </div>
                                    :
                                    <>
                                        {/* <!--Cart items--> */}
                                        <h3 className="header__cart-header">
                                            Sản phẩm đã thêm
                                        </h3>
                                        <ul className="header__cart-list-item">
                                            {cart.length > 0 &&
                                                cart.map((item, index) => {
                                                    return (
                                                        <li key={index} className="header__cart-item">
                                                            <img src={item.product.image.path} alt={item.product.image.title} className="header__cart-img" />
                                                            <div className="header__cart-item-info">
                                                                <div className="header__cart-item-top">
                                                                    <h5 className="header__cart-item-name">
                                                                        {item.product.name}
                                                                    </h5>
                                                                    <span className="header__cart-item-price">
                                                                        {item.product.salePrice.toLocaleString("vi")}đ x {item.quantity}
                                                                    </span>
                                                                </div>

                                                                <div className="header__cart-item-bottom">
                                                                    <p className="header__cart-item-dsc">
                                                                        {item.product.name}
                                                                    </p>
                                                                    <span className="header__cart-item-delete">Xóa</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>

                                        <div className="header__cart-btn">
                                            <button onClick={() => navigate("/cart")} className="btn btn--primary">Xem giỏ hàng</button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
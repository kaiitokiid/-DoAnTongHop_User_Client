import React, { Fragment, useEffect, useState } from 'react';
import ProductsTab from '../../components/Product/ProductsTab/ProductsTab';
import axios from 'axios';
// import { useParams, useLocation, useNavigate } from "react-router-dom";
import './Home.css'

function Home(props) {
    const [productTabs, setProductTabs] = useState([
        {
            title: 'Sản phẩm nổi bật',
            products: [

            ]
        },
        {
            title: 'Sản phẩm tìm kiếm nhiều',
            products: [

            ]
        },
        {
            title: 'Sản phẩm bán chạy',
            products: [

            ]
        },
    ]);

    useEffect(() => {
        document.title= 'ToMe - Trang chủ';
        axios.get(`http://localhost:5000/api/products/featured`
        )
        .then(res => {
            if(res.data.isSuccess){
                const newProductTabs = [...productTabs];

                res.data.data.forEach(item => {
                    newProductTabs[0].products.push(item)
                })
                
                setProductTabs(newProductTabs)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/featured`
        )
        .then(res => {
            if(res.data.isSuccess){
                const newProductTabs = [...productTabs];

                res.data.data.forEach(item => {
                    newProductTabs[2].products.push(item)
                })
                
                setProductTabs(newProductTabs)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/most-search`
        )
        .then(res => {
            if(res.data.isSuccess){
                const newProductTabs = [...productTabs];

                res.data.data.forEach(item => {
                    newProductTabs[1].products.push(item)
                })
                return setProductTabs(newProductTabs);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const showListProduct = (productTabs) => {
        let result = '';

        if(productTabs.length > 0) {
            result = productTabs.map((productTab, index) => {
                return <ProductsTab productTab={productTab} key={index}/>
            })
        }

        return result
    }

    return (
        <Fragment>
            <div className="body">
                <div className="grid wide">
                    <div>
                        {showListProduct(productTabs)}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Home;
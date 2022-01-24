import React from 'react';
import { Fragment } from 'react';

import ShopItem from '../ShopItem/ShopItem'

function ShopsTab(props) {
    const { shopTab } = props;

    const showShopsItem = (shops) => {
        var result = null;

        result = shops.map((shop, index) => {
            return (
                <ShopItem shop={shop} key={index} />
            );
        })

        return result;
    }

    return (
        <Fragment>
            <div className="productTab-container" >
                <div className="title">
                    <div>
                        {shopTab.title}
                    </div>
                </div>

                <div className="row no-gutters">
                    {showShopsItem(shopTab.shops)}
                </div>
            </div>
        </Fragment>

    );
}

export default ShopsTab;
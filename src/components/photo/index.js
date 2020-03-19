/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React, { useState, useEffect } from 'react';
import queryString                    from 'query-string';
import { CircularProgress, Backdrop } from '@material-ui/core';

// Components
import Item                           from './item';

// Stylesheets
import './style.scss';

export default ({ query="", data=[], loading=false, handleCurrentIndex }) => {

    const queryToObject = queryString.parse(query);
    const { orientation="", searchType="photos" } = queryToObject;

    return( 
        <div className="unit-row">
            <div className={`photo-wrap ${searchType}`} data-center={loading}>
                {   
                    data.length>0? (
                        data.map((item,i) => {
                            return(
                                <Item 
                                    key                = {item['id']}
                                    index              = {i}
                                    loading            = {loading}
                                    orientation        = {orientation}
                                    handleCurrentIndex = {handleCurrentIndex}
                                    {...item}
                                />
                            );
                        })
                    ):(
                        <div className="no-data">查無此相關圖片</div>
                    )
                }
                <Backdrop className={'test'} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
    );
}
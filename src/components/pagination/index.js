/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React                               from 'react';
import { Pagination }                      from '@material-ui/lab';

export default ({ count=1, page=1, handlePagination }) => {
    return(
        <div className="unit-row" data-center="true">
            <Pagination 
                count            = {count} 
                page             = {page} 
                onChange         = {(e,val) => handlePagination(val)}
            />
        </div>
    );
}
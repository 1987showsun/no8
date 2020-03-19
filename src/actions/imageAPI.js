/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import queryString                         from 'query-string';
import axios                               from 'axios';

import PHOTO_CONFIG                        from '../public/setup/apiset';

export const SIM_CALL_API = ({ query='', current }) => {

    const QUERY     = query==''? '' : `&${query}&page=${current}`;
    const PATH_KEY  = query.indexOf('query')==-1? 'nomal':'search';

    return axios({
        url    : `${PHOTO_CONFIG['path'][PATH_KEY]}`,
        method : 'get',
        params : {
          client_id  : PHOTO_CONFIG['key'],
          ...queryString.parse(QUERY)
        }
    }).then( res => {
        return res = {...res, PATH_KEY};
    }).catch( err => err['response']);
}
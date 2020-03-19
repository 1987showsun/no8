/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import queryString                         from 'query-string';
import axios                               from 'axios';

import PHOTO_CONFIG                        from '../public/setup/apiset';

export const SIM_CALL_API = ({ query='', current }) => {

    const queryObject  = queryString.parse(query);
    const QUERY        = query==''? '' : `&${query}&page=${current}`;
    const PATH_KEY     = query.indexOf('query')==-1? 'nomal':'search';
    const URL          = PATH_KEY=='nomal'? PHOTO_CONFIG['path'][PATH_KEY] : `${PHOTO_CONFIG['path'][PATH_KEY]}${queryObject['searchType']}`;

    return axios({
        url    : URL,
        method : 'get',
        params : {
          client_id  : PHOTO_CONFIG['key'],
          ...queryString.parse(QUERY)
        }
    }).then( res => {
        return res = {...res, PATH_KEY};
    }).catch( err => err['response']);
}


export const REMERGE_DATA = ( query="", data=[] ) => {

    const queryObject  = queryString.parse(query);
    const { searchType } = queryObject;

    return data.map((item, i) => {

        if( searchType=="photos" || query.indexOf('query')==-1 ){
            return {
                id    : item['id'],
                name  : item['alt_description'],
                cover : item['urls']['thumb'],
                type  : searchType
            }
        }else{
            return{
                id    : item['id'],
                name  : item['name'],
                cover : item['profile_image']['large'],
                type  : searchType
            }
        }

        // switch( searchType) {
        //     case 'photos':
        //         return {
        //             id    : item['id'],
        //             name  : item['alt_description'],
        //             cover : item['urls']['thumb'],
        //             type  : searchType
        //         }
        //         break;

        //     default :
        //         return{
        //             id    : item['id'],
        //             name  : item['name'],
        //             cover : item['profile_image']['large'],
        //             type  : searchType
        //         }
        //         break;
        // }
    })
}
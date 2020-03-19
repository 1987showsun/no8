/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React,{ useState, useEffect }       from 'react';
import ReactDOM                            from 'react-dom';
import Lightbox from 'react-image-lightbox';

// Components
import From                                from './components/form/search';
import Photo                               from './components/photo';
import Popup                               from './components/popup';
import Pagination                          from './components/pagination';
import Footer                              from './components/common/footer';

// Actions
import { SIM_CALL_API }                    from './actions/imageAPI';

// stylesheets
import './public/stylesheets/style.scss';
import 'react-image-lightbox/style.css';

const Index = () => {

  const [ lightboxImage  , setLightboxImage   ] = useState([]);
  const [ lightboxCurrent, setlightboxCurrent ] = useState(-1);
  const [ query          , setQuery           ] = useState('');
  const [ data           , setData            ] = useState([]);
  const [ other          , setOther           ] = useState({total: 16000, total_pages: 4000});
  const [ current        , setCurrent         ] = useState(1);
  const [ dialogSwitch   , setDialogSwitch    ] = useState(false);
  const [ loading        , setLoading         ] = useState(false);

  useEffect(()=> {    
    if( query!='' ){
      setLoading( true );
      SIM_CALL_API({ query, current }).then( res => {
        const { data, PATH_KEY } = res;
        switch(PATH_KEY){
          case 'nomal':
            setData(data);
            setOther({ total: 16000 , total_pages: 4000 });
            setLightboxImage(data.map( item => item['urls']['regular']));
            break;

          default:
            const total       = data['total']!=0? data['total']: 1;
            const total_pages = data['total_pages']!=0? data['total_pages'] : 1;
            setData(data['results']);
            setOther({ total, total_pages });
            setLightboxImage(data['results'].map( item => item['urls']['regular']));
            if( current>total_pages ){
              setCurrent( total_pages );
            }
            break;
        }

        setLoading( false );
      })
    }
  },[query, current]);

  const { total_pages } = other;

  return(
    <>
      <From
        current            = {current}
        handlePopup        = {(val) => setDialogSwitch(val)}
        handleForm         = {(val) => setQuery(val)}
      />

      <Photo
        query              = {query}
        data               = {data}
        loading            = {loading}
        handleCurrentIndex = {(val) => setlightboxCurrent(val)}
      />

      <Pagination 
        count              = {total_pages} 
        page               = {current}
        handlePagination   = {(val) => setCurrent(val)}
      />

      <Footer />

      <Popup 
        query              = {query}
        dialogSwitch       = {dialogSwitch}
        handleDialogSwitch = {(val) => setDialogSwitch(val)}
      />

      {
        lightboxCurrent!=-1 &&
          <Lightbox
            mainSrc          = {lightboxImage[lightboxCurrent]}
            nextSrc          = {lightboxImage[(lightboxCurrent + 1) % lightboxImage.length]}
            prevSrc          = {lightboxImage[(lightboxCurrent + lightboxImage.length - 1) % lightboxImage.length]}
            onCloseRequest   = {() => setlightboxCurrent(-1)}
            onMovePrevRequest= {() => setlightboxCurrent((lightboxCurrent + lightboxImage.length - 1) % lightboxImage.length)}
            onMoveNextRequest= {() => setlightboxCurrent((lightboxCurrent + 1) % lightboxImage.length)}
          />
      }
    </>
  );
}

ReactDOM.render(<Index/>, document.getElementById('root'));
/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React, { useState, useEffect, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default (props) => {
    
    const block = useRef(null);
    const { name, cover, type, orientation } = props;
    const [ blockHeight, setHeight ] = useState(100);

    useEffect(()=>{
        const resizeFunction = () => {
            if( !props.loading ){
                const current = block.current;
                const block_w = $(current).width();
                if( type=='photos' ){
                    switch( orientation ){
                        case 'portrait':
                            setHeight( block_w*(6/5) );     
                            break;

                        case 'squarish':
                            setHeight( block_w );
                            break;

                        default:
                            setHeight( block_w/(16/9) ); 
                            break;
                    } 
                }else{
                    setHeight( block_w );
                }
            }
        }

        resizeFunction();
        window.addEventListener('resize', resizeFunction);
        return () => {
            resizeFunction();
            window.removeEventListener('resize', resizeFunction);
        }
    
    },[orientation, props.loading]);
    
    return(
        <div className="photo-item" onClick={()=>props.handleCurrentIndex(props.index)}>
            <figure>
                <div ref={block} className="img" style={{height: `${blockHeight}px`}}>
                    <LazyLoadImage
                        src     = {cover}
                        alt     = {name}
                        title   = {name}
                        effect  = "blur"
                    />
                </div>
                <figcaption>
                    <h3>{name}</h3>
                </figcaption>
            </figure>
        </div>
    );
}
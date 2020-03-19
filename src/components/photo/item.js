/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React, { useState, useEffect, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default (props) => {
    
    const block = useRef(null);
    const { id, alt_description, urls, links, width, height, orientation } = props;
    const { raw, full, regular, small, thumb } = urls;
    const [ blockHeight, setHeight ] = useState(100);

    useEffect(()=>{
        const resizeFunction = () => {
            if( !props.loading ){
                const current = block.current;
                const block_w = $(current).width();
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
                        src     = {thumb}
                        alt     = {alt_description}
                        title   = {alt_description}
                        effect  = "blur"
                    />
                </div>
                <figcaption>
                    <h3>{alt_description}</h3>
                </figcaption>
            </figure>
        </div>
    );
}
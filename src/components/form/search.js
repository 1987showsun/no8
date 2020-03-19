/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React,{ useState, useEffect }                       from 'react';
import queryString                                         from 'query-string';
import { Button, TextField, Select, MenuItem }             from '@material-ui/core';

export default ({ handlePopup, handleForm }) => {
    const [ form, setForm ] = useState({
        query       : '',
        orientation : '',
        per_page    : 15
    });

    const clearNullForm = ( val ) => {
        let   test = {};
        const checkFormKeyNull = Object.keys( val ).filter( key => val[key].toString().trim()!='' );
        checkFormKeyNull.forEach( key => {
            test = { ...test, [key]: val[key] };
        })
        
        return queryString.stringify(test);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        const filterNullForm = clearNullForm(form);
        handleForm(filterNullForm);
        if( filterNullForm.indexOf('query')>-1 ){
            handlePopup(true);
        }
    }

    useEffect(()=>{
        handleForm(clearNullForm(form));
    },[]);

    useEffect(()=>{
        handleForm(clearNullForm(form));
    },[form['per_page'],form['orientation']]);

    const { query, per_page, orientation } = form;

    return(
        <div className="unit-row unit-head" data-fixed="true">
            <form className="search-form" onSubmit={ handleSubmit.bind(this) } style={{backgroundColor: '#fff'}}>
                <ul>
                    <li>
                        <TextField type="text"   name="query" value={query} onChange={handleChange.bind(this)} placeholder="搜尋關鍵字"/>
                    </li>
                    <li>
                        <Button type="submit" variant="contained" color="primary">搜尋</Button>
                    </li>
                </ul>
                <ul>
                    <li>
                        <label>顯示數量</label>
                        <Select name="per_page" value={per_page} onChange={handleChange.bind(this)}>
                            <MenuItem value="15">15</MenuItem>
                            <MenuItem value="20">20</MenuItem>
                            <MenuItem value="25">25</MenuItem>
                            <MenuItem value="30">30</MenuItem>
                        </Select>
                    </li>
                    {
                        query!='' &&
                            <li>
                                <label>圖片方向</label>
                                <Select name="orientation" value={orientation} displayEmpty onChange={handleChange.bind(this)} className="MuiInput-unline">
                                    <MenuItem value="">不拘</MenuItem>
                                    <MenuItem value="landscape">橫向</MenuItem>
                                    <MenuItem value="portrait">直向</MenuItem>
                                    <MenuItem value="squarish">方形</MenuItem>
                                </Select>
                            </li>
                    }
                </ul>
            </form>
        </div>
    );
}
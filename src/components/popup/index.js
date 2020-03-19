/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React from 'react';
import queryString from 'query-string';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export default ({query, dialogSwitch, handleDialogSwitch}) => {
    return(
        <Dialog onClose={()=> handleDialogSwitch(false)} open={dialogSwitch}>
            <DialogTitle id="alert-dialog-slide-title">你所輸入要搜尋的文字</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">{queryString.parse(query)['query']}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> handleDialogSwitch(false)} color="primary">CLOSE</Button>
            </DialogActions>
        </Dialog>
    );
}
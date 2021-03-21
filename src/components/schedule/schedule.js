import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './sidebar/sidebar';
import TabPanel from './tab-panel/tab-panel';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%'
    },
}));

export default function Schedule () {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div style={{width: '160px'}}>
                <Sidebar />
            </div>
            <div style={{width: 'calc(100% - 160px)', overflow: 'auto'}}>
                <TabPanel />
            </div>
        </div>
    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './components/sidebar/sidebar';
import TabPanel from './components/tab-panel/tab-panel';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        maxHeight: '80vh',
    },
}));

export default function App () {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Sidebar />
            <TabPanel />
        </div>
    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './components/sidebar/sidebar';
import TabPanel from './components/tab-panel/tab-panel';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        width: '80%',
        margin: '10vh auto',
        height: '80vh',
        border: '1px solid lightgray',
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
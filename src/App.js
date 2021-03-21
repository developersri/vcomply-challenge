import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Navbar from './components/navbar/navbar';
import Schedule from './components/schedule/schedule';
import Holidays from './components/holidays/holidays';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: '10vh auto',
        height: '80vh',
        boxSizing: 'border-box',
        border: '1px solid lightgray',

        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
}));

function App (props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div style={{width: '200px'}}>
                <Navbar />
            </div>
            <div style={{width: 'calc(100% - 200px)'}}>
                { props.activeTab === 0 && <Schedule /> }
                { props.activeTab === 1 && <Holidays /> }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        activeTab: state.navbar.activeTab,
    }
}

export default connect(mapStateToProps, null)(App);
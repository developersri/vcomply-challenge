import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Navbar from './components/navbar/navbar';
import Schedule from './components/schedule/schedule';

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
            <Navbar />
            { props.activeTab === 0 && <Schedule /> }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        activeTab: state.navbar.activeTab,
    }
}

export default connect(mapStateToProps, null)(App);
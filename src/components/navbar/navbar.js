import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

function getTabProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

function Navbar (props) {
    const classes = useStyles();

    return (
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={props.activeTab}
            onChange={(event, newValue) => { props.setNavTab(newValue) }}
            aria-label="Vertical tabs example"
            className={classes.tabs}
        >
            <Tab label="Schedule" {...getTabProps(0)} />
            <Tab label="Weekly offs / Holidays" {...getTabProps(1)} />
            <Tab label="Records" {...getTabProps(2)} />
        </Tabs>
    );
}

const mapStateToProps = state => {
    return {
        activeTab: state.navbar.activeTab,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNavTab: (tabIndex) => { dispatch(actions.setNavTab(tabIndex)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
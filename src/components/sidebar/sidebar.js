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

function Sidebar (props) {
    const classes = useStyles();

    return (
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={props.activeTab}
            onChange={(event, newValue) => { props.setActiveTab(newValue) }}
            aria-label="Vertical tabs example"
            className={classes.tabs}
        >
            <Tab label="Daily" {...getTabProps(0)} />
            <Tab label="Weekly" {...getTabProps(1)} />
            <Tab label="Monthly" {...getTabProps(2)} />
            <Tab label="Yearly" {...getTabProps(3)} />
            <Tab label="One Time" {...getTabProps(4)} />
        </Tabs>
    );
}

const mapStateToProps = state => {
    return {
        activeTab: state.sidebar.activeTab,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveTab: (tabIndex) => { dispatch(actions.setActiveTab(tabIndex)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
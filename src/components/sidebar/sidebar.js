import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';

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

export default function SideBar () {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
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
import React from 'react';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';

function TabPanel (props) {
    return (
        <div role="tabpanel">
            <Box p={3}>
                Tab Panel Content for index {props.activeTab}
            </Box>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        activeTab: state.sidebar.activeTab,
    }
}

export default connect(mapStateToProps, null)(TabPanel);
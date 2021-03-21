import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, ButtonGroup, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField, Select, MenuItem, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Repeat, QueryBuilder, EventAvailable, PlayArrow, Stop } from '@material-ui/icons';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        textTransform: 'none'
    },
    selectedButton: {
        backgroundColor: '#3F51B5 !important',
        color: '#FFFFFF',
    }
}));

function Holidays (props) {
    const classes = useStyles();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const weeklyOffs = [0, 6];

    return (
        <div role="tabpanel" style={{ width: '100%' }}>
            <Box p={2}>
                <h4>Weekly Offs</h4>
                <ButtonGroup color="primary" aria-label="days of week">
                    {daysOfWeek.map((d, index) => (
                        <Button
                            className={[classes.button, weeklyOffs.indexOf(index) >= 0 ? classes.selectedButton : '']}
                            key={d}
                        >
                            {d}
                        </Button>
                    ))}
                </ButtonGroup>
            </Box>
        </div>
    );
}

export default connect(null, null)(Holidays);
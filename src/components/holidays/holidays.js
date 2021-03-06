import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonGroup, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';

import axios from '../../services/axios';

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

    const [holidays, setHolidays] = useState([]);
    const [weekoffs, setWeekoffs] = useState([]);

    const getHolidays = async () => {
        if (holidays.length === 0) {
            let url = `/holidays/list`;
            let response = await axios.get(url);
            console.log(response.data.data);
            setHolidays(response.data.data);
        }
    };

    const getWeekoffs = async () => {
        if (weekoffs.length === 0) {
            let url = `/weeklyoffs/list`;
            let response = await axios.get(url);
            console.log(response.data.data);
            setWeekoffs(response.data.data.map(wo => wo.day));
        }
    }

    useEffect(() => {
        getHolidays();
        getWeekoffs();
    });

    return (
        <div role="tabpanel" style={{ width: '100%' }}>
            <Box p={2}>
                <h4>Weekly Offs</h4>
                <ButtonGroup color="primary" aria-label="days of week">
                    {daysOfWeek.map((d, index) => (
                        <Button
                            className={[classes.button, weekoffs.indexOf(index) >= 0 ? classes.selectedButton : '']}
                            key={d}
                        >
                            {d}
                        </Button>
                    ))}
                </ButtonGroup>
                <h4>Holidays</h4>
                {holidays.map(h => (
                    <Alert severity="info" key={h.date}><strong>{h.label}</strong> : {h.date}</Alert>
                ))}
            </Box>
        </div>
    );
}

export default connect(null, null)(Holidays);
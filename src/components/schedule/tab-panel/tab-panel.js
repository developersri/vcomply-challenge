import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, ButtonGroup, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField, Select, MenuItem, Radio, RadioGroup, FormControlLabel, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Repeat, QueryBuilder, EventAvailable, PlayArrow, Stop, Save } from '@material-ui/icons';
import { connect } from 'react-redux';

import axios from '../../../services/axios';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    listItemCtrl: {
        width: '140px',
        marginRight: '12px',
        textAlign: 'center'
    },
    listItemText: {
        lineHeight: '32px'
    },
    button: {
        textTransform: 'none'
    },
    selectedButton: {
        backgroundColor: '#3F51B5 !important',
        color: '#FFFFFF',
    }
}));

function TabPanel(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        frequency: null,
        repeat: {
            every: 1,
            at: null,
        },
        lifecycle: {
            start: null,
            startDate: new Date(),
        }
    });
    const [radioVal, setRadioVal] = React.useState('never');
    const [reqStatus, setReqStatus] = React.useState(0);

    const frequencyLabel = ['daily', 'weekly', 'monthly', 'yearly', 'onetime'];
    const segment1Text = ['Day', 'Week', 'Month', 'Year'];
    const segment2Text = [null, 'Day', null, 'Month'];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    React.useEffect(() => {
        let now = state.lifecycle.startDate;
        let timeTokens = now.toTimeString().split(' ')[0].split(':');
        let time = timeTokens[0] + ':' + timeTokens[1];
        let currMonth = now.getMonth() + 1;
        currMonth = currMonth.toString().length === 1 ? '0' + currMonth : currMonth;
        let currDate = now.getDate();
        currDate = currDate.toString().length === 1 ? '0' + currDate : currDate;
        let currHrs = now.getHours();
        currHrs = currHrs.toString().length === 1 ? '0' + currHrs : currHrs;
        let currMin = now.getMinutes();
        currMin = currMin.toString().length === 1 ? '0' + currMin : currMin;
        let lcStart = `${now.getFullYear()}-${currMonth}-${currDate}T${currHrs}:${currMin}`;
        let oneTimeDate = `${now.getFullYear()}-${currMonth}-${currDate}`;
        let currDay = now.getDay();
        setState({
            ...state,
            repeat: {
                ...state.repeat,
                day: currDay,
                date: currDate,
                month: +currMonth,
                oneTimeDate,
                at: time,
            },
            lifecycle: {
                ...state.lifecycle,
                start: lcStart,
            },
            frequency: frequencyLabel[props.activeTab],
        });
    }, [state.lifecycle.startDate]);

    React.useEffect(() => {
        let now = state.lifecycle.end?.endDate;
        if (now) {
            let currMonth = now.getMonth();
            currMonth = currMonth.toString().length === 1 ? '0' + currMonth : currMonth;
            let currDate = now.getDate();
            currDate = currDate.toString().length === 1 ? '0' + currDate : currDate;
            let currHrs = now.getHours();
            currHrs = currHrs.toString().length === 1 ? '0' + currHrs : currHrs;
            let currMin = now.getMinutes();
            currMin = currMin.toString().length === 1 ? '0' + currMin : currMin;
            let lcEndBy = `${now.getFullYear()}-${currMonth}-${currDate}T${currHrs}:${currMin}`;
            setState({
                ...state,
                lifecycle: {
                    ...state.lifecycle,
                    end: {
                        ...state.lifecycle.end,
                        by: lcEndBy
                    },
                },
            });
        }
    }, [state.lifecycle.end?.endDate]);

    const createSchedule = async () => {
        // console.log(state);
        try {
            setReqStatus(1);
            let url = `/schedule/create`;
            let response = await axios.put(url, state);
            console.log(response.data);
            setReqStatus(2);
        }
        catch (err) {
            setReqStatus(3);
        }
    }

    return (
        <div role="tabpanel" style={{ width: '100%' }}>
            {/* {JSON.stringify(state)} */}
            <Box p={2}>
                <strong>Repeat</strong>
                {/* Tab Panel Content for index {props.activeTab} */}
                <List className={classes.root}>
                    {
                        props.activeTab !== 4 &&
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar><Repeat /></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Every" secondary={
                                <React.Fragment>
                                    <TextField id="number" type="number" onChange={(event) => {
                                        setState({
                                            ...state,
                                            repeat: {
                                                ...state.repeat,
                                                every: +event.target.value,
                                            }
                                        })
                                    }} value={state.repeat.every} className={classes.listItemCtrl} />
                                    <span className={classes.listItemText}>
                                        {segment1Text[props.activeTab]}(s)
                                    </span>
                                </React.Fragment>
                            } />
                        </ListItem>
                    }
                    {
                        (props.activeTab === 1 || props.activeTab === 3) &&
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EventAvailable />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`On ${segment2Text[props.activeTab]}`} secondary={
                                <React.Fragment>
                                    {
                                        props.activeTab === 1 &&
                                        <ButtonGroup color="primary" aria-label="days of week">
                                            {daysOfWeek.map((d, index) => (
                                                <Button
                                                    className={[classes.button, index === state.repeat.day ? classes.selectedButton : '']}
                                                    key={d} onClick={() => {
                                                        setState({
                                                            ...state,
                                                            repeat: {
                                                                ...state.repeat,
                                                                day: index,
                                                            }
                                                        })
                                                    }}
                                                >
                                                    {d}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    }
                                    {
                                        props.activeTab === 3 &&
                                        <ButtonGroup color="primary" aria-label="months of year">
                                            {monthsOfYear.map((m, index) => (
                                                <Button
                                                    className={[classes.button, index === state.repeat.month ? classes.selectedButton : '']}
                                                    key={m} onClick={() => {
                                                        setState({
                                                            ...state,
                                                            repeat: {
                                                                ...state.repeat,
                                                                month: index,
                                                            }
                                                        })
                                                    }}
                                                >
                                                    {m}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    }
                                </React.Fragment>
                            } />
                        </ListItem>
                    }
                    {
                        (props.activeTab === 2 || props.activeTab === 3 || props.activeTab === 4) &&
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EventAvailable />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={'On Date'} secondary={
                                <React.Fragment>
                                    {
                                        (props.activeTab === 2 || props.activeTab === 3) &&
                                        <Select
                                            id="select"
                                            className={classes.listItemCtrl}
                                            value={state.repeat.date}
                                            onChange={(event) => {
                                                setState({
                                                    ...state,
                                                    repeat: {
                                                        ...state.repeat,
                                                        date: +event.target.value,
                                                    }
                                                })
                                            }}
                                        >
                                            {
                                                (new Array(28)).fill(null).map((e, index) => (
                                                    <MenuItem style={{ textAlign: 'left' }} key={index} value={index + 1}>
                                                        {index + 1}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    }
                                    {
                                        props.activeTab === 4 &&
                                        <TextField id="date" type="date" value={state.repeat.oneTimeDate} className={classes.listItemCtrl} onChange={(event) => {
                                            setState({
                                                ...state,
                                                repeat: {
                                                    ...state.repeat,
                                                    oneTimeDate: event.target.value,
                                                }
                                            })
                                        }} />
                                    }
                                </React.Fragment>
                            } />
                        </ListItem>
                    }
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <QueryBuilder />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="At Time" secondary={
                            <React.Fragment>
                                <TextField id="time" type="time"onChange={(event) => {
                                        setState({
                                            ...state,
                                            repeat: {
                                                ...state.repeat,
                                                at: event.target.value,
                                            }
                                        })
                                    }} value={state.repeat.at} className={classes.listItemCtrl} />
                            </React.Fragment>
                        } />
                    </ListItem>
                </List>
                {props.activeTab !== 4 && (
                    <>
                        <Divider variant="middle" style={{ margin: '24px' }} />
                        <strong>Lifecycle</strong>
                        <List className={classes.root}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar><PlayArrow /></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Starts" secondary={
                                    <React.Fragment>
                                        <TextField id="datetime1" type="datetime-local" value={state.lifecycle.start} onChange={(event) => {
                                            setState({
                                                ...state,
                                                lifecycle: {
                                                    ...state.lifecycle,
                                                    startDate: new Date(event.target.value),
                                                }
                                            })
                                        }} className={classes.listItemCtrl} style={{ width: '240px', marginLeft: '12px' }} />
                                    </React.Fragment>
                                } />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar><Stop /></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Ends" secondary={
                                    <React.Fragment>
                                        <RadioGroup aria-label="gender" name="gender1" value={radioVal} onChange={(event, newValue) => {
                                            console.log(event, newValue);
                                        }}>
                                            <FormControlLabel value="datetime" onClick={() => {
                                                setRadioVal('datetime')
                                            }} control={<Radio />} label={
                                                <React.Fragment>
                                                    <span className={classes.listItemText}>
                                                        By
                                                    </span>
                                                    <TextField id="datetime2" type="datetime-local" onChange={(event) => {
                                                        setState({
                                                            ...state,
                                                            lifecycle: {
                                                                ...state.lifecycle,
                                                                end: {
                                                                    endDate: new Date(event.target.value)
                                                                },
                                                            }
                                                        })
                                                    }} value={state.lifecycle.end?.by || ''} className={classes.listItemCtrl} style={{ width: '240px', marginLeft: '12px' }} />
                                                </React.Fragment>
                                            } />
                                            <FormControlLabel onClick={() => {
                                                setRadioVal('occurances')
                                            }} value="occurances" control={<Radio />} label={
                                                <React.Fragment>
                                                    <span className={classes.listItemText}>
                                                        After
                                                    </span>
                                                    <TextField id="number" type="number" onChange={(event) => {
                                                        setState({
                                                            ...state,
                                                            lifecycle: {
                                                                ...state.lifecycle,
                                                                end: {
                                                                    after: +event.target.value
                                                                },
                                                            }
                                                        })
                                                    }} value={state.lifecycle.end?.after || 20} className={classes.listItemCtrl} style={{ width: '60px', marginLeft: '12px' }} />
                                                    <span className={classes.listItemText}>
                                                        occurances
                                                    </span>
                                                </React.Fragment>
                                            } />
                                            <FormControlLabel onClick={() => {
                                                setRadioVal('never')
                                                setState({
                                                    ...state,
                                                    lifecycle: {
                                                        ...state.lifecycle,
                                                        end: null,
                                                    }
                                                })
                                            }} value="never" control={<Radio />} label="Never" />
                                        </RadioGroup>
                                    </React.Fragment>
                                } />
                            </ListItem>
                        </List>
                    </>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Save />}
                    style={{marginTop: '24px'}}
                    onClick={createSchedule}
                >
                    Schedule
                </Button>
                <Snackbar open={reqStatus === 1}>
                    <Alert severity="info">Creating schedule...</Alert>
                </Snackbar>
                <Snackbar open={reqStatus === 2} autoHideDuration={6000}>
                <Alert severity="success">Schedule Created!</Alert>
                </Snackbar>
                <Snackbar open={reqStatus === 3} autoHideDuration={6000}>
                <Alert severity="error">Could not create schedule!</Alert>
                </Snackbar>
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
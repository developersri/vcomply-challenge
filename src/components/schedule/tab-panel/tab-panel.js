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
    const segment1Text = ['Day', 'Week', 'Month', 'Year'];
    const segment2Text = [null, 'Day', null, 'Month'];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div role="tabpanel" style={{ width: '100%' }}>
            <Box p={2}>
                Repeat
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
                                    <TextField id="number" type="number" value={1} className={classes.listItemCtrl} />
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
                                                    className={[classes.button, index === 0 ? classes.selectedButton : '']}
                                                    key={d}
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
                                                    className={[classes.button, index === 0 ? classes.selectedButton : '']}
                                                    key={m}
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
                                            value={1}
                                        // onChange={}
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
                                        <TextField id="date" type="date" value={'2021-03-19'} className={classes.listItemCtrl} />
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
                                <TextField id="time" type="time" value={'17:16'} className={classes.listItemCtrl} />
                            </React.Fragment>
                        } />
                    </ListItem>
                </List>
                <Divider variant="middle" style={{ margin: '24px' }} />
                Lifecycle
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar><PlayArrow /></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Starts" secondary={
                            <React.Fragment>
                                <TextField id="datetime1" type="datetime-local" value={'2021-03-19T18:30'} className={classes.listItemCtrl} style={{ width: '200px', marginLeft: '12px' }} />
                            </React.Fragment>
                        } />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar><Stop /></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Ends" secondary={
                            <React.Fragment>
                                <RadioGroup aria-label="gender" name="gender1" value={'datetime'} onChange={(event, newValue) => {
                                    console.log(event, newValue);
                                }}>
                                    <FormControlLabel value="datetime" control={<Radio />} label={
                                        <React.Fragment>
                                            <span className={classes.listItemText}>
                                                By
                                            </span>
                                            <TextField id="datetime2" type="datetime-local" value={'2021-03-19T18:30'} className={classes.listItemCtrl} style={{ width: '200px', marginLeft: '12px' }} />
                                        </React.Fragment>
                                    } />
                                    <FormControlLabel value="occurances" control={<Radio />} label={
                                        <React.Fragment>
                                            <span className={classes.listItemText}>
                                                After
                                            </span>
                                            <TextField id="number" type="number" value={1} className={classes.listItemCtrl} style={{ width: '60px', marginLeft: '12px' }} />
                                            <span className={classes.listItemText}>
                                                occurances
                                            </span>
                                        </React.Fragment>
                                    } />
                                    <FormControlLabel value="never" control={<Radio />} label="Never" />
                                </RadioGroup>
                            </React.Fragment>
                        } />
                    </ListItem>
                </List>
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
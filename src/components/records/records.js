import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Accordion, AccordionSummary, AccordionDetails, Chip } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';

import axios from '../../services/axios';
import './records.css';

const useStyles = makeStyles((theme) => ({
    alert: {
        width: '100%',
    },
    accordionSummary: {
        padding: '0px',
    },
    chip: {
        margin: '0 6px 6px 0',
    }
}));

function Records(props) {
    const classes = useStyles();
    const [records, setRecords] = useState([]);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getRecords = async () => {
        if (records.length === 0) {
            let url = `/schedule/list`;
            let response = await axios.get(url);
            console.log(response.data.data);
            setRecords(response.data.data);
        }
    }

    useEffect(() => {
        getRecords();
    })

    return (
        <div role="tabpanel" style={{ width: '100%' }}>
            <Box p={2}>
                <h4>Scheduled Records</h4>
                {records.map(r => (
                    <Accordion key={r._id}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.accordionSummary}
                        >
                            <Alert className={classes.alert} severity="info" key={r._id}>
                                <strong>Id: {r._id}</strong> ({r.config.frequency}) [{r.events.length} events]<br />
                                <strong>Starts</strong> {new Date(r.config.lifecycle.start).toLocaleString()}<br/>
                                <strong>Ends</strong> {
                                    (r.config.lifecycle.end && r.config.lifecycle.end.by && new Date(r.config.lifecycle.end.by).toLocaleString()) ||
                                    (r.config.lifecycle.end && r.config.lifecycle.end.after && 'After ' + r.config.lifecycle.end.after + ' Occurances') || 'Never'
                                }<br/>
                                <small><strong>Created at</strong> {new Date(r.created_at).toLocaleString()}</small>
                            </Alert>
                        </AccordionSummary>
                        <AccordionDetails>
                            {(r.events || []).map(e => (
                                <span>
                                    <Chip key={e} className={classes.chip} label={
                                        <React.Fragment>
                                            <strong>{new Date(e).toLocaleString()}</strong> ({days[new Date(e).getDay()]})
                                        </React.Fragment>
                                     } />
                                </span>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </div>
    );
}

export default connect(null, null)(Records);
import React from 'react'
import FollowUpForm from "./FollowUpForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';

import EmailTemplate from "./EmailTemplate"




const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function FollowUp() {

    const classes = useStyles();

    return (
        <>
           
            <Paper className={classes.pageContent}>
                <FollowUpForm/>
                {/*<EmailTemplate/>*/}
            </Paper>
        </>
    )
}

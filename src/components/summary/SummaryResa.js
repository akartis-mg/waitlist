import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../title/Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});
function SummaryResa({ title, number, color }) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title color={color}>{title}</Title>
            <Typography component="p" variant="h4">
                {number}
            </Typography>
        </React.Fragment>
    );
}

export default SummaryResa

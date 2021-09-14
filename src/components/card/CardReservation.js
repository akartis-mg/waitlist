import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import { connect } from "react-redux";
import { updateReservation } from '../../actions/reservationActions';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    }
});

function CardReservation({ data, setOpenCalendar, setResaInfo, updateReservation }) {
    const classes = useStyles();

    const handleAccept = () => {
        const newData = {
            ...data,
            status: "done"
        }
        updateReservation(newData);
    }

    const handleRefuse = () => {
        const newData = {
            ...data,
            status: "disable"
        }
        updateReservation(newData);
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="primary">
                    {data.name}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <CalendarTodayIcon />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="body1" color="textSecondary" component="h4">
                            {data.date_reservation} {data.time}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <EventSeatIcon />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="body1" color="textSecondary" component="h4">
                            {data.nb_spots}
                        </Typography>
                    </Grid>

                </Grid>
                <Button size="small" color="primary" onClick={handleAccept}>
                    Accept
                </Button>
                <Button size="small" color="primary" onClick={handleRefuse}>
                    Refuse
                </Button>
                <Button size="small" color="primary" onClick={() => { setOpenCalendar(true); setResaInfo(data) }}>
                    Update
                </Button>
            </CardContent>
        </Card>
    );
}

export default connect(null, { updateReservation })(CardReservation)


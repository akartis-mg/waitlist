import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import { connect } from "react-redux";
import { updateReservation } from '../../actions/reservationActions';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        "&:hover": {
            "& $btnbas": {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                animation: "3s all"
            }
        },
    },

    headCard: {
        //height: 0,
        padding: "10px 10px 0px 10px", // 16:9
    },
    btnbas: {
        display: "none",

    }
});

function CardReservation({ data, company, branch, setOpenCalendar, setResaInfo, updateReservation }) {
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
            {/* <CardHeader
                className={classes.headCard}
                avatar={
                    <Avatar
                        aria-label="recipe"
                        className={classes.avatar}
                        src={company && company.logoUrl}
                    />
                }
                action={
                    <IconButton
                        className={classes.editbtn}
                        aria-label="settings"
                        onClick={() => {setOpenCalendar(true); setResaInfo(data) }}
                    >
                        <EditIcon />
                    </IconButton>
                }
                title={company && company.name}
                subheader={branch && branch.name}
            /> */}
            <CardContent>
                <Typography gutterBottom variant="subtitle1" color="primary">
                    {data.name}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
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
                    <Grid item xs={4}>
                        <div className={classes.btnbas}>
                            <Button variant="contained" size="small" color="primary" onClick={handleAccept}>
                                Accept
                            </Button>
                            <Button variant="contained" size="small" color="secondary" onClick={handleRefuse}>
                                Refuse
                            </Button>
                            <Button size="small" color="primary" onClick={() => { setOpenCalendar(true); setResaInfo(data) }}>
                                Update
                            </Button>
                        </div>
                    </Grid>


                </Grid>


            </CardContent>
        </Card>
    );
}

export default connect(null, { updateReservation })(CardReservation)


import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import { connect, useSelector } from "react-redux";
import { updateReservation } from "../../actions/reservationActions";
import { setHeaders } from "../../api/headers";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    "&:hover": {
      color: "#000",
    },
  },
  headCard: {
    //height: 0,
    padding: "10px 10px 0px 10px", // 16:9
  },
});

function CardReservation({
  data,
  setResaInfo,
  updateReservation,
  handleUpdateUser,
}) {
  const classes = useStyles();
  const [company, setCompany] = useState();
  const [branch, setBranch] = useState();
  const auth = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchBranchDetails() {
      try {
        const res = await axios
          .get("/api/branch/findOneBranch/" + data.bid, setHeaders(auth.token))
          .then(async (res) => {
            setBranch(res.data);
            //console.log("BRANCH", res.data);
            const rescompany = await axios
              .get(
                "/api/company/findOneCompany/" + res.data.cid,
                setHeaders(auth.token)
              )
              .then(async (res) => {
                setCompany(res.data);
                //companyName = res.data.name;
                //console.log("COMPANY", res.data.name);
              });
          });

        //console.warn(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBranchDetails();
  }, []);

  return (
    <Card className={classes.root}>
      <CardHeader
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
            onClick={() => handleUpdateUser(data)}
          >
            <EditIcon />
          </IconButton>
        }
        title={company && company.name}
        subheader={branch && branch.name}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1">
          {data.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <CalendarTodayIcon color="inherit" fontSize="small" />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body2" color="textSecondary" component="h4">
              {data.date_reservation} {data.time}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <EventSeatIcon fontSize="small" />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1" color="textSecondary" component="h4">
              {data.nb_spots}
            </Typography>
          </Grid>
        </Grid>

        {/* <Button
          size="small"
          color="primary"
          onClick={() => handleUpdateUser(data)}
        >
          Update
        </Button> */}
      </CardContent>
    </Card>
  );
}

export default connect(null, { updateReservation })(CardReservation);

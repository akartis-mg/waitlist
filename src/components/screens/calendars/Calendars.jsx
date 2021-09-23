import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Calendars.css";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EventIcon from "@material-ui/icons/Event";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { getDateResaById } from "../../../actions/dateResaActions";
import { createReservation } from "../../../actions/reservationActions";
import axios from 'axios'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
function Calendars({ company, branch, createReservation, getDateResaById }) {
  const auth = useSelector((state) => state.auth.user);
  const dateResa = useSelector((state) => state.dateresa);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [event, setEvent] = useState({
    bid: branch._id,
    uid: auth._id,
    name: "",
    nb_spots: 0,
    date_reservation: "",
    time: "",
  });

  const [dateSelected, setSelected] = useState("");
  const [seats, setSeats] = useState("");
  const [timeSelected, setTimeSelected] = useState("");
  const [openingDateTime, setOpeningDateTime] = useState(
    branch.info.opening_days
  );
  const [jour, setJour] = useState("");

  //convert to second
  function hmsToSecondsOnly(str) {
    let timetoArray = str.toString(10).split("").map(Number);
    let timeConverted;
    if (timetoArray.length == 3) {
      timeConverted =
        timetoArray[0].toString() +
        ":" +
        timetoArray[1].toString() +
        timetoArray[2].toString();
    } else if (timetoArray.length == 4) {
      timeConverted =
        timetoArray[0].toString() +
        timetoArray[1].toString() +
        ":" +
        timetoArray[2].toString() +
        timetoArray[3].toString();
    }

    return timeConverted;
  }

  //convert to HH:MM
  function convertSeconds(sec) {
    var hrs = Math.floor(sec / 3600);
    var min = Math.floor((sec - hrs * 3600) / 60);
    var seconds = sec - hrs * 3600 - min * 60;
    seconds = Math.round(seconds * 100) / 100;

    var result = hrs < 10 ? "0" + hrs : hrs;
    result += ":" + (min < 10 ? "0" + min : min);
    //result += "-" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
  }

  function getTimeInterval() {
    let openDays = [];

    for (let x in openingDateTime) {
      console.log("FOR LOOP: ", openingDateTime[x]);

      if (openingDateTime[x].open) {
        console.log("NAME: ", x);

        let openHour;
        let closeHour;
        openHour = hmsToSecondsOnly(openingDateTime[x].open_hour);
        console.log("OPEN HOUR: ", openHour);

        //openDays.push(openingDateTime[x]);
      }
    }

    //console.log("OPENDAYS: ", openDays);
  }

  var timesAvailable = [];
  async function getTimesAvailable(item) {
      try {
          const res = await axios.get('/api/dateresa/getAvailableTimes/' + item.bid + "/" + item.jour +"/" + item.daty );
          timesAvailable= res.data;
          //console.warn(res.data)
      } catch (err) {
          console.log(err)
      }
  }
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  

  const loadCalendar = () => {
    const calendarEl = document.getElementById("calendar");
    let calendar = new Calendar(calendarEl, {
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: "dayGridMonth",
      height: "auto",
      showNonCurrentDates: false,
      selectable: true,
      select: function (info) {
        const currentDay = new Date().setHours(0, 0, 0, 0);
        const daySelected = info.start;

        if (daySelected >= currentDay) {
          //getDateResaById(branch._id);
          setOpen(true)
          setSelected(moment(daySelected).format("DD/MM/YYYY"));
          var jour = moment(daySelected).format("dddd").toLowerCase();
         
          const timeDiv = document.getElementById("available-times-div");

          while (timeDiv.firstChild) {
            timeDiv.removeChild(timeDiv.lastChild);
          }

          //Heading - Date Selected
          var h4 = document.createElement("h4");
          var h4node = document.createTextNode(
            days[daySelected.getDay()] +
              ", " +
              months[daySelected.getMonth()] +
              " " +
              daySelected.getDate()
          );
          h4.appendChild(h4node);

          timeDiv.appendChild(h4);

          let defaultTime = [];
          let intervalHours = [];

          const item ={
            bid: branch._id,
            jour: jour,
            daty: daySelected
          }

          getTimesAvailable(item)

          setTimeout(() => {
          
            //Time Buttons
          for (var i = 0; i < timesAvailable.length; i++) {
            var timeSlot = document.createElement("div");
            timeSlot.classList.add("time-slot");

            var timeBtn = document.createElement("button");

            var btnNode = document.createTextNode(timesAvailable[i].hours);
            timeBtn.classList.add("time-btn");

            timeBtn.appendChild(btnNode);
            timeSlot.appendChild(timeBtn);

            timeDiv.appendChild(timeSlot);

            // When time is selected
            var last = null;
            timeBtn.addEventListener("click", function () {
              if (last != null) {
                console.log(last);
                last.parentNode.removeChild(last.parentNode.lastChild);
              }

              //
              var confirmBtn = document.createElement("button");
              var confirmTxt = document.createTextNode("Confirm");
              confirmBtn.classList.add("confirm-btn");
              confirmBtn.appendChild(confirmTxt);
              this.parentNode.appendChild(confirmBtn);
              event.time = this.textContent;
              setTimeSelected(this.textContent);
              const seatsAvailable = timesAvailable.filter(
                (ta) => ta.hours == event.time
              );
              //console.log("i lera", seatsAvailable);
              setSeats(seatsAvailable[0].seats.toString());
              confirmBtn.addEventListener("click", function () {
                var month = daySelected.getMonth() + 1;
                if (month < 10) {
                  month = "0" + month;
                }

                event.date_reservation =
                  moment(daySelected).format("DD/MM/YYYY");
                sessionStorage.setItem("eventObj", JSON.stringify(event));
                console.log(event);
                var placeCalendar =
                  document.getElementsByClassName("misyCalendar")[0];
                var placeResa = document.getElementsByClassName("misyResa")[0];
                //history.push("/reservation");
                placeCalendar.classList.add("afenina");
                placeResa.classList.remove("afenina");
                document.getElementById("calendar-section").style.lef =
                  "-400px";
                //console.log("averina heure", convertSeconds(event.time));
              });
              last = this;
            });
          }
          setOpen(false)
          }, 2000);
          

          var containerDiv = document.getElementsByClassName("container")[0];
          containerDiv.classList.add("time-div-active");

          document.getElementById("calendar-section").style.flex = "2";

          timeDiv.style.display = "initial";
        } else {
          alert(
            "Sorry that date has already past. Please select another date."
          );
        }
      },
    });
    calendar.render();
  };

  useEffect(() => {
    loadCalendar();
    getTimeInterval();
  }, [branch]);

  console.log("dateresa", dateResa);
  const listResaFinal = [];
  //get hour interval
  /*dateResa.map((date) => {
    date.info.map((i) => {
      i.interval.map((inter) => {});
    });
  });*/
  /*useEffect(() => {
    console.log("MY DAY", dayCheck.toLowerCase());
    console.log("AARY", timesAvailable);
    timesAvailable = [];
    const hoursInterval = branch.info.opening_days[
      dayCheck.toLowerCase()
    ].hour_interval[0].map((h) => {
      //console.log("h", h);
      timesAvailable.push(h.hours);
    });
    console.log("MY HOURS", hoursInterval);
  }, [dayCheck]);*/

  const handleGoBack = () => {
    var placeCalendar = document.getElementsByClassName("misyCalendar")[0];
    var placeResa = document.getElementsByClassName("misyResa")[0];
    placeCalendar.classList.remove("afenina");
    placeResa.classList.add("afenina");
  };

  const handleSubmit = () => {
    if (event.nb_spots === 0) {
      alert("Aza mianiany");
    }

    createReservation(event);
    console.log("EVENT: ", event);

    window.location.reload();
  };

 
  const classes = useStyles();
  return (
    <div>
       <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="container">
        <section className="description-section">
       
          <hgroup>
            <Grid
              container
              spacing={1}
              alignContent="space-between"
              alignItems="center"
            >
              <Grid item xs={12}>
                <h4 id="scheduler">{company.name}</h4>
              </Grid>

              <Grid item xs={12}>
                <h3 id="event">{branch.name}</h3>
              </Grid>
              <Grid item xs={2}>
                <EventSeatIcon />
              </Grid>
              <Grid item xs={10}>
                <h4 id="vent-time-stamp">{seats} </h4>
              </Grid>

              <Grid item xs={2}>
                <EventIcon />
              </Grid>
              <Grid item xs={10}>
                <h4 id="vent-time-stamp">{dateSelected} </h4>
              </Grid>

              <Grid item xs={2}>
                <AccessTimeIcon />
              </Grid>

              <Grid item xs={10}>
                <h4 id="duration">{timeSelected}</h4>
              </Grid>
            </Grid>

            {/* <h4 id="scheduler">{company.company.name}</h4>
            <h3 id="event">{branch.name}</h3>
            <div className="icon-text-div">
              <AccessTimeIcon />
              <h4 id="duration">15 min</h4>
            </div>

            <div className="icon-text-div">
              <EventIcon />
              <h4 id="vent-time-stamp">{dateSelected} </h4>
            </div> */}
          </hgroup>
          <p id="description">
            Our team will meet with you to review pricing options.
          </p>
        </section>
        <div className="divider"></div>
        <section id="calendar-section" className="body-section">
          <div className="misyCalendar">
            <h3>Select a Date & Time</h3>
            <div id="schedule-div">
              <div id="available-times-div"></div>

              <div id="calendar"></div>
            </div>
          </div>

          <div className="misyResa afenina">
            <Grid container spacing={3} justify="center" alignItems="center">
              <Grid item xs={2}>
                <IconButton onClick={handleGoBack}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>

              <Grid item xs={10}>
                <Typography> Iza dool</Typography>
              </Grid>
            </Grid>
            <div>
              <div className="reservation__content ">
                <form className="reservation__inputs grid" noValidate>
                  {/* <TextField
                    id="nb_spots"
                    label="Available Spot"
                    type="Number"
                    value={branch.spots.available}
                    className="reservation__input"
                    InputProps={{
                      readOnly: true,
                    }}
                  /> */}
                  <TextField
                    id="name"
                    label="Name"
                    type="text"
                    defaultValue={event.name}
                    className="reservation__input"
                    onChange={(e) =>
                      setEvent({ ...event, name: e.target.value })
                    }
                    fullWidth
                  />

                  <TextField
                    id="nb_spots"
                    label="Nbr Pers"
                    type="number"
                    defaultValue={event.nb_spots}
                    min={branch.spots.available}
                    className="reservation__input"
                    onChange={(e) =>
                      setEvent({ ...event, nb_spots: Number(e.target.value) })
                    }
                    fullWidth
                  />

                  <Button onClick={handleSubmit} color="primary">
                    Confirm
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default connect(null, { createReservation, getDateResaById })(Calendars);

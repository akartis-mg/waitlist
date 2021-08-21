import React, { useState, useEffect } from "react";
import "./Calendars.css";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { Link, withRouter, useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EventIcon from "@material-ui/icons/Event";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import Header from "../header/Header";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import { everyLimit } from "async";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

function Calendars({ company, branch }) {
  const history = useHistory();
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
  const timesAvailable = ["9:00", "10:00", "11:00", "2:00", "3:00"];

  // const [event, setEvent] = useState({
  //   name: "",
  //   organizer: "",
  //   duration: 0,
  //   description: "",
  //   date: new Date(),
  //   time: "",
  //   attendees: [],
  // });

  const [event, setEvent] = useState({
    bid: branch.cid,
    uid: "610e9dfe4a6f3137d05a350b",
    name: "",
    nb_spots: 0,
    date_reservation: "",
    time: 0,
  });

  const [dateSelected, setSelected] = useState("");
  const [timeSelected, setTimeSelected] = useState("");

  //convert to second
  function hmsToSecondsOnly(str) {
    var p = str.split(":"),
      s = 0,
      m = 1;

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 3600;
    }

    return s;
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

  const loadCalendar = () => {
    const calendarEl = document.getElementById("calendar");
    let calendar = new Calendar(calendarEl, {
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: "dayGridMonth",
      height: "auto",
      showNonCurrentDates: false,
      selectable: true,
      select: function (info) {
        const currentDay = new Date();
        const daySelected = info.start;

        if (daySelected >= currentDay) {
          setSelected(moment(daySelected).format("DD MMMM YYYY"));
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

          //Time Buttons
          for (var i = 0; i < timesAvailable.length; i++) {
            var timeSlot = document.createElement("div");
            timeSlot.classList.add("time-slot");

            var timeBtn = document.createElement("button");

            var btnNode = document.createTextNode(timesAvailable[i]);
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
              var confirmBtn = document.createElement("button");
              var confirmTxt = document.createTextNode("Confirm");
              confirmBtn.classList.add("confirm-btn");
              confirmBtn.appendChild(confirmTxt);
              this.parentNode.appendChild(confirmBtn);
              event.time = hmsToSecondsOnly(this.textContent);
              setTimeSelected(convertSeconds(event.time));
              confirmBtn.addEventListener("click", function () {
                // event.date_reservation =
                //   days[daySelected.getDay()] +
                //   ", " +
                //   months[daySelected.getFullYear()] +
                //   " " +
                //   daySelected.getDate();
                var month = daySelected.getMonth() + 1;
                if (month < 10) {
                  month = "0" + month;
                }
                // event.date_reservation =
                //   daySelected.getFullYear() +
                //   "-" +
                //   month +
                //   "-" +
                //   daySelected.getDate();

                event.date_reservation = moment(daySelected).format();
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
                console.log("averina heure", convertSeconds(event.time));
              });
              last = this;
            });
          }

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
  }, []);

  useEffect(() => {}, [dateSelected]);

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
    console.log(event);
  };

  return (
    <div>
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
                <h4 id="scheduler">{company.company.name}</h4>
              </Grid>

              <Grid item xs={12}>
                <h3 id="event">{branch.name}</h3>
              </Grid>
              <Grid item xs={2}>
                <EventSeatIcon />
              </Grid>
              <Grid item xs={10}>
                <h4 id="vent-time-stamp">{branch.spots.available} </h4>
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
                      setEvent({ ...event, nb_spots: e.target.value })
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

export default Calendars;

import React, { useState, useEffect } from "react";
import "./Calendars.css";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { Link, withRouter, useHistory } from "react-router-dom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Header from "../header/Header";

function Calendars() {
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
  const timesAvailable = ["9:00am", "10:00am", "11:00am", "2:00pm", "3:00pm"];

  const [event, setEvent] = useState({
    name: "",
    organizer: "",
    duration: 0,
    description: "",
    date: new Date(),
    time: "",
    attendees: [],
  });

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

        if (daySelected.getDate() >= currentDay.getDate()) {
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
              event.time = this.textContent;
              confirmBtn.addEventListener("click", function () {
                event.date =
                  days[daySelected.getDay()] +
                  ", " +
                  months[daySelected.getMonth()] +
                  " " +
                  daySelected.getDate();
                sessionStorage.setItem("eventObj", JSON.stringify(event));
                console.log(event);
                history.push("/reservation");
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
  return (
    <div>
      <div className="container">
        <section className="description-section">
          <hgroup>
            <h4 id="scheduler">Company</h4>
            <h3 id="event">Branches</h3>
            <div class="icon-text-div">
              <AccessTimeIcon />
              <h4 id="duration">15 min</h4>
            </div>
          </hgroup>
          <p id="description">
            Our team will meet with you to review pricing options.
          </p>
        </section>
        <div className="divider"></div>
        <section id="calendar-section" class="body-section">
          <h3>Select a Date & Time</h3>
          <div id="schedule-div">
            <div id="available-times-div"></div>
            <div id="calendar"></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Calendars;

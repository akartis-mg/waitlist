import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./ReservationModal.css";
//select
import TextField from "@material-ui/core/TextField";

function ReservationModal({ title, contents, open, setOpen }) {
  //const [open, setOpen] = React.useState(false);

  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  let hour = today.getHours();
  let minute = today.getMinutes();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minute < 10) {
    minute = "0" + minute;
  }
  //format date
  const date = year + "-" + month + "-" + day;
  const time = hour + ":" + minute;

  console.log(today);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {contents.name}

          <div className="reservation__content ">
            <form className="reservation__inputs grid" noValidate>
              <TextField
                id="date"
                label="Next appointment"
                type="date"
                defaultValue={date}
                className="reservation__input"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: date }}
              />

              <TextField
                id="time"
                label="Next appointment"
                type="time"
                defaultValue={time}
                className="reservation__input"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: time }}
              />

              <TextField
                id="standard-number"
                label="Number"
                type="number"
                className="reservation__input"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>

          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ReservationModal;

import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import PhoneInput from "react-phone-input-2";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputOpenClose from "../../inputOpenClose/InputOpenClose";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddManager({ manager, setManager }) {
  const onChange = (e) => {
    setManager({ ...manager, [e.target.id]: e.target.value });
  };
  console.log("MANGER", manager);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const classes = useStyles();

  return (
    <div>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              id="firstname"
              label="First name"
              type="text"
              required
              value={manager?.firstname}
              fullWidth
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="lastname"
              label="Last name"
              type="text"
              required
              value={manager?.lastname}
              fullWidth
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              value={manager?.email}
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              disabled
              fullWidth
              id="type"
              label="Type"
              value={manager?.type}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddManager;

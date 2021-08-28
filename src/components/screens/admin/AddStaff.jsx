import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";

import { addStaff } from "../../../actions/staffActions";

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

function AddStaff({ staff, setStaff, addStaff, setOpenMyModal }) {
  const authManager = useSelector(state => state.authBusiness.userBusiness);

  const onChange = (e) => {
    setStaff({ ...staff, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAddStaff = () => {

    staff.bid = authManager.bid;
    staff.password = staff.firstname + staff.lastname;

    let manager = staff;

    const newStaff = {
      bid: authManager.bid,
      manager,
    };

    addStaff(newStaff);

    setOpenMyModal(false);

    setStaff({
      bid: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      type: "Staff",
    });
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
              defaultValue={staff.firstname}
              fullWidth
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="lastname"
              label="Last name"
              type="text"
              required
              defaultValue={staff.lastname}
              fullWidth
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              value={staff.email}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              disabled
              fullWidth
              id="type"
              label="Type"
              value={staff.type}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddStaff}
            > Add staff
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default connect(null, { addStaff })(AddStaff);

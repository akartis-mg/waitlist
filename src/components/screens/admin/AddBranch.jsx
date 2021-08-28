import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import PhoneInput from "react-phone-input-2";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputOpenClose from "../../inputOpenClose/InputOpenClose";
import { Typography } from "@material-ui/core";

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

function AddBranch({ branch, setBranch }) {
  const onChange = (e) => {
    setBranch({ ...branch, [e.target.id]: e.target.value });
  };

  const phone = branch.info.phone;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(branch);
  };
  const classes = useStyles();

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <div>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              label="Branch Name"
              type="text"
              defaultValue={branch.name}
              fullWidth
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="average_duration"
              label="Average Duration"
              type="number"
              defaultValue={branch.average_duration}
              fullWidth
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <PhoneInput
              required
              country={"mu"}
              value={phone.toString()}
              onChange={(phoneNb) =>
                setBranch({
                  ...branch,
                  info: {
                    ...branch.info,
                    phone: phoneNb,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="street"
              label="Street"
              type="text"
              value={branch.address.street}
              className="reservation__input"
              onChange={(e) =>
                setBranch({
                  ...branch,
                  address: {
                    ...branch.address,
                    street: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="city"
              label="City"
              type="text"
              defaultValue={branch.address.city}
              className="reservation__input"
              onChange={(e) =>
                setBranch({
                  ...branch,
                  address: {
                    ...branch.address,
                    city: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="postal_code"
              label="Postal Code"
              type="number"
              defaultValue={branch.address.postal_code}
              className="reservation__input"
              onChange={(e) =>
                setBranch({
                  ...branch,
                  address: {
                    ...branch.address,
                    postal_code: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="longitude"
              label="Longitude"
              type="number"
              defaultValue={branch.address.longitude}
              className="reservation__input"
              onChange={(e) =>
                setBranch({
                  ...branch,
                  address: {
                    ...branch.address,
                    longitude: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="latitude"
              label="Latitude"
              type="number"
              defaultValue={branch.address.latitude}
              className="reservation__input"
              onChange={(e) =>
                setBranch({
                  ...branch,
                  address: {
                    ...branch.address,
                    latitude: e.target.value,
                  },
                })
              }
            />
          </Grid>

          {days.map((d) => (
            <InputOpenClose
              key={d}
              jour={d}
              setBranch={setBranch}
              branch={branch}
            />
          ))}
        </Grid>
      </form>
    </div>
  );
}

export default AddBranch;

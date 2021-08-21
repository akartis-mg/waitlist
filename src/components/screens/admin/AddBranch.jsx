import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

function AddBranch({ companyDetails, branch, setBranch }) {
  // if (branchDetails != null) {
  //   setBranch({ ...branch, branchDetails });
  // }
  //console.warn("STREET", branch.address.street);
  const onChange = (e) => {
    setBranch({ ...branch, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(branch);
  };
  const classes = useStyles();

  const days = ["monday", "tuesday", "wednesday"];

  return (
    <div>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              id="name"
              label="Branch Name"
              type="text"
              variant="filled"
              defaultValue={branch.name}
              fullWidth
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
          {/* MONDAY */}
          <Grid item xs={12}>
            <Typography component="h1" variant="subtitle1">
              Monday
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="open_hour"
              label="Open"
              type="number"
              defaultValue={branch.info.opening_days.monday.open_hour}
              className="reservation__input"
              onChange={(e) =>
                setBranch({
                  ...branch,
                  info: {
                    ...branch.info,
                    opening_days: {
                      ...branch.info.opening_days,
                      monday: {
                        ...branch.info.opening_days.monday,
                        open_hour: e.target.value,
                      },
                    },
                  },
                })
              }
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="closing_hour"
              label="Close"
              type="number"
              value={branch.info.opening_days.monday.closing_hour}
              className="reservation__input"
              onChange={(e) =>
                setBranch({
                  ...branch,
                  info: {
                    ...branch.info,
                    opening_days: {
                      ...branch.info.opening_days,
                      monday: {
                        ...branch.info.opening_days.monday,
                        closing_hour: e.target.value,
                      },
                    },
                  },
                })
              }
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControlLabel
              value="Is OPEN"
              control={
                <Checkbox
                  color="primary"
                  onChange={(e) =>
                    setBranch({
                      ...branch,
                      info: {
                        ...branch.info,
                        opening_days: {
                          ...branch.info.opening_days,
                          monday: {
                            ...branch.info.opening_days.monday,
                            open: e.target.checked,
                          },
                        },
                      },
                    })
                  }
                />
              }
              label="start"
              labelPlacement="start"
            />
          </Grid>

          {/* Tuesday */}
          <Grid item xs={12}>
            <Typography component="h1" variant="subtitle1">
              Tuesday
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="open_hour"
              label="Open"
              type="number"
              defaultValue={branch.info.opening_days.tuesday.open_hour}
              className="reservation__input"
              onChange={(e) =>
                setBranch({
                  ...branch,
                  info: {
                    ...branch.info,
                    opening_days: {
                      ...branch.info.opening_days,
                      tuesday: {
                        ...branch.info.opening_days.tuesday,
                        open_hour: e.target.value,
                      },
                    },
                  },
                })
              }
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="closing_hour"
              label="Close"
              type="number"
              value={branch.info.opening_days.tuesday.closing_hour}
              className="reservation__input"
              onChange={(e) =>
                setBranch({
                  ...branch,
                  info: {
                    ...branch.info,
                    opening_days: {
                      tuesday: {
                        ...branch.info.opening_days.tuesday,
                        closing_hour: e.target.value,
                      },
                    },
                  },
                })
              }
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControlLabel
              value="Is OPEN"
              control={
                <Checkbox
                  color="primary"
                  onChange={(e) =>
                    setBranch({
                      ...branch,
                      info: {
                        ...branch.info,
                        opening_days: {
                          tuesday: {
                            ...branch.info.opening_days.tuesday,
                            open: e.target.checked,
                          },
                        },
                      },
                    })
                  }
                />
              }
              label="start"
              labelPlacement="start"
            />
          </Grid>

          {days.map((d) => (
            <InputOpenClose jour={d} setBranch={setBranch} branch={branch} />
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="button"
          >
            Sign In
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default AddBranch;

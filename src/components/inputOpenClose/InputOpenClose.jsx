import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function InputOpenClose({ jour, branch, setBranch }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getBoolean(value) {
    switch (value) {
      case true:
      case "true":
      case 1:
      case "1":
      case "on":
      case "yes":
        return true;
      default:
        return false;
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography component="h1" variant="subtitle1">
          {capitalizeFirstLetter(jour)}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="open_hour"
          label="Open"
          type="number"
          //   defaultValue={branch.info.opening_days[jour].open_hour}
          defaultValue={branch["info"]["opening_days"][jour]["open_hour"]}
          className="reservation__input"
          onChange={(e) =>
            setBranch({
              ...branch,
              info: {
                ...branch.info,
                opening_days: {
                  ...branch.info.opening_days,
                  [jour]: {
                    ...branch.info.opening_days[jour],
                    open_hour: Number(e.target.value),
                  },
                },
              },
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="open_hour"
          label="Open"
          type="number"
          //   defaultValue={branch.info.opening_days[jour].open_hour}
          defaultValue={branch["info"]["opening_days"][jour]["closing_hour"]}
          className="reservation__input"
          onChange={(e) =>
            setBranch({
              ...branch,
              info: {
                ...branch.info,
                opening_days: {
                  ...branch.info.opening_days,
                  [jour]: {
                    ...branch.info.opening_days[jour],
                    closing_hour: Number(e.target.value),
                  },
                },
              },
            })
          }
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={branch["info"]["opening_days"][jour]["open"]}
              color="primary"
              onChange={(e) =>
                setBranch({
                  ...branch,
                  info: {
                    ...branch.info,
                    opening_days: {
                      ...branch.info.opening_days,
                      [jour]: {
                        ...branch.info.opening_days[jour],
                        open: e.target.checked,
                      },
                    },
                  },
                })
              }
            />
          }
          label="Is Open"
          labelPlacement="start"
        />
      </Grid>
    </>
  );
}

export default InputOpenClose;

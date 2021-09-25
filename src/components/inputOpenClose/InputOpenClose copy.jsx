import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function InputOpenClose({ jour, branch, setBranch }) {
  const arrayHour = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  const arrayMinute = ['00', '15', '30', '45'];

  const [hourOpen, setHourOpen] = useState();
  const [minOpen, setMinOpen] = useState();

  const [hourClose, setHourClose] = useState();
  const [minClose, setMinClose] = useState();

  //console.log("BRANCH: ", branch);

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
        {/* <TextField
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
        /> */}
        <Select
          id="hour_open"
          value={hourOpen}
          disabled={branch && !branch["info"]["opening_days"][jour]["open"]}
          onChange={(e) => {
            setHourOpen(e.target.value); 
            setBranch({
              ...branch,
              info: {
                ...branch.info,
                opening_days: {
                  ...branch.info.opening_days,
                  [jour]: {
                    ...branch.info.opening_days[jour],
                    open_hour: e.target.value + ":" + minOpen,
                  },
                },
              },
            })
          }}
        >
          {arrayHour.map(a => {
            return(
                <MenuItem value={a}>{a}</MenuItem>
            )
          })}
        </Select>
        :
        <Select
          id="min_open"
          value={minOpen}
          disabled={branch && !branch["info"]["opening_days"][jour]["open"]}
          onChange={(e) => {
            setMinOpen(e.target.value);
            setBranch({
              ...branch,
              info: {
                ...branch.info,
                opening_days: {
                  ...branch.info.opening_days,
                  [jour]: {
                    ...branch.info.opening_days[jour],
                    open_hour: hourOpen + ":" + e.target.value,
                  },
                },
              },
            })
          }}
        >
          {arrayMinute.map(a => {
            return(
                <MenuItem value={a}>{a}</MenuItem>
            )
          })}
        </Select>
      </Grid>
      <Grid item xs={12} sm={4}>
        {/* <TextField
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
        /> */}
        <Select
          id="hour_close"
          value={hourClose}
          disabled={ branch && !branch["info"]["opening_days"][jour]["open"]}
          onChange={(e) => {
            setHourClose(e.target.value);
            setBranch({
              ...branch,
              info: {
                ...branch.info,
                opening_days: {
                  ...branch.info.opening_days,
                  [jour]: {
                    ...branch.info.opening_days[jour],
                    closing_hour: e.target.value + ":" + minClose,
                  },
                },
              },
            })
          }}
        >
          {arrayHour.map(a => {
            return(
                <MenuItem value={a}>{a}</MenuItem>
            )
          })}
        </Select>
        :
        <Select
          id="min_close"
          value={minClose}
          disabled={branch && !branch["info"]["opening_days"][jour]["open"]}
          onChange={(e) => {
            setMinClose(e.target.value);
            setBranch({
              ...branch,
              info: {
                ...branch.info,
                opening_days: {
                  ...branch.info.opening_days,
                  [jour]: {
                    ...branch.info.opening_days[jour],
                    closing_hour: hourClose + ":" + e.target.value,
                  },
                },
              },
            })
          }}
        >
          {arrayMinute.map(a => {
            return(
                <MenuItem value={a}>{a}</MenuItem>
            )
          })}
        </Select>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={branch && branch["info"]["opening_days"][jour]["open"]}
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

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function AddCompany({ newCompany, setNewCompany }) {
  const classes = useStyles();

  const onChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.id]: e.target.value });
  };
  const handleSubmit = () => {};
  return (
    <div>
      <form
        className="reservation__inputs grid"
        noValidate
        onSubmit={handleSubmit}
      >
        <TextField
          id="name"
          label="Company Name"
          type="text"
          defaultValue={newCompany.name}
          className="reservation__input"
          onChange={() => onChange}
        />
        <div>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="type"
            value={newCompany.type}
            className="reservation__input"
            onChange={() => onChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="button"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default AddCompany;

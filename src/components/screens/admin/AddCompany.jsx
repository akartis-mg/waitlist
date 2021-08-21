import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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

  const typeCompany = useSelector((state) => state.typeCompany);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

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
          onChange={(e) => setNewCompany({...newCompany, company: {...newCompany.comapny, name: e.target.value}})}
        />
        <TextField
          id="logoUrl"
          label="Logo URL"
          type="text"
          defaultValue={newCompany.logoUrl}
          className="reservation__input"
          onChange={(e) => setNewCompany({...newCompany, company: {...newCompany.company, logoUrl: e.target.value}})}
        />
        <div>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="typeCompanyID"
            value={newCompany.typeCompanyID}
            className="reservation__input"
            onChange={(e) => setNewCompany({...newCompany, typeCompanyID: e.target.value})}
          >
            {typeCompany && typeCompany.map(tc => {
              return(
                <MenuItem value={tc._id}>{tc.name}</MenuItem>
              ) 
            })}
          </Select>
        </div>
      </form>
    </div>
  );
}

export default AddCompany;
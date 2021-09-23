import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
//actions

import { lele } from '../../../actions/companyActions'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function UpdateCompany({ lele, company  }) {
  const classes = useStyles();

  const typeCompany = useSelector((state) => state.typeCompany);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const [updateCompany, setUpdateCompany] = useState({
    company: {
      cid: company._id,
      name: company.name,
      logoUrl: company.logoUrl,
      isActive: company.isActive,
    },
    typeCompanyID: company.typeCompanyID,
  });

  const handleUpdateCompany = (e) => {
    //console.log("EEEETTTTTOOOOOO")
    e.preventDefault();
    console.log("UP: ", updateCompany);

    lele(updateCompany);

  }

  return (
    <div>
      <form
        className="reservation__inputs grid"
        noValidate
        onSubmit={handleUpdateCompany}
      >
        <TextField
          id="name"
          label="Company Name"
          type="text"
          defaultValue={updateCompany.company.name}
          className="reservation__input"
          onChange={(e) => setUpdateCompany({...updateCompany, company: {...updateCompany.company, name: e.target.value}})}
        />
        <TextField
          id="logoUrl"
          label="Logo URL"
          type="text"
          defaultValue={updateCompany.company.logoUrl}
          className="reservation__input"
          onChange={(e) => setUpdateCompany({...updateCompany, company: {...updateCompany.company, logoUrl: e.target.value}})}
        />
        <div>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="typeCompanyID"
            value={updateCompany.typeCompanyID}
            className="reservation__input"
            onChange={(e) => setUpdateCompany({...updateCompany, typeCompanyID: e.target.value})}
          >
            {typeCompany && typeCompany.map(tc => {
              return(
                <MenuItem value={tc._id}>{tc.name}</MenuItem>
              ) 
            })}
          </Select>
        </div>
        <Button type="sumbit" color="primary" autoFocus>
                  Update
                </Button>

      </form>
    </div>
  );
}


export default connect(null, {
  lele
}) (UpdateCompany);
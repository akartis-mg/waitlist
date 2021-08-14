import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function AddBranch({ companyDetails, branch, setBranch }) {
  // if (branchDetails != null) {
  //   setBranch({ ...branch, branchDetails });
  // }

  const onChange = (e) => {
    setBranch({ ...branch, [e.target.id]: e.target.value });
  };
  const handleSubmit = () => {};
  return (
    <div>
      <form
        className="reservation__inputs grid"
        noValidate
        onSubmit={handleSubmit}
      >
        {branch.name}
        <TextField
          id="name"
          label="Branch Name"
          type="text"
          defaultValue={branch.name}
          className="reservation__input"
          onChange={onChange}
        />

        <TextField
          id="average_duration"
          label="Average Duration"
          type="number"
          defaultValue={branch.average_duration}
          className="reservation__input"
          onChange={onChange}
        />

        <TextField
          id="street"
          label="Street"
          type="text"
          defaultValue={branch.address.street}
          className="reservation__input"
          onChange={(e) =>
            setBranch({ ...branch, "address.street": e.target.value })
          }
        />

        <TextField
          id="city"
          label="City"
          type="text"
          defaultValue={branch.address.city}
          className="reservation__input"
          onChange={(e) =>
            setBranch({ ...branch, "address.city": e.target.value })
          }
        />

        <TextField
          id="postal_code"
          label="Postal Code"
          type="number"
          defaultValue={branch.address.postal_code}
          className="reservation__input"
          onChange={(e) =>
            setBranch({ ...branch, "address.postal_code": e.target.value })
          }
        />

        <TextField
          id="longitude"
          label="Longitude"
          type="number"
          defaultValue={branch.address.longitude}
          className="reservation__input"
          onChange={(e) =>
            setBranch({ ...branch, "address.longitude": e.target.value })
          }
        />

        <TextField
          id="latitude"
          label="Latitude"
          type="number"
          defaultValue={branch.address.latitude}
          className="reservation__input"
          onChange={(e) =>
            setBranch({ ...branch, "address.latitude": e.target.value })
          }
        />

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

export default AddBranch;

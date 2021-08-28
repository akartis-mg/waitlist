import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import "./Companies.css";
import Company from "./company/Company";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

//stepper
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

//import actions
import { getTypeCompany } from "../../../actions/typeCompanyActions";
import { addCompany, getCompanies } from "../../../actions/companyActions";
import { addBranch } from "../../../actions/branchActions";
import { addStaff } from "../../../actions/staffActions";

//admin components
import AddCompany from "../admin/AddCompany";
import AddBranch from "../admin/AddBranch";
import AddManager from "../admin/AddManager";
import AddStaff from "../admin/AddStaff";

//modal
import MyModal from "../../dialog/myModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Add Company", "Add Branch", "Asign Staff"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Add Company";
    case 1:
      return "Add Branch";
    case 2:
      return "Add Branch Manager";
    default:
      return "Unknown step";
  }
}

function Companies({
  getTypeCompany,
  addCompany,
  getCompanies,
  addBranch,
  addStaff,
}) {
  const allCompany = useSelector((state) => state.company);
  const authBusiness = useSelector((state) => state.authBusiness.userBusiness);
  const [openNewCompany, setOpenNewCompany] = useState(false);
  const [openNewStaff, setOpenNewStaff] = useState(false);

  const [companies, setCompanies] = useState([{ allCompany }]);

  const [newCompany, setNewCompany] = useState({
    company: {
      name: "",
      logoUrl: "",
    },
    typeCompanyID: "",
  });

  const [branch, setBranch] = useState({
    cid: "",
    name: "",
    average_duration: 0,
    address: {
      street: "",
      city: "",
      postal_code: 0,
      longitude: 0,
      latitude: 0,
    },

    info: {
      opening_days: {
        monday: {
          open: true,
          open_hour: 0,
          closing_hour: 0,
          hour_interval: [],
        },
        tuesday: {
          open: true,
          open_hour: 0,
          closing_hour: 0,
          hour_interval: [],
        },
        wednesday: {
          open: true,
          open_hour: 0,
          closing_hour: 0,
          hour_interval: [],
        },
        thursday: {
          open: true,
          open_hour: 0,
          closing_hour: 0,
          hour_interval: [],
        },
        friday: {
          open: true,
          open_hour: 0,
          closing_hour: 0,
          hour_interval: [],
        },
        saturday: {
          open: true,
          open_hour: 0,
          closing_hour: 0,
          hour_interval: [],
        },
        sunday: {
          open: true,
          open_hour: 0,
          closing_hour: 0,
          hour_interval: [],
        },
      },
      phone: 0,
      website: "",
    },

    spots: {
      available: 0,
      not_available: 0,
    },
  });

  const [manager, setManager] = useState({
    bid: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    type: "Manager",
  });

  const [staff, setStaff] = useState({
    bid: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    type: "Staff",
  });

  const handleClickOpen = () => {
    setOpenNewCompany(true);
  };

  const handleClose = () => {
    setOpenNewCompany(false);
  };

  //for stepper

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAddCompany = () => {
    addCompany({
      company: {
        name: newCompany.company.name,
        logoUrl: newCompany.company.logoUrl,
      },
      typeCompanyID: newCompany.typeCompanyID,
    });

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    setNewCompany({
      company: {
        name: "",
        logoUrl: "",
      },
      typeCompanyID: "",
    });
  };

  const handleAddBranch = () => {
    const new_branch_localstorage = JSON.parse(
      localStorage.getItem("new_company")
    );

    for (let x in branch.info.opening_days) {
      let final_hours_interval = [];
      if (branch.info.opening_days[x].open) {
        let hours_interval = [];
        let intervalStart = moment(branch.info.opening_days[x].open_hour, "HH:mm").format("HH:mm");
        let intervalEnd = moment(branch.info.opening_days[x].closing_hour, "HH:mm").format("HH:mm");

        do {
          let start = intervalStart;
          let end = moment(intervalStart, "HH:mm").add(30, 'minutes').format("HH:mm");

          let newHoursInterval = {
            hours: start,
            seats: 0
          }

          hours_interval.push(newHoursInterval);

          intervalStart = end;
        } while (
          intervalStart <= intervalEnd
        );

        final_hours_interval.push(hours_interval);       
      }

      branch.info.opening_days[x].hour_interval = final_hours_interval;
    }

    branch.cid = new_branch_localstorage._id;

    const newBranch = {
      cid: new_branch_localstorage._id,
      branch,
    };

    addBranch(newBranch);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    setBranch({
      cid: "",
      name: "",
      average_duration: 0,
      address: {
        street: "",
        city: "",
        postal_code: 0,
        longitude: 0,
        latitude: 0,
      },

      info: {
        opening_days: {
          monday: {
            open: true,
            open_hour: 0,
            closing_hour: 0,
          },
          tuesday: {
            open: true,
            open_hour: 0,
            closing_hour: 0,
          },
          wednesday: {
            open: true,
            open_hour: 0,
            closing_hour: 0,
          },
          thursday: {
            open: true,
            open_hour: 0,
            closing_hour: 0,
          },
          friday: {
            open: true,
            open_hour: 0,
            closing_hour: 0,
          },
          saturday: {
            open: true,
            open_hour: 0,
            closing_hour: 0,
          },
          sunday: {
            open: true,
            open_hour: 0,
            closing_hour: 0,
          },
        },
        phone: 0,
        website: "",
      },

      spots: {
        available: 0,
        not_available: 0,
      },
    });
  };

  const handleAddManager = () => {
    const new_manager_localstorage = JSON.parse(
      localStorage.getItem("new_branch")
    );

    manager.bid = new_manager_localstorage._id;
    manager.password = manager.firstname + manager.lastname;

    const newManager = {
      bid: new_manager_localstorage._id,
      manager,
    };

    addStaff(newManager);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    setManager({
      bid: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      type: "Manager",
    });
  };

  const classes = useStyles();

  useEffect(() => {
    getTypeCompany();
    getCompanies();
  }, []);

  return (
    <div className="companies section">
      <h2 className="section__title">Companies List</h2>
      <span className="section__subtitle">List of all companies</span>

      {authBusiness.type == "Superadmin" ? (
        <div className="admin__view">
          <button className="button button" onClick={handleClickOpen}>
            Add new Company
          </button>
        </div>
      ) : authBusiness.type == "Manager" ? (
        <div className="admin__view">
          <button
            className="button button"
            onClick={() => setOpenNewStaff(true)}
          >
            Add Staff
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className="companies__container  grid">
        <div className="companies__list">
          {allCompany.map((c, index) => (
            <>
              {authBusiness.type == "Manager" ? (
                <>
                  {allCompany[index].branchs &&
                    allCompany[index].branchs.map((b, ind) => (
                      <>
                        {authBusiness.bid &&
                          authBusiness.bid.map((bauth, indx) => (
                            <>
                              {allCompany[index].branchs[ind]._id ==
                                authBusiness.bid[indx] ? (
                                <>
                                  <Company
                                    key={allCompany[index]._id}
                                    company={allCompany[index]}
                                    setNewCompany={setNewCompany}
                                    setBranch={setBranch}
                                  />
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          ))}
                      </>
                    ))}
                </>
              ) : (
                <Company
                  key={allCompany[index]._id}
                  company={allCompany[index]}
                  setNewCompany={setNewCompany}
                  setBranch={setBranch}
                />
              )}
            </>
          ))}
        </div>
      </div>

      {/* modal for add staff */}
      <MyModal
        open={openNewStaff}
        setOpenMyModal={setOpenNewStaff}
        title="New Staff"
        contents={
          <>
            <AddStaff staff={staff} setStaff={setStaff} setOpenMyModal={setOpenNewStaff} />
          </>
        }
      />

      {/* dialog */}
      <div>
        <Dialog
          open={openNewCompany}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add Company</DialogTitle>

          <DialogContent>
            <div className="reservation__content ">
              <div className="reservation__content ">
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  {activeStep === 3 ? (
                    <div>
                      <Typography className={classes.instructions}>
                        All steps completed
                      </Typography>
                      <Button onClick={handleReset}>Reset</Button>
                    </div>
                  ) : (
                    <div>
                      {activeStep === 0 ? (
                        <div>
                          <AddCompany
                            newCompany={newCompany}
                            setNewCompany={setNewCompany}
                          />

                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddCompany}
                            >
                              {activeStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
                            </Button>
                          </div>
                        </div>
                      ) : activeStep === 1 ? (
                        /* Add branch*/
                        <div>
                          <AddBranch branch={branch} setBranch={setBranch} />
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddBranch}
                            >
                              {activeStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
                            </Button>
                          </div>
                        </div>
                      ) : activeStep === 2 ? (
                        /* Add manager*/
                        <div>
                          <AddManager
                            manager={manager}
                            setManager={setManager}
                          />
                          <div>
                            <Button
                              onClick={handleBack}
                              className={classes.backButton}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddManager}
                            >
                              {activeStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default connect(null, {
  getTypeCompany,
  addCompany,
  getCompanies,
  addBranch,
  addStaff,
})(Companies);

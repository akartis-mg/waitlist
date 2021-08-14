import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import "./Companies.css";
import Company from "./company/Company";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';

//stepper
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

//import actions
import { getTypeCompany } from '../../../actions/typeCompanyActions';
import { addCompany } from '../../../actions/companyActions';

//admin components
import AddCompany from "../admin/AddCompany";

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
      return "Asign Staff";
    default:
      return "Unknown step";
  }
}

function Companies({getTypeCompany, addCompany}) {
  const typeCompany = useSelector(state => state.typeCompany);

  const [openNewCompany, setOpenNewCompany] = useState(false);

  const [newCompany, setNewCompany] = useState({
    name: "",
    typeCompanyID: "",
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
      name: newCompany.name,
      typeCompanyID: newCompany.typeCompanyID
    });

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    setNewCompany({
      name: "",
      typeCompanyID: ""
    })
  }

  const classes = useStyles();

  const companies = [
    {
      id: 1,
      logo: "https://cdn.freelogovectors.net/wp-content/uploads/2018/03/kfc-logo01.png",
      name: "KFC",
    },
    {
      id: 2,
      logo: "https://media.designrush.com/inspiration_images/134933/conversions/_1511456189_555_McDonald's-mobile.jpg",
      name: "Mc Do",
    },
    {
      id: 3,
      logo: "https://1000logos.net/wp-content/uploads/2017/09/Font-Nandos-Logo.jpg",
      name: "Nandos",
    },
    {
      id: 4,
      logo: "https://logowik.com/content/uploads/images/310_burgerking.jpg",
      name: "Burger King",
    },
    {
      id: 5,
      logo: "https://www.gatewayworld.co.za/shopping/uploads/rocomamas.jpg",
      name: "Rocomamas",
    },
    {
      id: 6,
      logo: "https://canalwalk.co.za/storage/app/uploads/public/5b0/e79/0ad/thumb_1290_0_0_0_0_auto.png",
      name: "Mugg & Bean ",
    },
    {
      id: 7,
      logo: "https://upload.wikimedia.org/wikipedia/en/1/1e/Steers_Logo.jpg",
      name: "Streers",
    },
    {
      id: 8,
      logo: "https://trafft.com/wp-content/uploads/2021/04/heade-logoo.jpg",
      name: "Barber",
    },
    {
      id: 9,
      logo: "https://media-cdn.tripadvisor.com/media/photo-s/06/fd/35/62/panarottis-george.jpg",
      name: "Panarottis",
    },
    {
      id: 10,
      logo: "https://www.pagesjaunes.mg/logos/240x240r/gastronomie-pizza-logo-8.jpg",
      name: "La Gastro Pizza",
    },
    {
      id: 11,
      logo: "https://www.logoinspirations.co/wp-content/uploads/2018/01/sushi-logo.png",
      name: "Sushi",
    },
    {
      id: 12,
      logo: "data:image/jpeg;base64,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",
      name: "Cafe Lux",
    },
  ];

  useEffect(() => {
    getTypeCompany();
  }, [])

  return (
    <div className="companies section">
      <h2 className="section__title">Companies List</h2>
      <span className="section__subtitle">List of all companies</span>

      <div className="admin__view">
        <button className="button button" onClick={handleClickOpen}>
          {" "}
          Add new Company
        </button>
      </div>

      <div className="companies__container  grid">
        <div className="companies__list">
          {companies.map((c) => (
            <Company key={c.id} company={c} />
          ))}
        </div>
      </div>

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
                          <div>
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              className={classes.backButton}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
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

                      {/* <div>
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText> */}
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
    </div>
  );
}

export default connect(null, { getTypeCompany, addCompany })(Companies);
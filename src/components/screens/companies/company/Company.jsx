import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardActionArea from "@material-ui/core/CardActionArea";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from "moment";


import { connect } from "react-redux";

//list
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";

//icons
import StarIcon from "@material-ui/icons/Star";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";

import "./Company.css";

//modal
import ReservationModal from "../../reservation/ReservationModal";
import MyModal from "../../../dialog/myModal";

//admin edit
import AddCompany from "../../admin/AddCompany";
import UpdateCompany from "../../admin/UpdateCompany";

import AddBranch from "../../admin/AddBranch";

//reservation components
import Calendars from "../../calendars/Calendars";
import Button from "@material-ui/core/Button";

//actions
import { addBranch } from "../../../../actions/branchActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 305,
    maxWidth: 305,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
function Company({ company, setNewCompany, branch, setBranch , addBranch }) {
  const authBusiness = useSelector((state) => state.authBusiness.userBusiness);

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [branchDetails, setBranchDetails] = useState({});

  const [branchNew, setBranchNew] = useState({
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
    },
  });

  const list = [
    {
      cid: 1,
      name: "branch1",
      average_duration: 30,
      address: {
        street: "14 avenue",
        city: "Qb",
        postal_code: 31,
        longitude: 45,
        latitude: 5765,
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
            open: false,
            open_hour: 0,
            closing_hour: 0,
          },
        },
        phone: 0,
        website: "",
      },
      spots: {
        available: 35,
        not_available: 0,
      },
    },
  ];

  //expand branches
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  //edit company
  const [openModalEditCompany, setOpenModalEditCompany] = useState(false);

  //branch management
  const [openModalBranch, setOpenModalBranch] = useState(false);
  const [openModalAddBranch, setOpenModalAddBranch] = useState(false);
  //reservation
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleAddBranch = () => {
    // const new_branch_localstorage = JSON.parse(
    //   localStorage.getItem("new_company")
    // );
    let branch = branchNew;
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
            seats_total: 100,
            seats_available: 100
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

    branch.cid = company._id;

    const newBranch = {
      cid: company._id,
      branch,
    };

    addBranch(newBranch);


    setBranchNew({
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
      },
    });
  };
  

  return (
    <div>
      {/* modal for reservation */}
      <ReservationModal
        open={open}
        setOpen={setOpen}
        title={company.name}
        contents={branchDetails}
      />

      {/* modal for edit company */}
      {authBusiness && authBusiness.type == "Superadmin" ? (
        <>
          <MyModal
            open={openModalEditCompany}
            setOpenMyModal={setOpenModalEditCompany}
            title="Edit Company"
            contents={
              <>
                <UpdateCompany
                  company={company}
                  setNewCompany={setNewCompany}
                />
              </>
            }
          
          />
        </>
      ) : (
        <></>
      )}

      {/* modal for branch manage */}
      {authBusiness && (authBusiness?.type == "Manager" || authBusiness?.type == "Superadmin") ? (
        <>
          <MyModal
            open={openModalBranch}
            setOpenMyModal={setOpenModalBranch}
            title="Branch"
            contents={
              <>
                <AddBranch
                  companyDetails={company}
                  branch={branchDetails}
                  setBranch={setBranch}
                />
              </>
            }
          />


        <MyModal
            open={openModalAddBranch}
            setOpenMyModal={setOpenModalAddBranch}
            title="Add Branch"
            contents={
              <>
                <AddBranch
                  companyDetails={company}
                  branch={branchNew}
                  setBranch={setBranchNew}
                />
              </>
            }
            action={
              <>

          <Button  color="primary"  onClick={handleAddBranch}  autoFocus>
            Confirm
          </Button>
              </>
            }
          />
        </>
      ) : (
        <></>
      )}

      {/* modal for reservation */}
      <MyModal
        open={openCalendar}
        setOpenMyModal={setOpenCalendar}
        title="Reservation"
        contents={
          <>
            <Calendars where="add" company={company} branch={branchDetails} />
          </>
        }
      />
      {/* list all copmany */}
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={company.logoUrl}
          title={company.name}
        />
        <CardHeader
          action={
            <>
              <div>
                {authBusiness && authBusiness.type == "Superadmin" ? (
                  <>
                    <IconButton
                      aria-label="show more"
                      onClick={() => setOpenModalEditCompany(true)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-label="show more"
                      onClick={() => setOpenModalAddBranch(true)}
                    >
                      <AddIcon />
                    </IconButton>
                  </>
                ) : (
                  <></>
                )}

                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </div>
            </>
          }
          subheader={company.name}
        />

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>All branches :</Typography>
            <List
              component="nav"
              className={classes.list}
              aria-label="contacts"
            >

              {company.branchs
              .map((ls) => (
               <ListItem>
                <ListItemText primary={ls.name} />
                  <IconButton
                    onClick={() => {
                      setOpenCalendar(true);
                      // pass all branch details
                      setBranchDetails(ls);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {(authBusiness.type == "Manager" && ls._id == authBusiness.bid ) || (authBusiness.type == "Superadmin" )  ?

                   (
                      <IconButton
                      onClick={() => {
                        setOpenModalBranch(true);
                        setBranchDetails(ls);
                      }}
                      >
                        <EditIcon />
                      </IconButton>
                   ) :
                      (
                        <></>
                      )
                  }
                 
             </ListItem>
              ))}
              
            {/*  {company.branchs.map((l) => (
                <>
                  {authBusiness && authBusiness.type == "Manager" ? (
                    <>
                      {authBusiness.type == "Manager" ? (
                        <>
                          {authBusiness.bid.map((bauth, index) => (
                            <>
                              {authBusiness.bid[index] == l._id ? (
                                <>
                                  <ListItem>
                                    <ListItemText primary={l.name} />
                                    <IconButton
                                      onClick={() => {
                                        setOpenCalendar(true);
                                        // pass all branch details
                                        setBranchDetails(l);
                                      }}
                                    >
                                      <VisibilityIcon />
                                    </IconButton>

                                    <IconButton
                                      onClick={() => {
                                        setOpenModalBranch(true);
                                        setBranchDetails(l);
                                      }}
                                    >
                                      <StarIcon />
                                    </IconButton>
                                  </ListItem>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      <ListItem>
                        <ListItemText primary={l.name} />

                        <IconButton
                          onClick={() => {
                            setOpenCalendar(true);
                            // pass all branch details
                            setBranchDetails(l);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>

                        {/* <IconButton
                        onClick={() => {
                          setOpenModalBranch(true);
                          //console.log(l);
                          setBranchDetails(l);
                        }}
                      >
                        <EditIcon />
                      </IconButton> 
                      </ListItem>
                    </>
                  )}
                </>
              ))} */}

              {/* {company.branchs.map((l) => (
                <ListItem>
                  <ListItemText primary={l.name} />

                  <IconButton
                    onClick={() => {
                      setOpenCalendar(true);
                      // pass all branch details
                      setBranchDetails(l);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      setOpenModalBranch(true);
                      //console.log(l);
                      setBranchDetails(l);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItem>
              ))} */}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}


export default connect(null, {
  addBranch
})(Company);


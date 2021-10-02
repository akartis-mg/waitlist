import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SummaryResa from "../../summary/SummaryResa";
import CardReservation from "../../card/CardReservationUser";
import Title from "../../title/Title";
import Button from "@material-ui/core/Button";
import ButtonAppBar from "../../appbar/ButtonAppBar";
import SearchBar from "material-ui-search-bar";
import MyModal from "../../dialog/myModal";
import CalendarsUpdate from "../calendars/CalendarsUpdate";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { getCompanies } from "../../../actions/companyActions";
import { getDateResaById } from "../../../actions/dateResaActions";
import {
  getReservationByBranchId,
  getAllReservationByUser,
} from "../../../actions/reservationActions";
import { setHeaders } from "../../../api/headers";
import axios from "axios";

import { MissedVideoCall } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from "@material-ui/icons/Close";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    maxHeight: 800,
  },
  fixedHeight: {
    height: 120,
    borderRadius: 15,
  },
  listResa: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "row",
    marginTop: 10,
  },
  search: {
    borderRadius: 20,
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "1px solid #ced4da",
  },
}));
function ListResaUser({
  getCompanies,
  getDateResaById,
  getReservationByBranchId,
  getAllReservationByUser,
}) {
  //const allCompany = useSelector((state) => state.company);
  //const branchId = useSelector((state) => state.authBusiness.userBusiness.bid);
  //const branchIdString = branchId.toString();
  const dateResa = useSelector((state) => state.dateresa);
  const reservationlist = useSelector((state) => state.reservation);
  const auth = useSelector((state) => state.auth.user);
  //GET ONE COMPANY
  // const companyForTheBranch = allCompany.filter((eachVal) => {
  //   let opt = eachVal.branchs.some(({ _id }) => _id === branchIdString);
  //   return opt;
  // });

  //GET BRANCH DETAILS
  /*const oneBranchDetails = companyForTheBranch[0].branchs.filter(
    (branch) => branch._id === branchIdString
  );*/

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [search, setSearch] = useState(null);
  const [searchProgress, setSearchProgress] = useState("");
  //reservation
  const [openCalendar, setOpenCalendar] = useState(false);

  //get branch details from staff
  const [branch, setBranch] = useState();
  const [company, setCompany] = useState();

  //const [listResaDummy, setListResaDummy] = useState([]);

  //backdrop
  const [open, setOpen] = React.useState(false);

  const listResaDummy = [
    {
      _id: 1,
      bid: "610c47ef28e1dd2be86d11b2",
      uid: "610e9dfe4a6f3137d05a350b",
      name: "resa 2",
      nb_spots: 5,
      date_reservation: "2021-07-31",
      time: "09:00",
    },
    {
      _id: 2,
      bid: "610c47ef28e1dd2be86d11b2",
      uid: "610e9dfe4a6f3137d05a350b",
      name: "resa 4",
      nb_spots: 8,
      date_reservation: "2021-07-31",
      time: "19:00",
    },
  ];

  const [resaInfo, setResaInfo] = useState({});

  useEffect(() => {
    getAllReservationByUser(auth._id);
  }, []);

  const listResaID = [];
  const listResaFinal = [];

  async function fetchBranchDetails(bid) {
    try {
      const res = await axios
        .get("/api/branch/findOneBranch/" + bid, setHeaders(auth.token))
        .then(async (res) => {
          setBranch(res.data);
          //console.log("BRANCH", res.data);
          const rescompany = await axios
            .get(
              "/api/company/findOneCompany/" + res.data.cid,
              setHeaders(auth.token)
            )
            .then(async (res) => {
              setCompany(res.data);
              //console.log("COMPANY", res.data);
            });
        });

      //console.warn(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleUpdateUser = async (data) => {
    await handleToggle();
    await setResaInfo(data);
    //console.log("Tedfet", data);
    await fetchBranchDetails(data.bid);
    await setOpenCalendar(true);
  };

  useEffect(() => {
    handleClose();
  }, [openCalendar]);

  const waitingList = reservationlist.filter((opt) => opt.status == "waiting");
  const confirmList = reservationlist.filter((opt) => opt.status == "confirm");

  console.log(waitingList);
  return (
    <div className={classes.root}>
      {/* modal for reservation */}
      <MyModal
        open={openCalendar}
        setOpenMyModal={setOpenCalendar}
        title="Update Reservation"
        contents={
          <>
            <CalendarsUpdate
              resaInfo={resaInfo}
              company={company}
              branch={branch}
            />
          </>
        }
      />

      <CssBaseline />
      {/* <ButtonAppBar
        title="Staff"
        buttons={
          <>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>
          </>
        }
      /> */}
      <main className={classes.content}>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Waiting*/}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                className={fixedHeightPaper}
                style={{ backgroundColor: "var(--input-color)" }}
              >
                <SummaryResa title="Waiting" number={10000} />
              </Paper>
            </Grid>

            {/* New List resa */}

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <Title color="primary">Wait List</Title>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={waitingList.map((option) => option.name)}
                    value={search}
                    onChange={(event, value) => setSearch(value)}
                    closeIcon={<CloseIcon fontSize="small" />}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search"
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>

              {/* <Paper
                className={classes.paper}
                style={{ backgroundColor: "none" }}
              > */}
              <Grid container spacing={2} className={classes.listResa}>
                {search
                  ? waitingList
                      .filter(
                        (opt) => opt.name.toUpperCase() == search.toUpperCase()
                      )
                      .map((ls, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                          <CardReservation
                            data={ls}
                        
                            setResaInfo={setResaInfo}
                            handleUpdateUser={handleUpdateUser}
                          />
                        </Grid>
                      ))
                  : waitingList.map((ls, i) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                        <CardReservation
                          data={ls}
                        
                          setResaInfo={setResaInfo}
                          handleUpdateUser={handleUpdateUser}
                        />
                      </Grid>
                    ))}

                {/* <Grid item xs={12} md={4} lg={3}>
                    <CardReservation setOpenCalendar={setOpenCalendar} />
                  </Grid> */}
              </Grid>
              {/* </Paper> */}
            </Grid>

            {/* reservation in progress */}
            {confirmList.length != 0 ? (
              <>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <Title color="primary">Inprogress List</Title>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      {/* <SearchBar
                    className={classes.search}
                    placeholder="Filter inprogress list"
                    value={searchProgress}
                    onChange={(newValue) => setSearchProgress(newValue)}
                    //onRequestSearch={() => doSomethingWith(this.state.value)}
                  /> */}

                      <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={confirmList.map((option) => option.name)}
                        value={searchProgress}
                        onChange={(event, value) => setSearchProgress(value)}
                        closeIcon={<CloseIcon fontSize="small" />}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Search"
                            margin="normal"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Paper
                    className={classes.paper}
                    style={{ backgroundColor: "#a8e6cf" }}
                  >
                    <Grid container spacing={2} className={classes.listResa}>
                      {searchProgress
                        ? confirmList.map((ls, i) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                              <CardReservation
                                data={ls}
                                setResaInfo={setResaInfo}
                                handleUpdateUser={handleUpdateUser}
                              />
                            </Grid>
                          ))
                        : confirmList.map((ls, i) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                              <CardReservation
                                data={ls}
                                setResaInfo={setResaInfo}
                                handleUpdateUser={handleUpdateUser}
                              />
                            </Grid>
                          ))}
                      {/* <Grid item xs={12} md={4} lg={3}>
                    <CardReservation setOpenCalendar={setOpenCalendar} />
                  </Grid> */}
                    </Grid>
                  </Paper>
                </Grid>
              </>
            ) : null}
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  );
}

export default connect(null, {
  getCompanies,
  getDateResaById,
  getReservationByBranchId,
  getAllReservationByUser,
})(ListResaUser);

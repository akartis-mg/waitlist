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
import CardReservation from "../../card/CardReservation";
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
import { getReservationByBranchId } from "../../../actions/reservationActions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
    marginTop: 20,
  },
  search: {
    borderRadius: 20,
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "1px solid #ced4da",
  },
}));
function ListResa({ getCompanies, getDateResaById, getReservationByBranchId }) {
  const allCompany = useSelector((state) => state.company);
  const branchId = useSelector((state) => state.authBusiness.userBusiness.bid);
  const branchIdString = branchId.toString();
  const dateResa = useSelector((state) => state.dateresa);
  const reservationlist = useSelector((state) => state.reservation);

  //GET ONE COMPANY
  const companyForTheBranch = allCompany.filter((eachVal) => {
    let opt = eachVal.branchs.some(({ _id }) => _id === branchIdString);
    return opt;
  });

  //GET BRANCH DETAILS
  const oneBranchDetails = companyForTheBranch[0].branchs.filter(
    (branch) => branch._id === branchIdString
  );

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [search, setSearch] = useState("");
  const [searchConfirm, setSearchConfirm] = useState(null);
  const [searchDone, setSearchDone] = useState(null);
  const [searchDisable, setSearchDisable] = useState(null);
  //reservation
  const [openCalendar, setOpenCalendar] = useState(false);

  //get branch details from staff
  const [branch, setBranch] = useState(oneBranchDetails[0]);
  const [company, setCompany] = useState(companyForTheBranch[0]);

  //const [listResaDummy, setListResaDummy] = useState([]);

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
    getCompanies();
    getDateResaById(branchId[0]);
    getReservationByBranchId(branchId[0]);
    //getOneReservation("6130e48aa2425da8a0bf5dd3");
    //console.log("Valiny", reseravtionlist);
  }, []);

  // useEffect(() => {
  //   setListResaDummy(dateResa);
  // }, [listResaDummy]);

  //get resa length
  //const intervalLength = dateResa[0].info.interval.length();

  //console.log("INFO: ", intervalLength);

  const listResaID = [];
  const listResaFinal = [];

  dateResa.map((date) => {
    date.info.map((i) => {
      i.interval.map((inter) => {
        inter.id_resa.map((oneId) => {
          console.log(oneId);

          if (!listResaID.includes(oneId)) {
            listResaID.push(oneId);
          }
          //listResaFinal.push()
          //setState((prev) => [...prev, oneId]);
        });
      });
    });
  });

  console.log(listResaID);

  listResaID.map((ls) => {
    //getMyResa(ls)
    //getOneReservation(ls);
    //console.log("Valiny", reseravtionlist);
    //const res = getOneReservation(ls);
    //listResaFinal.push(res);
  });

  //console.log("Valiny", reservationlist);

  // async function getMyResa(ls) {
  //   try {
  //     const res = await getOneReservation(ls);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  const waitingList = reservationlist.filter((opt) => opt.status == "waiting");
  const confirmList = reservationlist.filter((opt) => opt.status == "confirm");
  const doneList = reservationlist.filter((opt) => opt.status == "done");
  const disableList = reservationlist.filter((opt) => opt.status == "disable");
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
      <ButtonAppBar
        title="Staff"
        buttons={
          <>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>
          </>
        }
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Waiting*/}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                className={fixedHeightPaper}
                style={{ backgroundColor: "#84e3c8" }}
              >
                <SummaryResa title="Waiting" number={10000} />
              </Paper>
            </Grid>
            {/* Confirm */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                className={fixedHeightPaper}
                style={{ backgroundColor: "#a8e6cf" }}
              >
                <SummaryResa title="Confirm" number={10000} />
              </Paper>
            </Grid>

            {/* in Progress */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                className={fixedHeightPaper}
                style={{ backgroundColor: "#dcedc1" }}
              >
                <SummaryResa title="in Progress" number={10000} />
              </Paper>
            </Grid>

            {/* Available spot ff8b94 */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                className={fixedHeightPaper}
                style={{ backgroundColor: "#ffaaa5" }}
              >
                <SummaryResa title="Spots" number="10/50" />
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

              <Paper
                className={classes.paper}
                style={{ backgroundColor: "#ffaaa5" }}
              >
                <Grid container spacing={2} className={classes.listResa}>
                  {waitingList
                    .filter((opt) =>
                      search
                        ? opt.name.toUpperCase() == search.toUpperCase()
                        : []
                    )
                    .map((ls, i) => (
                      <Grid item xs={12} md={4} lg={3} key={i}>
                        <CardReservation
                          data={ls}
                          company={company}
                          branch={branch}
                          setResaInfo={setResaInfo}
                          setOpenCalendar={setOpenCalendar}
                        />
                      </Grid>
                    ))}

                  {/* <Grid item xs={12} md={4} lg={3}>
                    <CardReservation setOpenCalendar={setOpenCalendar} />
                  </Grid> */}
                </Grid>
              </Paper>
            </Grid>

            {/* reservation in progress */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <Title color="primary">Inprogress List</Title>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={confirmList.map((option) => option.name)}
                    value={searchConfirm}
                    onChange={(event, value) => setSearchConfirm(value)}
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
                  {confirmList
                    .filter((opt) =>
                      searchConfirm
                        ? opt.name.toUpperCase() == searchConfirm.toUpperCase()
                        : []
                    )
                    .map((ls, i) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                        <CardReservation
                          data={ls}
                          setResaInfo={setResaInfo}
                          setOpenCalendar={setOpenCalendar}
                        />
                      </Grid>
                    ))}

                  {/* <Grid item xs={12} md={4} lg={3}>
                    <CardReservation setOpenCalendar={setOpenCalendar} />
                  </Grid> */}
                </Grid>
              </Paper>
            </Grid>

            {/* reservation done */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <Title color="primary">Done List</Title>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={doneList.map((option) => option.name)}
                    value={searchDone}
                    onChange={(event, value) => setSearchDone(value)}
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
                style={{ backgroundColor: "#dcedc1" }}
              >
                <Grid container spacing={2} className={classes.listResa}>
                  {doneList
                    .filter((opt) =>
                      searchDone
                        ? opt.name.toUpperCase() == searchDone.toUpperCase()
                        : []
                    )
                    .map((ls, i) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                        <CardReservation
                          data={ls}
                          setResaInfo={setResaInfo}
                          setOpenCalendar={setOpenCalendar}
                        />
                      </Grid>
                    ))}

                  {/* <Grid item xs={12} md={4} lg={3}>
                    <CardReservation setOpenCalendar={setOpenCalendar} />
                  </Grid> */}
                </Grid>
              </Paper>
            </Grid>

            {/* reservation disable */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <Title color="primary">Disable List</Title>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={disableList.map((option) => option.name)}
                    value={searchDisable}
                    onChange={(event, value) => setSearchDisable(value)}
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
                style={{ backgroundColor: "#ffaaa5" }}
              >
                <Grid container spacing={2} className={classes.listResa}>
                  {disableList
                    .filter((opt) =>
                      searchDisable
                        ? opt.name.toUpperCase() == searchDisable.toUpperCase()
                        : []
                    )
                    .map((ls, i) => (
                      <Grid item xs={12} md={4} lg={3} key={i}>
                        <CardReservation
                          data={ls}
                          setResaInfo={setResaInfo}
                          setOpenCalendar={setOpenCalendar}
                        />
                      </Grid>
                    ))}

                  {/* <Grid item xs={12} md={4} lg={3}>
                    <CardReservation setOpenCalendar={setOpenCalendar} />
                  </Grid> */}
                </Grid>
              </Paper>
            </Grid>
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
})(ListResa);

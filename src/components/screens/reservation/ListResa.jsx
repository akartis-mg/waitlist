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
function ListResa({ getCompanies, getDateResaById }) {
  const allCompany = useSelector((state) => state.company);
  const branchId = useSelector((state) => state.authBusiness.userBusiness.bid);
  const branchIdString = branchId.toString();

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

  //reservation
  const [openCalendar, setOpenCalendar] = useState(false);

  //get branch details from staff
  const [branch, setBranch] = useState(oneBranchDetails[0]);
  const [company, setCompany] = useState(companyForTheBranch[0]);

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

  const [managerResa, setManagerResa] = useState({});
  const valiny = getDateResaById({ branchId: branchIdString });
  console.log("MY RESa", branchIdString);
  useEffect(() => {
    getCompanies();
  }, []);

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
                <SummaryResa title="Confirm" number={10000} color="#2b9348" />
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
                  <SearchBar
                    className={classes.search}
                    placeholder="Filter waiting list"
                    value={search}
                    onChange={(newValue) => setSearch(newValue)}
                    //onRequestSearch={() => doSomethingWith(this.state.value)}
                  />
                </Grid>
              </Grid>

              <Paper
                className={classes.paper}
                style={{ backgroundColor: "#ffaaa5" }}
              >
                <Grid container spacing={2} className={classes.listResa}>
                  {listResaDummy.map((ls) => (
                    <Grid item xs={12} md={4} lg={3}>
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

export default connect(null, { getCompanies, getDateResaById })(ListResa);

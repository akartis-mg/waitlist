import React, { useState } from "react";
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

//list
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";

//icons
import StarIcon from "@material-ui/icons/Star";

import "./Company.css";

//modal
import ReservationModal from "../../reservation/ReservationModal";

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
function Company({ logo, name }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [branchDetails, setBranchDetails] = useState([]);

  const list = [
    {
      id: 1,
      names: "branch1",
    },
    {
      id: 2,
      names: "branch2",
    },
    {
      id: 3,
      names: "branch3",
    },
    {
      id: 4,
      names: "branch4",
    },
    {
      id: 5,
      names: "branch5",
    },
  ];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <ReservationModal
        open={open}
        setOpen={setOpen}
        title={name}
        contents={branchDetails}
      />
      <Card className={classes.root}>
        <CardActionArea onClick={handleExpandClick}>
          <CardMedia className={classes.media} image={logo} title={name} />
          <CardHeader
            action={
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
            }
            subheader={name}
          />
          {/*   <CardContent>
             <Typography gutterBottom variant="h6" component="h6">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography> 
          </CardContent>*/}
        </CardActionArea>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>All branches :</Typography>

            <List
              component="nav"
              className={classes.list}
              aria-label="contacts"
            >
              {list.map((l) => (
                // Correct ! La clé doit être spécifiée dans le tableau.
                <ListItem
                  button
                  onClick={() => {
                    setOpen(true);
                    // pass all branch details
                    setBranchDetails(l);
                  }}
                >
                  <ListItemText primary={l.names} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default Company;

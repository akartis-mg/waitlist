import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PhoneInput from 'react-phone-input-2'
import { connect } from 'react-redux';

import { registerBusiness } from '../../../actions/authBusinessActions';

import 'react-phone-input-2/lib/material.css'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function RegisterBusiness({ registerBusiness }) {
    const authBusiness = useSelector(state => state.authBusiness.userBusiness);
    console.log("REGISTER BUSINESS: ", authBusiness);

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        type: "",
        bid: authBusiness.bid,
    });
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const options = [
        'Manager',
        'Staff',
    ];

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(2);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setUser({ ...user, type: options[index] })
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const registerHandler = (e) => {
        e.preventDefault();

        if (user.password !== confirmpassword) {

            setUser({ ...user, password: "" });
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords do not match");
        }

        setUser({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            password: user.password,
            type: user.type,
            bid: authBusiness.bid,
        })

        console.log("NEW USER:", user)

        registerBusiness(user);

        setUser({
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            password: "",
            type: "",
            bid: authBusiness.bid,
        })
    };

    const classes = useStyles();

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    value={user.firstname}
                                    onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value={user.lastname}
                                    onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PhoneInput
                                    required
                                    country={'mu'}
                                    value={user.phone}
                                    onChange={(phone) => setUser({ ...user, phone: phone })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <List component="nav" aria-label="Device settings">
                                    <ListItem
                                        button
                                        aria-haspopup="true"
                                        aria-controls="lock-menu"
                                        aria-label="when device is locked"
                                        onClick={handleClickListItem}
                                    >
                                        <ListItemText primary="User type" secondary={options[selectedIndex]} />
                                    </ListItem>
                                </List>
                                <Menu
                                    id="lock-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    id="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmpassword"
                                    label="Confirm Password"
                                    type="password"
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    id="confirmpassword"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary "
                            className={`${classes.submit} button`}
                            onClick={registerHandler}
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    )
}

export default connect(null, { registerBusiness })(RegisterBusiness);

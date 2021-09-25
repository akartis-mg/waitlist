import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';


function listItem({ staff }) {


    const handleToggle = (value) => () => {

    };
    return (
        <ListItem key={staff._id} role={undefined} dense button >
            <ListItemIcon>

            </ListItemIcon>
            <ListItemText primary={staff.firstname} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default listItem

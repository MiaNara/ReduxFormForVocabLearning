import React from 'react'
import userData from '../list/UserData';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { deleteUser, updateUsername } from '../features/Users';


export default function UserList() {
    const dispatch = useDispatch();
    const UserData = useSelector((state)=> state.users.value);  
    const [newUsername,setNewUsername]=useState('');
    

    return (
        <div sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', bgcolor: 'background.paper', margin: '10px;' }}>
            <List>
                {UserData.map((user) => {
                    return (

                    <ListItem key={user.id}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1 },
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <Avatar src="/broken-image.jpg" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText sx={{ width: '10vw' }} primary={user.name} secondary={user.username} />
                            <TextField placeholder='Type new username...'
                                onChange={(e) => setNewUsername(e.target.value)}
                                sx={{ width: '30vw' }} id="standard-basic" label="Standard" variant="standard" />
                            <Button onClick={() => { dispatch(updateUsername({ id: user.id, username: newUsername })); }}
                                variant="contained">Update</Button>
                            <IconButton sx={{ margin: '0', bgcolor: 'background.paper' }} aria-label="delete" color="error"
                                onClick={() => {
                                    dispatch(deleteUser({ id: user.id }));
                                }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                )})}
            </List>
            {/* <Box>
                <Box>
                    <Stack direction="row">


                        <Avatar src="/broken-image.jpg" />
                        <Stack spacing={0}>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a wsidespread group of squamate reptiles
                            </Typography>
                        </Stack>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Standard" variant="standard" />
                            <Button variant="contained">Update</Button>
                            <DeleteIcon />
                        </Box>
                    </Stack>
                </Box>

            </Box> */}
        </div>
    )
}

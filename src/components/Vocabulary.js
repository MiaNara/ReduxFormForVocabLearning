import React from 'react'
import VocabList from '../list/VocabList';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { deleteVocab, updateRemembered } from '../features/Vocabs';

export default function Vocabulary({handleEdit}) {
    const dispatch = useDispatch();
    const VocabList = useSelector((state) => state.vocabs.value);
    // const [remembered, setRemembered] = useState(false);
    return (
        <div >
            <List>
                {VocabList.map((vocab) => {
                    return (

                        <ListItem key={vocab.id}>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <ListItemText  primary={vocab.word} secondary={vocab.meaning} />
                                {/* <TextField placeholder='Type new username...'
                                onChange={(e) => setNewUsername(e.target.value)}
                                sx={{ width: '30vw' }} id="standard-basic" label="Standard" variant="standard" /> */}
                                {/* <Button onClick={() => { dispatch(updatRemembered({ id: user.id })); }}
                                    variant="contained">Remembered?</Button> */}
                                {/* <FormGroup>
                                     <FormControlLabel control={<Switch/>} label="Remembered?" name="remembered"  onChange={() => { dispatch(updateRemembered({ id: vocab.id })); }}/>
                                </FormGroup> */}
                                <Button onClick={(e) => handleEdit(vocab)}>Edit</Button>
                                <Checkbox label="Remembered?" color="success" name="remembered" checked={vocab.rememberd} onChange={(e) => { dispatch(updateRemembered({id: vocab.id, rembered: e.target.value}))}}   />
                                <IconButton sx={{ margin: '0', bgcolor: 'background.paper' }} aria-label="delete" color="error"
                                    onClick={() => {
                                        dispatch(deleteVocab({ id: vocab.id }));
                                    }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )

}

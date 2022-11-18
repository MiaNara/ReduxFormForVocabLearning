import React from 'react'
// import VocabList from '../list/VocabList';
import Card from '@mui/material/Card';
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
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { deleteVocab, updateRemembered } from '../features/Vocabs';
import { useEffect } from 'react'
export default function Vocabulary({ handleEdit, submitDelete, VocabList}) {
    const dispatch = useDispatch();
   
    const [remembered, setRemembered] = useState(false);
//     constructor() {
//     super();
//       this.state = {
//       isFlipped: false
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick(e) {
//     e.preventDefault();
//     this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
//   }
    return (
        <div >
{/* {VocabList.map((vocab) =>{
    <p>{vocab.word}</p>
})} */}
            <List className='list'>
                {VocabList.map((vocab) => (
                        <ListItem key={vocab.id} className='listitem'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <FormControlLabel control={<Checkbox label="Learned" color="success" name="remembered" type="checkbox" checked={vocab.remembered} onChange={(e) => { setRemembered(e.target.value); dispatch(updateRemembered({ id: vocab.id, remembered: remembered })) }} />
                                } />
                                <Box>
                                    <Typography sx={{ color: '#31A791', fontFamily: '"Merriweather", serif', fontSize: '18px', fontWeight: '300', lineHeight: '25px', textShadow: '#2a8d7b -0.5px -0.5px' }} >{vocab.word}</Typography>
                                    <Typography variant="subtitle2">{vocab.level === 3 || vocab.level === 1 ? (
                                        vocab.level === 1 ? (
                                            'Easy'
                                        ) : (
                                            'Hard'
                                        )
                                    ) : 'Medium'}</Typography>
                                    <Typography sx={{ fontSize: '14px' }} variant="subtitle2">{vocab.meaning} </Typography>
                                    <Typography variant="body2" gutterBottom> {vocab.exampleSentence}</Typography>
                                </Box>

                                <Button onClick={(e) => handleEdit(vocab, { id: vocab.id })}>Edit</Button>

                                <Button sx={{ margin: '0', bgcolor: 'background.paper' }} aria-label="delete" color="error"
                                    onClick={(e) => {
                                        submitDelete({ id: vocab.id });
                                        // submitDelete({ id: vocab.id })
                                        // dispatch(deleteVocab({ id: vocab.id }));
                                    }}>
                                    <DeleteIcon />
                                </Button>
                            </Box>
                        </ListItem>
                    )
                )}
            </List>

        </div>
    )

}

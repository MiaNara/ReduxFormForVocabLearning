import React from 'react'
import VocabList from '../list/VocabList';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import { deleteVocab, updateRemembered } from '../features/Vocabs';
import { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

export default function VocabPublic() {
    // const dispatch = useDispatch();
    const [VocabList, setVocabList] = useState([]);
    // const VocabList = useSelector((state) => state.vocabs.value);
    // const baseURL=`https://6365d463046eddf1baf35e2d.mockapi.io/api/vocab?`;
    useEffect(() => {
        fetch(`https://6365d463046eddf1baf35e2d.mockapi.io/vocab`)
            .then(response => {
                console.log(response.data)
                if (!response.ok) {
                    throw new Error(`HTTP Status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => { setVocabList(data) })
            .catch(error => console.log(error.message));
    }, []);
    // constructor()  {
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
            <Container>
                <img width="100%" src="https://marketplace.canva.com/EAEv-c5kf5g/1/0/1600w/canva-purple-playful-english-club-classroom-banner-0lRpZw1kwjs.jpg"></img>
                {/* <List className='list'> */}
                {/* <Grid container> */}
                <Carousel>
                    {VocabList.map((vocab) => (
                        <Grid item sx={6} >
                            {/* <Box
                              
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                    // width: '100%',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                }}

                            > */}
                                <Card sx={{ p: 3, width: '30vw', height: '160px' }} >
                                    <Box>
                                        <Typography sx={{ color: '#31A791', fontFamily: '"Merriweather", serif', fontSize: '20px', padding: '5px', fontWeight: '300', lineHeight: '25px', textShadow: '#2a8d7b -0.5px -0.5px' }} >{vocab.id}.&nbsp;{vocab.word}</Typography>
                                        <Typography variant="subtitle1">{vocab.level === 3 || vocab.level === 1 ? (
                                            vocab.level === 1 ? (
                                                'Easy'
                                            ) : (
                                                'Hard'
                                            )
                                        ) : 'Medium'}</Typography>
                                        <Typography sx={{ fontSize: '15px' }} variant="subtitle2">{vocab.meaning} </Typography>
                                        <Typography variant="body1" gutterBottom> {vocab.exampleSentence}</Typography>
                                    </Box>
                                </Card>
                            {/* </Box> */}


                        </Grid>))}
                </Carousel>
                {/* {VocabList.map((vocab) => (
                          <Grid item sx={6} >
                      
                          
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                    // width: '100%',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Card sx={{p: 3, width: '30vw', height:'160px'}} >
                                <Box>
                                    <Typography sx={{ color: '#31A791', fontFamily: '"Merriweather", serif', fontSize: '20px', padding: '5px', fontWeight: '300', lineHeight: '25px', textShadow: '#2a8d7b -0.5px -0.5px' }} >{vocab.id}.&nbsp;{vocab.word}</Typography>
                                    <Typography variant="subtitle1">{vocab.level === 3 || vocab.level === 1 ? (
                                        vocab.level === 1 ? (
                                            'Easy'
                                        ) : (
                                            'Hard'
                                        )
                                    ) : 'Medium'}</Typography>
                                    <Typography sx={{ fontSize: '15px' }} variant="subtitle2">{vocab.meaning} </Typography>
                                    <Typography variant="body1" gutterBottom> {vocab.exampleSentence}</Typography>
                                </Box>
                                </Card>
                            </Box>
                           
                     
                        </Grid>
                    )
                )} */}

                {/* </List> */}
            </Container>
        </div>
    )

}
// function Item(props)
// {
//     return (
//         <Paper>
//             <h2>{props.word}</h2>
//             {/* <p>{props.item.description}</p>

//             <Button className="CheckButton">
//                 Check it out!
//             </Button> */}
//         </Paper>
//     )
// }
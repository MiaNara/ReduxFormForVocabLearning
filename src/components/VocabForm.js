import React from 'react'
import Vocabulary from './Vocabulary'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { addVocab, updateVocab } from '../features/Vocabs';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField, Checkbox } from 'formik-mui';
import { useFormik, useField } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';


export default function VocabForm() {
    
    const dispatch = useDispatch();
    
    const [VocabList, setVocabList] = useState([]);

    useEffect(() => fetchData(),[]);

    const fetchData= () =>{
        fetch(`https://6365d463046eddf1baf35e2d.mockapi.io/vocab`)
    .then(response =>{
       
    if(!response.ok){
    throw new Error(`HTTP Status: ${response.status}`)
    }
    return response.json()
    })
    .then(data => {setVocabList(data)})
    .catch(error => console.log(error.message));
    };
    const url = `https://6365d463046eddf1baf35e2d.mockapi.io/vocab`;
    const submitDelete = (id)=>{
        // console.log(id.id);
        // const url = `https://6365d463046eddf1baf35e2d.mockapi.io/vocab`;
        fetch(url +"/"+ id.id, { method: 'DELETE'}).then(response =>{
            if(!response.ok){
            throw new Error(`HTTP Status: ${response.status}`)
            }
            return response.json()
            })
            .then(data => fetchData())
            .catch(error => console.log(error.message));
    }
    
    const submitAdd = (values) =>{
        fetch(url, { method: 'POST',
            body: JSON.stringify(values), headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
            }).then(response =>{
            if(!response.ok){
            throw new Error(`HTTP Status: ${response.status}`)
            }
            return response.json()
            })
            .then(data => fetchData())
            .catch(error => console.log(error.message));
    }
    const submitEdit = (values, id) =>{
        console.log(id);
        // const url = `https://6365d463046eddf1baf35e2d.mockapi.io/vocab`;
        fetch(url +"/"+ id, { method: 'PUT',
            body: JSON.stringify(values), headers: {
                'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
                }).then(response =>{
            if(!response.ok){
            throw new Error(`HTTP Status: ${response.status}`)
            }
            return response.json()
            })
            .then(data => fetchData())
            .catch(error => console.log(error.message));
    }
   
    
    const [isEdit, setIsEdit] = useState(false);
    const emptyData = {
        id: VocabList.length,
        word: "",
        meaning: "",
        exampleSentence: "",
        level: 0,
        remembered: false
    }
    const [data, setData] = useState(emptyData);
   
    const VocabSchema = Yup.object().shape({
        word: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Do not input number')
            .min(0, 'Must be more 1 character!')
            .max(100, 'Too Long!')
            .required('Please input the word!'),
        meaning: Yup.string()
            .min(2, 'Too Short!')
            .max(500, 'Too Long!')
            .required('Please me the give the meaning!!'),
        exampleSentence: Yup.string()
            .min(10, 'Too Short!')
            .max(500, 'Too Long!')
            .required('Give an example sentence pleaseee!'),
        level: Yup.number().integer().oneOf([1,2,3], "You must choose the level of word"),
        remembered: Yup.boolean().oneOf([true,false], "The terms and conditions must be accepted.")
    });

    const handleEdit = (data) => {
        setIsEdit(true);
        setData(data);
    }
    const CustomSelect = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <Box>
                <Select   sx={{ width: '25vw', my:1 }}
                    {...field}
                    {...props}
                >
                </Select>
            </Box>
        )
    }

    const FieldStyle = styled(Field)(() => ({
     margin: '5px 0',
     width: '25vw',
    }));
    return (
        <div >
            <Container >
                <Grid container justify = "center" sx={{display: 'flex', justifyContent: 'center'}}>
                    <Grid md={4} xs={6} centered >
                        <Card >
                            <Typography variant='h2' sx={{color: '#ff6b6b', fontFamily: '"Great Vibes", cursive', fontSize: '45px', lineHeight: '60px', fontWeight: 'normal', marginBottom: '0px', marginTop: '40px', textAlign: 'center', textShadow:'0 1px 1px #fff' }}>Doulingo Study</Typography>
                            <Formik validateOnChange={true}
                                validateOnBlur={true}
                                enableReinitialize={true}
                                initialValues={data}
                                validationSchema={VocabSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    if (isEdit) {
                                        submitEdit(values, data.id);
                                        dispatch(updateVocab(values));
                                    } else {
                                        submitAdd(values);
                                    }
                                    setSubmitting(false);
                                    setIsEdit(false);
                                    setData(emptyData);
                                }}
                               
                            >
                                {({ errors, touched, handleChange, values, dirty, isValid }) => (
                                    <Form  >
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', py: 1 }}>
                                            <FieldStyle id="word" label="Word" color="success" variant="outlined" name="word" component={TextField} />
                                            <FieldStyle id="outlined-basic" color="success" label="Meaning" variant="outlined" multiline={true} rows={2} name="meaning" component={TextField} />
                                            <FieldStyle id="outlined-basic" color="success" label="Example Sentence" multiline={true} rows={2} variant="outlined" component={TextField}
                                                name="exampleSentence"
                                                value={values.exampleSentence}
                                            />
                  
                                                <CustomSelect
                                                    id="level"
                                                    label="Level"
                                                    name="level"
                                                    placeholder="Level"
                                                    value={values.level}
                                                    onchange={handleChange}
                                                >
                                                    <MenuItem disabled value={0}>What is it level?</MenuItem>
                                                    <MenuItem value={1}>Easy</MenuItem>
                                                    <MenuItem value={2}>Medium</MenuItem>
                                                    <MenuItem value={3}>Hard</MenuItem>
                                                </CustomSelect>
                                            {errors.level && touched.level && (<Typography variant="caption" sx={{marginLeft: '-100px', float: 'left'}} color="red">{errors.level}</Typography>)}

                                            <Box>
                                            <FormControlLabel  sx={{ display: 'block' ,float: 'left', width: '25vw', my:2}} control={<Field component={Checkbox} type="checkbox" name="remembered" color="success" />} label="Learned" />
                                            </Box>
                                        </Box>
                                        <Button sx={{ display: 'flex', float: 'right', margin: '-10px 20px 20px 0'}} variant="contained" type="submit" disabled={!isValid } >{isEdit ? "Edit" : "Add word"}</Button>
                                    </Form>
                                )}
                            </Formik>
                        </Card>
                    </Grid>
                    <Grid md={7} xs={12} >
                        <Vocabulary VocabList={VocabList} handleEdit={handleEdit} submitDelete={submitDelete} />
                    </Grid>
                </Grid>
            </Container>

        </div>
    )
}

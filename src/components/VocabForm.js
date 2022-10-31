import React from 'react'
import Vocabulary from './Vocabulary'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { addVocab, updateVocab } from '../features/Vocabs';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { TextField, Select, Button } from 'formik-mui';

export default function VocabForm() {
    const dispatch = useDispatch();
    // const [name, setName] = useState('');
    // const [username, setUsername] = useState('');
    const vocabList = useSelector((state) => state.vocabs.value)
    console.log(vocabList.length);
    const [isEdit, setIsEdit] = useState(false);
    const emptyData = {
        id: vocabList.length,
        word: "",
        meaning: "",
        exampleSentence: "",
        level: 0,
        remembered: false
    }
    const [data, setData] = useState(emptyData);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: data,
        onSubmit: (values) => {
            if (isEdit) {
                dispatch(updateVocab(formik.values))
            } else dispatch(addVocab(formik.values))
            setIsEdit(false);
            setData(emptyData);
        },
        validationSchema: Yup.object({
            word: Yup.string().required("Required.").min(1, "Must be 1 characters or more"),
            meaning: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            exampleSentence: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
            level: Yup.number().integer().typeError("Please select a level."),
            remembered: Yup.boolean().oneOf([true, false], "The terms and conditions must be accepted.")
        }),

    });
    const VocabSchema = Yup.object().shape({
        word: Yup.string()
            .min(0, 'Must be more 1 character!')
            .max(100, 'Too Long!')
            .required('Please input the word!'),
        meaning: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Please me the give the meaning!!'),
        exampleSentence: Yup.string()
            .min(10, 'Too Short!')
            .max(200, 'Too Long!')
            .required('Give an example sentence pleaseeee!'),
        level: Yup.number().integer().typeError("Please select a level for a word"),
        remembered: Yup.boolean().oneOf([true, false], "The terms and conditions must be accepted.")
    });

    const handleEdit = (data) => {
        console.log(data);
        setIsEdit(true);
        setData(data);
    }

    return (
        <div>
            <Container>
                <Grid container>
                    <Grid md={4} xs={12}>
                        <Card>
                            {/* <Formik
                                initialValues={data}
                                validationSchema={VocabSchema}
                                onSubmit={(values) => {
                                    if (isEdit) {
                                        dispatch(updateVocab(formik.values))
                                    } else dispatch(addVocab(formik.values))
                                    setIsEdit(false);
                                    setData(emptyData);
                                }}
                            >
                                {({ isSubmitting, errors, touched }) => (
                                    <Form>
                                        <Field name="word"  component={TextField} />
                                        {errors.word && touched.word ? (
                                            <div>{errors.word}</div>
                                        ) : null}
                                        <Field name="meaning"   component={TextField} />
                                        {errors.meaning && touched.meaning ? (
                                            <div>{errors.meaning}</div>
                                        ) : null}
                                        <Field name="exampleSentence"   component={TextField} />
                                        {errors.exampleSentence && touched.exampleSentence? (
                                            <div>{errors.exampleSentence}</div>
                                        ) : null}
                                        <label htmlFor="level">Level of word</label>
                                        <Field 
                                            component={Select}
                                            id="level"
                                            name="level"
                                            multiple={true}
                                        >
                                            <option value={0}>Easy</option>
                                            <option value={1}>Medium</option>
                                            <option value={2}>Hard</option>
                                        </Field>
                                        {errors.level && touched.level? (
                                            <div>{errors.level}</div>
                                        ) : null}
                                        <label>
                                            <Field type="checkbox" name="remembered" label="remembered" /> 
                                        </label>
                                        <button type="submit" disabled={isSubmitting}>
                                        {isEdit ? "Edit" : "Add word"}
                                        </button>
                                        <Button variant="contained" type="submit" ></Button>
                                    </Form>
                                )}
                            </Formik> */}
                            <form onSubmit={formik.handleSubmit}>
                                <Stack spacing={2} sx={12}>
                                    <TextField id="outlined-basic" label="Word" variant="outlined" name="word"
                                        value={formik.values.word}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.word && (<Typography variant="caption" color="red">{formik.errors.word}</Typography>)}
                                    <TextField id="outlined-basic" label="Meaning" variant="outlined" name="meaning"
                                        value={formik.values.meaning}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.meaning && (<Typography variant="caption" color="red">{formik.errors.meaning}</Typography>)}
                                    <TextField id="outlined-basic" label="Example Sentence" rows={3} variant="outlined"
                                        name="exampleSentence"
                                        value={formik.values.exampleSentence}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.exampleSentence && (<Typography variant="caption" color="red">{formik.errors.exampleSentence}</Typography>)}
                                    <FormControl sx={{ m: 1, minWidth: 600 }}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Level</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            label="Level of word"
                                            name="level"
                                            value={formik.values.level}
                                            onChange={formik.handleChange}
                                        >

                                            <MenuItem value={0}>Easy</MenuItem>
                                            <MenuItem value={1}>Medium</MenuItem>
                                            <MenuItem value={2}>Hard</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {formik.errors.level && (<Typography variant="caption" color="red">{formik.errors.level}</Typography>)}
                                  
                                    <FormControlLabel control={<Checkbox value={formik.values.remembered} onClick={formik.handleChange} name="remembered" color="success" />} label="Remembered?" />
                                    {formik.errors.remembered && (<Typography variant="caption" color="red">{formik.errors.remembered}</Typography>)}
                                    <Button variant="contained" type="submit" >{isEdit ? "Edit" : "Add word"}</Button>

                                </Stack>
                            </form>

                        </Card>
                    </Grid>
                    <Grid md={7} xs={12} >
                        <Vocabulary handleEdit={handleEdit} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

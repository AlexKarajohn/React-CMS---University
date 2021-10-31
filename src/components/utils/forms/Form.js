import { Button, Paper } from '@mui/material';
import { Card } from '@mui/material';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import {v4 as uuid} from 'uuid';
import styled from 'styled-components'
import { useState } from 'react';

const FormPaper = styled(Paper)`

    padding:2rem;
    @media screen and (max-width: 600px) {
        width:100vw;
    }
    @media screen and (max-width: 450px) {
        width:100%;
    }
`;


const Form = (props) => {
    const [variables,setVariables] = useState(props.fields.map(field=>{ return {label:field.label,value:''} }))
    const submitHandler = (e) =>{
        props.submitHandler(variables)
    }
    return (
        <FormPaper elevation={12}>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
            >
                {props.submitText}
                {props.fields.map((field)=>{
                        return (
                            <TextField 
                                key={uuid()} 
                                label={field.label} 
                                variant="outlined" 
                                type={field.label !== 'Password' && field.label !== 'ConfirmPassword'  ? 'text' : 'password'}
                                style={{marginTop:12}}
                                onChange={(e)=>{
                                    setVariables(prev=>{
                                        prev.find(textField => textField.label === field.label).value = e.target.value;
                                        return prev;
                                    })
                                }}
                                />
                        )
                    })
                }
                <Button variant="contained" style={{marginTop:20,width:'100%',height:'50px'}} onClick={submitHandler}>{props.submitText}</Button>
                {props.errors}
            </Grid>
        </FormPaper>
    )
}
export default Form;
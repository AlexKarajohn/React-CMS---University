import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';


import SendIcon from '@mui/icons-material/Send';
import {v4 as uuid } from 'uuid'
import Button from '@mui/material/Button';
import {useState,useEffect} from 'react';
import validator from 'validator'
const FacilityAdd = (props) => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');


    const [hasErrors,setHasErrors] = useState(false);
    const [nameError,setNameError] = useState(' ');
    const [descriptionError,setDescriptionError] = useState(' ');

    useEffect(()=>{
        if(nameError.trim() || descriptionError.trim())
            setHasErrors(true);
        else
            setHasErrors(false);
    },[nameError,descriptionError])

    const nameValidation = (e) =>{
        if(!e){
            e = name
        }
        if(!validator.isLength(e,{min:3,max:20})){
            setNameError('Min:3, Max:20')
            return false
        }
        setNameError(' ')
        return true
    }
    const descriptionValidation = (e) =>{
        if(!e){
            e = description
        }
        if(!validator.isLength(e,{min:3,max:20})){
            setDescriptionError('Min:3, Max:20')
            return false
        }
        setDescriptionError(' ')
        return true
    }
   
    //Change Handlers
    const nameChangeHandler = (e) => {
        setName(e.target.value.trim())
        nameValidation(e.target.value.trim());
    }
    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value.trim())
        descriptionValidation(e.target.value.trim())
    }
   
    //Submit Handler
    const validateHandler = () =>{
        if(!nameValidation() || !descriptionValidation() )
            return
    }
    const submitHandler = () => {
        if(!nameValidation() || !descriptionValidation() )
            return
        console.log('dispatch')
        props.submitted();
    }
    return (
        <Card>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                rowSpacing={2}
                sx={{width:'100%'}}
            >
                <Grid item sx={{width:'100%'}}>
                    <TextField 
                        value={name} 
                        error={nameError.trim().length >0}
                        onChange={nameChangeHandler}
                        helperText={nameError}
                        label="Name"
                        fullWidth
                    />
                </Grid>
                <Grid item sx={{width:'100%'}}>
                    <TextField 
                        value={description} 
                        error={descriptionError.trim().length >0}
                        helperText={descriptionError}
                        onChange={descriptionChangeHandler}
                        label="Description"
                        fullWidth
                    />
                </Grid>
                <Grid item >
                    <Button variant='contained' onMouseEnter={validateHandler}  onClick={submitHandler} disabled={hasErrors}>
                        <SendIcon></SendIcon>
                        SUBMIT
                    </Button>
                </Grid>
                
            </Grid>
        </Card>
    )

} 
export default FacilityAdd;
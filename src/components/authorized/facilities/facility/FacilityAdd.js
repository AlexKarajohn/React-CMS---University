import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import {useState,useEffect} from 'react';
import validator from 'validator'
import { useDispatch,useSelector } from 'react-redux';
import { addFacility, userActions } from '../../../../store/user-slice';
import { useSnackbar } from 'notistack';
const FacilityAdd = ({submitted}) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const addFacilityOperation = useSelector(state=>state.user.operations.addFacility)

    const [hasErrors,setHasErrors] = useState(false);
    const [nameError,setNameError] = useState(' ');
    const [descriptionError,setDescriptionError] = useState(' ');

    useEffect(()=>{
        if(nameError.trim() || descriptionError.trim())
            setHasErrors(true);
        else
            setHasErrors(false);
    },[nameError,descriptionError])
    useEffect(()=>{
        if(addFacilityOperation.status==='Success')
        {
            dispatch(userActions.setOperations({function:'addFacility'}))
            enqueueSnackbar('Facility Was Added!',{
                variant: 'success',
            })
            submitted();
        }
        if(addFacilityOperation.status==='Failed')
        {
            dispatch(userActions.setOperations({function:'addFacility'}))
            enqueueSnackbar('Oops! Something went wrong!',{
                variant: 'error',
            })
        }
    },[addFacilityOperation,dispatch,submitted,enqueueSnackbar])
    const nameValidation = (e) =>{
        if(!e){
            e = name
        }
        if(!validator.isLength(e.trim(),{min:3,max:20})){
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
        if(!validator.isLength(e.trim(),{min:3,max:20})){
            setDescriptionError('Min:3, Max:20')
            return false
        }
        setDescriptionError(' ')
        return true
    }
   
    //Change Handlers
    const nameChangeHandler = (e) => {
        setName(e.target.value)
        nameValidation(e.target.value);
    }
    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value)
        descriptionValidation(e.target.value)
    }
   
    //Submit Handler
    const validateHandler = () =>{
        if(!nameValidation() || !descriptionValidation() )
            return
    }
    const submitHandler = () => {
        if(!nameValidation() || !descriptionValidation() )
            return
        dispatch(addFacility(name.trim(),description.trim()))
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
                    <Button variant='contained' onMouseEnter={validateHandler}  onClick={submitHandler} disabled={hasErrors || addFacilityOperation.status === 'Pending'}>
                        <SendIcon></SendIcon>
                        SUBMIT
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )

} 
export default FacilityAdd;
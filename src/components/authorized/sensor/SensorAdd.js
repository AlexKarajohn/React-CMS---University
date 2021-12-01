import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch ,useSelector} from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import {v4 as uuid } from 'uuid'
import Button from '@mui/material/Button';
import {useState,useEffect} from 'react';
import { userActions } from '../../../store/user-slice';
import validator from 'validator'
import { addSensor } from '../../../store/user-slice';
import { useSnackbar } from 'notistack';
const SensorAdd = ({facilityId,submitted}) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const addSensorOperation = useSelector(state=>state.user.operations.addSensor)
    const allowedGPIOPins = [3,5,7,8,10,11,12,13,15,16,18,19,21,22,23,24]
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [sensorType,setSensorType] = useState('');
    const [gpio,setGpio] = useState('');

    const [hasErrors,setHasErrors] = useState(false);
    const [nameError,setNameError] = useState(' ');
    const [descriptionError,setDescriptionError] = useState(' ');
    const [sensorTypeError,setSensorTypeError] = useState(' ');
    const [gpioError,setGpioError] = useState(' ');
    useEffect(()=>{
        if(nameError.trim() || descriptionError.trim() || sensorTypeError.trim() || gpioError.trim())
            setHasErrors(true);
        else
            setHasErrors(false);
    },[nameError,descriptionError,sensorTypeError,gpioError])
    useEffect(()=>{
        if(addSensorOperation.status==='Success'){
            dispatch(userActions.setOperations({function:'addSensor'}));
            enqueueSnackbar('Sensor Was Added!',{
                variant: 'success',
            })
            submitted();
        }
        if(addSensorOperation.status==='Failed'){
            dispatch(userActions.setOperations({function:'addSensor'}));
            enqueueSnackbar('Oops! Something went wrong!',{
                variant: 'error',
            })
        }
    },[addSensorOperation,dispatch,enqueueSnackbar,submitted])
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
    const sensorTypeValidation = (e) =>{
        if(!e){
            e = sensorType
        }
        if(!validator.isLength(e,{min:2,max:2})){
            setSensorTypeError('Please Select the sensor Type')
            return false
        }
        setSensorTypeError(' ')
        return true
    }
    const gpioValidation = (e) =>{
        if(!e){
            e = gpio
        }
        if(!allowedGPIOPins.find(pin=>pin===e)){
            setGpioError('Please Select the GPIO pin')
            return false
        }
        setGpioError(' ')
        return true
    }
    //Change Handlers
    const nameChangeHandler = (e) => {
        setName(e.target.value)
        nameValidation(e.target.value.trim());
    }
    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value)
        descriptionValidation(e.target.value.trim())
    }
    const sensorTypeChangeHandler = (e) => {
        setSensorType(e.target.value)
        sensorTypeValidation(e.target.value.trim())
    }
    const gpioChangeHandler = (e) => {
        setGpio(e.target.value)
        gpioValidation(e.target.value)
    }
    //Submit Handler
    const validateHandler = () =>{
        if(!nameValidation() || !descriptionValidation() || !sensorTypeValidation() || !gpioValidation())
            return
    }
    const submitHandler = () => {
        if(!nameValidation() || !descriptionValidation() || !sensorTypeValidation() || !gpioValidation())
            return
        dispatch(addSensor(facilityId,name,description,sensorType,gpio))
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
                <Grid item sx={{width:'100%'}}>
                    <TextField 
                        select
                        value={sensorType} 
                        error={sensorTypeError.trim().length >0}
                        helperText={sensorTypeError}
                        onChange={sensorTypeChangeHandler}
                        label="Sensor Type"
                        fullWidth
                    >
                        <MenuItem value={'NC'}>
                                    NC
                        </MenuItem>
                        <MenuItem value={'NO'}>
                            NO
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item sx={{width:'100%'}}>
                    <TextField
                        select
                        value={gpio}
                        label={`GPIO PIN`}
                        onChange={gpioChangeHandler}
                        error={gpioError.trim().length > 0}
                        helperText={gpioError}
                        SelectProps={{
                            MenuProps:{
                                sx:{maxHeight:'250px'}
                            }
                        }}
                    >
                        {
                            allowedGPIOPins.map(GPIO=>{
                                return <MenuItem key={uuid()} value={GPIO}>
                                    {GPIO}
                                </MenuItem>
                            })
                        }
                    </TextField>
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
export default SensorAdd;
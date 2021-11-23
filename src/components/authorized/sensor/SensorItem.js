
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import {v4 as uuid } from 'uuid';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AlertItem from '../alerts/AlertItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';

import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import Badge from '@mui/material/Badge';
import validator from 'validator';
import { layoutActions } from '../../../store/layout-slice';



import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SensorItem = (props) => {
    const [expanded, setExpanded] = useState(false);

    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [nameError,setNameError] = useState('');
    const [descriptionError,setDescriptionError] = useState('');
    const [sensorType,setSensorType] = useState('');
    const [gpio,setGpio] = useState('');
    const [enable,setEnable] = useState('');
    const dispatch = useDispatch()
    const allowedGPIOPins = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
    const [editState,setEditState] = useState(false);
    const deleteSensorOnClickHandler = ( ) =>{
        dispatch(layoutActions.createDialog({
            submit: layoutActions.testingDispatch('yay'),
            message: `Are you sure you want to delete ${props.sensor.name}`
        }))
        console.log(`dispatch delete with id ${props.sensor._id}`)
    }

    const resetData = () =>{
        setNameError('')
        setDescriptionError('')
        setName(props.sensor.name)
        setDescription(props.sensor.description)
        setGpio(props.sensor.pin);
        setEnable(props.sensor.enabled);
        setSensorType(props.sensor.triggerType);
        setEditState(true);
    }
    const cancelOnClickHandler = () => {
        resetData();
        setEditState(false);
    }
    const sensorTypeOnChangeHandler = (e) => {
        setSensorType(e.target.value);
    }
    const enabledOnChangeHandler = (e) => {
        setEnable(e.target.value);
    }
    const pinOnChangeHandler = (e) => {
        setGpio(e.target.value);
    }
    const descriptionOnChangeHandler = (e) => {
        setDescription(e.target.value);
    }
    const nameOnChangeHandler = (e) => {
       setName(e.target.value);
    }
    const editSensorOnClickHandler= () =>{
        if(!editState){
            resetData();
            return;
        }
        let errors = false;
        if(!validator.isLength(name.trim(),{min:3,max:20})){
            setNameError('Min:3, Max:20')
            errors = true;
        }
        if(!validator.isLength(description.trim(),{min:3,max:20})){
            setDescriptionError('Min:3, Max:20')
            errors = true;
        }
        if(errors)
            return;
        console.log('dispatch update');
        setEditState(false);
    }
    const handleExpandClick = () =>{
        setExpanded(prev=>!prev);
    }
    const badgeContent =  editState ?
    <Button onClick={cancelOnClickHandler} aria-label="cancel" variant='contained' size="small" sx={{marginLeft:11,marginTop:5,fontSize:12,height:40}}  color='error'>
        <ClearIcon fontSize="small" /> CANCEL
    </Button> : ''
    return(
        <Badge badgeContent={badgeContent} sx={{width:'100%',}} anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
            
          }} invisible={!editState}>
        <Card sx={{width:'100%'}}>
             <Grid container
                direction="column"
                justifyContent='center'
                alignItems="center"
                rowSpacing={2}
            >   
                    <Button
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                    </Button>
                    <Typography>
                    {expanded ? '' : props.sensor.name}
                    </Typography>

            </Grid>
            <Collapse in={expanded} timeout="auto" unmountOnExit sx={{width:'100%'}}>
            <Grid container
                direction="row"
                justifyContent='center'
                alignItems="stretch"
                rowSpacing={2}
            >                
                <Grid 
                    item
                    container
                    direction="row"
                    justifyContent='center'
                    alignItems="center"
                    rowSpacing={2}
                    xs={12}
                    lg={6}
                    
                    
                >
                   <Grid item 
                        sx={{width:'100%'}}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}>
                                <Typography >
                                Name : 
                                </Typography>
                                
                                {editState ? 
                                <TextField
                                    disabled={!editState}
                                    value={name}
                                    onChange={nameOnChangeHandler}
                                    size='small'
                                    error={nameError.trim().length >0}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    helperText={nameError}
                                    sx={{height:'30px'}}
                                />
                                : 
                                <Typography sx={{height:'30px',width:'100%'}} align='center'>
                                    {props.sensor.name}
                                </Typography>
                            }
                        
                    </Grid>
                    <Grid item 
                        sx={{width:'100%'}}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}
                    >
                        <Typography >Description : </Typography>
                        {editState ? 
                                <TextField
                                sx={{width:'100%',height:'40px'}} 
                                disabled={!editState}
                                value={description}
                                onChange={descriptionOnChangeHandler}
                                inputProps={{min: 0, style: { textAlign: 'center' }}}
                                size='small'
                                error={descriptionError.trim().length >0}
                                helperText={descriptionError}
                                />
                                : 
                                <Typography sx={{height:'40px',width:'100%'}} align='center' >
                                    {props.sensor.description}
                                </Typography>
                            }
                       
                       
                    </Grid>
                    <Grid item 
                        container 
                        direction='row' 
                        justifyContent='flex-start'
                        alignItems="center"
                        columnSpacing={1}
                   
                        >
                            <Grid item>
                                <Typography>Triggered :</Typography>
                            </Grid>
                            <Grid item>
                                {props.sensor.triggered ? <CheckCircleIcon/> : <ReportIcon/>}
                            </Grid>
                    </Grid>
                    <Grid item 
                    
                        container 
                        direction='row' 
                        justifyContent='flex-start'
                        alignItems="center"
                        columnSpacing={1}
                    >
                        <Grid item>
                            <Typography>
                                Sensor Type :
                            </Typography> 
                        </Grid>
                        <Grid item>
                            {editState ? 
                            <TextField
                            select
                            disabled={!editState}
                            value={sensorType}
                            onChange={sensorTypeOnChangeHandler}
                            size='small'
                            >
                                <MenuItem key={uuid()} value={'NC'}>
                                    NC
                                </MenuItem>
                                <MenuItem key={uuid()} value={'NO'}>
                                    NO
                                </MenuItem>
                            </TextField>
                            :
                                <Typography sx={{height:'40px',width:'100%'}} align='left' >
                                    {props.sensor.triggerType}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid item 
                        columnSpacing={1}
                        container 
                        direction='row' 
                        justifyContent='flex-start'
                        alignItems="center"
                    
                    >
                        <Grid item>
                            <Typography>
                                GPIO Pin :
                            </Typography> 
                        </Grid>
                        <Grid item>
                            {editState ? 
                            <TextField
                                select
                                value={gpio}
                                onChange={pinOnChangeHandler}
                                disabled={!editState}
                                size='small'
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
                            :
                            <Typography sx={{height:'40px',width:'100%'}} align='left' >
                                {props.sensor.pin}
                             </Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid item 
                      
                        container 
                        direction='row' 
                        justifyContent='flex-start'
                        alignItems="center"
                   
                    >
                        <Grid item>
                            <Typography>
                                Enable :
                            </Typography> 
                        </Grid>
                        <Grid item>
                            {!editState ? 
                            <Switch 
                                checked={props.sensor.enabled}
                                value={props.sensor.enabled}
                                disabled={!editState}
                            />
                            :
                            <Switch 
                                checked={enable}
                                value={enable}
                                onChange={enabledOnChangeHandler}
                                disabled={!editState}
                            />
                            }
                        </Grid>
                    </Grid>
                    <Grid item 
                      
                        container 
                        direction='row' 
                        justifyContent='flex-start'
                        alignItems="center"
                   
                    >
                        <Grid item 
                            container 
                            direction='row' 
                            justifyContent='center'
                            alignItems="center"
                            columnSpacing={2}
                        >
                            <Grid item >
                                <Button sx={{width:'100%'}} variant='contained' onClick={deleteSensorOnClickHandler} color='error'> 
                                    <DeleteIcon/> DELETE
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button sx={{width:'100%',minWidth:'120px'}} variant='contained' onClick={editSensorOnClickHandler}>
                                        {!editState ? <><EditIcon/> EDIT </> : <> <SendIcon/>UPDATE</>}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid 
                    item
                    xs={12}
                    lg={6}
                  
                    container
                    direction="row"
                    justifyContent='flex-start'
                    alignItems="flex-start" 
                >
                    <Grid item sx={{width:'100%'}} component={Typography} align='center' >
                        Alerts
                    </Grid>
                    <Grid item sx={{width:'100%'}}  align='center' >
                        <List sx={{overflowX: 'hidden',maxHeight:'450px'}}>
                            {
                                    props.sensor.alerts.map(alert=>{
                                    return <ListItem key={uuid()} xs={{width:'100%'}}><AlertItem alert={alert}/></ListItem>
                                })
                            }
                        </List>
                    </Grid>
                </Grid>   
              
            </Grid>
            </Collapse>
        </Card>
        </Badge>
    )
} 

export default SensorItem;
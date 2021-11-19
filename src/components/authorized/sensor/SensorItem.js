
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
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { layoutActions } from '../../../store/layout-slice';

const SensorItem = (props) => {
    const dispatch = useDispatch()
    const allowedGPIOPins = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]

    const deleteSensorOnClickHandler = ( ) =>{
        console.log(`dispatch delete with id ${props.sensor._id}`)
        dispatch(layoutActions.setModal({
            open: true,
            message: `Are you sure you want to delete sensor : ${props.sensor.name}?`,
            submit: layoutActions.setModal({open:false})
        }))
    }
    const sensorTypeOnChangeHandler = (e) => {
        console.log('Sensor Type Change Handler')
        //this should eventually call a thunk or socket transfer to change value from the server
        //setSensorType(e.target.value)
    }
    const enabledOnChangeHandler = (e) => {
        //this should eventually call a thunk or socket transfer to change value from the server
        console.log('Enable Change Handler')
    }
    const pinOnChangeHandler = (e) => {
        //this should eventually call a thunk or socket transfer to change value from the server
        console.log('Enable Change Handler')
    }
    
    return(
        <Card>
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
                   
                    xs={12}
                    md={6}
                    
                    
                >
                   <Grid item 
                        container 
                        direction='row' 
                        justifyContent='flex-start'
                        alignItems="center"
                        >
                            <Grid item component={Typography}>
                                
                                    Name : {props.sensor.name} 
                                    <IconButton aria-label="delete" size="small" color="error" >
                                        <EditIcon/>
                                    </IconButton>
                            </Grid>
                    </Grid>
                    <Grid item 
                        container 
                        direction='row' 
                        justifyContent='flex-start'
                        alignItems="center"
              
                      
                    >
                        <Grid item>
                            <Typography>Location : {props.sensor.description}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item 
                        container 
                        direction='row' 
                        justifyContent='flex-start'
                        alignItems="center"
                      
                   
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
                
                    >
                        <Grid item>
                            <Typography>
                                Sensor Type :
                            </Typography> 
                        </Grid>
                        <Grid item>
                            <TextField
                            select
 
                            value={props.sensor.triggerType}
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
                                GPIO Pin :
                            </Typography> 
                        </Grid>
                        <Grid item>
                            <TextField
                                select
                                value={props.sensor.pin}
                                onChange={pinOnChangeHandler}
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
                            <Switch 
                                checked={props.sensor.enabled}
                                value={props.sensor.enabled}
                                onChange={enabledOnChangeHandler}
                            />
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
                            justifyContent='flex-start'
                            alignItems="center"

                        >
                            <Grid item >
                                <Button sx={{width:'100%'}} variant='contained' onClick={deleteSensorOnClickHandler}> 
                                    <DeleteIcon/> DELETE
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid 
                    item
                    xs={12}
                    md={6}
                  
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
        </Card>
    )
} 

export default SensorItem;
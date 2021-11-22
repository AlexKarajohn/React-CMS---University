import { useSelector } from "react-redux";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import DescriptionIcon from '@mui/icons-material/Description';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Stack from '@mui/material/Stack';
import SensorItem from "../../sensor/SensorItem";
import Switch from '@mui/material/Switch';
import {v4 as uuid } from 'uuid'
import Button from '@mui/material/Button';
const Facility = ({match,location}) => {

    const facility = useSelector(state=>state.user.user.facilities.items.find(facility=> facility._id === match.params.facilityId))
    const enabledOnChangeHandler = (e) => {
        //this should eventually call a thunk or socket transfer to change value from the server
        console.log('Enable Change Handler')
    }
    return (
        <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '75%',
            ],
            
        }}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{width:'100%'}}
                    rowSpacing={2}
                >  
                    <Grid item 
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card sx={{width:'100%'}}>
                        <Grid item   xs={12} variant='h4'align='center'>
                            <Stack  
                                direction="row"
                                justifyContent='center'
                                alignItems="center"
                                >
                                <HomeWorkIcon fontSize='large'/> 
                                {facility.name}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} variant='h6' align='center' >
                            <Stack  
                                direction="row"
                                justifyContent='center'
                                alignItems="center"
                            >
                                <DescriptionIcon fontSize='small'/> 
                                {facility.description}
                            </Stack> 
                        </Grid>
                        </Card>
                    </Grid>
                    <Grid item 
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card sx={{width:'100%'}}>
                            <Grid  
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item 
                                    xs={12}
                                    sm={4}
                                   
                                >
                                    <Stack direction="row"
                                        justifyContent={{xs: 'center',sm:'flex-start'}}
                                        alignItems="center"
                                    >
                                        Enable :                             
                                        <Switch 
                                            checked={facility.enabled}
                                            value={facility.enabled}
                                            onChange={enabledOnChangeHandler}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item 
                                    xs={12}
                                    sm={4}
                                   
                                >
                                    <Stack direction="row"
                                        justifyContent='center'
                                        alignItems="center"
                                    >
                                        Triggered : {facility.triggered ? <ReportIcon fontSize='large'/> : <CheckCircleIcon fontSize='large'/>}
                                    </Stack>
                                </Grid>
                                <Grid item 
                                    xs={12}
                                    sm={4}
                                   
   
                                    justifyContent={{xs: 'center',sm:'flex-end'}}
                                    alignItems="center"
                                >
                                    <Stack direction="row"
                                        justifyContent={{xs: 'center',sm:'flex-end'}}
                                        alignItems="center"
                                    >
                                        Status : {facility.status ? <PowerIcon fontSize='large' sx={{color:'green'}}/> : <PowerOffIcon fontSize='large' sx={{color:'red'}}/>}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item 
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card sx={{width:'100%',backgroundColor:'#EEE'}} >
                            <Grid  
                                container
                       
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                            >
                                <Grid item 
                                    xs={12}
                                    sm={12}
                                   
                                    variant='h5'
                                >
                                    <Stack direction="column"
                                        justifyContent='center'
                                        alignItems="center"
                                    >
                                      Sensors
                                      <Button variant='contained'>
                                          ADD
                                      </Button>
                                    </Stack>
                                </Grid>
                                {facility.sensors.map(sensor=>{
                                    return (
                                        <Grid item 
                                            xs={12}
                                            key={uuid()}
                                            
                                        >
                                            <Stack direction="row"
                                                justifyContent='center'
                                                alignItems="center"
                                            >
                                                <SensorItem sensor={sensor} />
                                            </Stack>
                                        </Grid>
                                    )
                                })}
                                
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
           
        </Paper>

    )
}

export default Facility;
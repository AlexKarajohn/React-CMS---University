
import { useSelector } from "react-redux";

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import Badge from '@mui/material/Badge';
import SecurityIcon from '@mui/icons-material/Security';
import routes from "../../../assets/routes/routes";
import { history } from "../../../store/store";
import { useEffect,useState } from "react";
const Dashboard = () => {

    
    const user = useSelector(state=>state.user.user)
    const [totalFacilities,setTotalFacilities] = useState(0)
    const [totalAlerts,setTotalAlerts] = useState(0)
    const [totalSensors,setTotalSensors] = useState(0)
    const facilitiesClickHandler = () => {
        history.push(routes.facilities.path)
    }
    const sensorsClickHandler = () => {
        history.push(routes.facilities.path)
    }
    const alertsClickHandler = () => {
        history.push(routes.facilities.path)
    }
    useEffect(()=>{
        let totalSensorsTemp = 0;
        let totalAlertsTemp =0;
        let totalFacilitiesTemp =0;
        if(user.facilities.items.length>0){
            user.facilities.items.forEach(facility=>{
                totalFacilitiesTemp++;
                if(facility.sensors.length > 0){
                    facility.sensors.forEach(sensor=>{
                        totalSensorsTemp++;
                        sensor.alerts.forEach(alert=>{
                            if(!alert.acknowledged)
                            totalAlertsTemp++;
                        })
                    })
                }
            })
            setTotalFacilities(totalFacilitiesTemp);
            setTotalSensors(totalSensorsTemp);
            setTotalAlerts(totalAlertsTemp);
        }
    },[user.facilities.items])
    if(!user){
        return <div>something went wrong!</div>
    }
    return ( 
        <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '75%',
            ]
        }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{height:'100%'}}
            >   
                <Grid item sm={12}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    component={Card}
                >
                        <Grid item sm={12} container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            component={Typography} 
                            variant='h4'
                        >
                            Welcome to your dashboard
                        </Grid> 
                </Grid>
                <Grid item xs={12}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    component={Card}
                    style={{marginTop:10,width:'100%'}}
                    
                >
                    <Grid item 
                        container 
                        xs={12} 
                        sm={4}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        component={Button}
                        variant="outlined"
                        sx={{margin:2}}
                        onClick={facilitiesClickHandler}
                    >
                        <Grid item style={{marginBottom:12}}>
                            <Typography>
                                Facilities
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Badge color="secondary" badgeContent={totalFacilities.toString()} max={9}>
                                <HomeWorkIcon />
                            </Badge>
                        </Grid>
                    </Grid>
                    <Grid item 
                        container 
                        xs={12} 
                        sm={4}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        component={Button}
                        variant="outlined"
                        sx={{margin:2}}
                        onClick={sensorsClickHandler}
                    >
                        <Grid item style={{marginBottom:12}}>
                            <Typography>
                                Sensors
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Badge color="secondary" badgeContent={totalSensors.toString()} max={9}>
                                <SecurityIcon />
                            </Badge>
                        </Grid>
                    </Grid>
                    <Grid item 
                        container 
                        xs={12} 
                        sm={4}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        component={Button}
                        variant="outlined"
                        sx={{margin:2}}
                        onClick={alertsClickHandler}
                    >
                        <Grid item style={{marginBottom:12}}>
                            <Typography>
                                Alerts
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Badge color="secondary" badgeContent={totalAlerts.toString()}>
                                <NotificationImportantIcon />
                            </Badge>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}
export default Dashboard;
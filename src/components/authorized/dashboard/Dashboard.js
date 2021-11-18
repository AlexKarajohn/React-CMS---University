
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

const Dashboard = () => {


    const user = useSelector(state=>state.user.user)
    if(!user.facilities || !user.sensors || !user.alerts){
        return <div>something went wrong!</div>
    }
    const facilitiesClickHandler = () => {
        history.push(routes.find(route=>route.title==='Facilities').path)
    }
    const sensorsClickHandler = () => {
        history.push(routes.find(route=>route.title==='Facilities').path)
    }
    const alertsClickHandler = () => {
        history.push(routes.find(route=>route.title==='Alerts').path)
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
                            <Badge color="secondary" badgeContent={user.facilities.items.length.toString()} max={9}>
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
                            <Badge color="secondary" badgeContent={user.sensors.length.toString()} max={9}>
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
                            <Badge color="secondary" badgeContent={user.alerts.length.toString()}>
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
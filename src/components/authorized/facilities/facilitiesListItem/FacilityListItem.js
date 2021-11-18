
import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Typography from '@mui/material/Typography';

//for alerts
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
//for online / offline
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
//badge
import Badge from '@mui/material/Badge';
// trigger
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { history } from '../../../../store/store';
import routes from '../../../../assets/routes/routes';
const FacilityListItem = (props) =>{
    const badgeContent = 
        <div 
            style={{color:props.facility.status ? 'green' : 'red',border:'2px solid black',borderRadius:'8px'}}
            >{props.facility.status ? <PowerIcon/> : <PowerOffIcon/> }
        </div>

    const historyPushHandler = () => {

        history.push(routes.facility.path.replace(':facilityId',props.facility._id))
    }
    return (
        <Badge badgeContent={badgeContent} sx={{width:'100%'}} anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
            <Card sx={{width:'100%'}} onClick={historyPushHandler}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="space-between"
                    sx={{height:'100%'}}
                >   
                    <Grid item container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{height:'100%'}}
                    columnSpacing={2}
                    md={4}
                    xs={4}
                    >   
                        <Grid item>
                            <HomeWorkIcon/>
                        </Grid>
                        <Grid item component={Typography}>
                            {props.facility.name}
                        </Grid>    
                    </Grid>
                    <Grid item container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{height:'100%'}}
                    columnSpacing={2}
                    md={4}
                    xs={4}
                    >   
                        <Grid item>
                            <Badge color="secondary" badgeContent={props.facility.alerts.length.toString()}>
                                <NotificationImportantIcon />
                            </Badge>
                        </Grid>    
                    </Grid>
                    <Grid item container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{height:'100%'}}
                    columnSpacing={2}
                    md={4}
                    xs={4}
                    >   
                        <Grid item>
                            Triggered : 
                        </Grid>    
                        <Grid item>
                           {props.facility.triggered ? <ReportIcon/> : <CheckCircleIcon/>}
                        </Grid>    
                    </Grid>
                </Grid>
            </Card>
        </Badge>
        
    )
}

export default FacilityListItem;
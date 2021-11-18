import { useSelector } from "react-redux";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { Typography } from "@mui/material";
import Badge from '@mui/material/Badge';
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import DescriptionIcon from '@mui/icons-material/Description';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const Facility = ({match,location}) => {
    const facility = useSelector(state=>state.user.user.facilities.items.find(facility=> facility._id === match.params.facilityId))
    const badgeContent = 
    <div 
        style={{color:facility.status ? 'green' : 'red',border:'2px solid black',borderRadius:'8px'}}
        >{facility.status ? <PowerIcon/> : <PowerOffIcon/> }
    </div>
    
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
                >  
                    <Grid item 
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{height:'100%',backgroundColor:'yellow'}}
                        component={Card}
                    >
                        <Grid item component={Typography}  xs={12} variant='h5'align='center'>
                            <HomeWorkIcon/> {facility.name}
                        </Grid>
                        <Grid item xs={12} component={Typography} align='center' >
                            <DescriptionIcon fontSize='small'/> {facility.description}
                        </Grid>
                    
                    </Grid>
                    <Grid item 
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{height:'100%',backgroundColor:'red'}}
                        component={Card}  
                    >
                        <Grid item container>
                            <Grid item xs={6} component={Typography} variant='h5' align='right'>
                                Triggered : 
                            </Grid>
                            <Grid item xs={6} sx={{height:'100%'}}>
                                {facility.triggered ? <ReportIcon fontSize='large'/> : <CheckCircleIcon fontSize='large'/>}
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={6} component={Typography} variant='h5' align='right'>
                                Triggered : 
                            </Grid>
                            <Grid item xs={6} sx={{height:'100%'}}>
                                {facility.triggered ? <ReportIcon fontSize='large'/> : <CheckCircleIcon fontSize='large'/>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
           
        </Paper>

    )
}

export default Facility;
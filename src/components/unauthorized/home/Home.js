import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ScreenLockPortraitIcon from '@mui/icons-material/ScreenLockPortrait';
const Home = () => {

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
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{height:'100%'}}
                    
                >   
                <Grid item xs={6} md={2}>
                    <ScreenLockPortraitIcon style={{fontSize:120}}/>  
                </Grid>
                <Grid item xs={6} md={4} >
                    <Typography variant='h4'>
                        Project Vanguard 
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{height:'100%'}}
                    
                    >
                    <Typography variant='h6'>
                        This project was made for TEI of Piraeus as an undergraduate dissertation by <a target="_blank" rel="noreferrer" href="https://github.com/AlexKarajohn" >Alexandros Karagiannis</a>.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <hr/>
                    <Typography variant="h7">
                        This part of the project acts as a control panel.
                        The user can remotely view and change the state of a facility. 
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}
export default Home;
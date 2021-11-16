import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SwipeMenu from './swipeMenu/swipeMenu';
import { useSelector,useDispatch } from 'react-redux';
import { history } from '../../../App';
import { authorizationActions } from '../../../store/authorization-slice';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const Menu = () =>{
    
    const dispatch = useDispatch();
    const loginStatus = useSelector(state=> state.authorization.authorizationStatus)
    const urlLocation = useSelector(state=> state.layout.location)
    const loggedInEmail = useSelector(state=> state.user.user.email)
    const hangeLoginStatusHandler = () => {
        if(loginStatus){
            localStorage.removeItem('token');
            dispatch(authorizationActions.setAuthorizationStatus(false))
            history.push('/')
        }else{
            history.push('/auth/login');
        }
    }
    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Button color="inherit" style={{width: 120,height:60}} onClick={hangeLoginStatusHandler} variant='outlined'>
                            {loginStatus ? 'Log Out' : 'Log In'} 
                        </Button>
                        <Grid container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            style={{paddingRight:40,width:'100%'}}
                            sx={{alignItems: 'flex-end'}}

                        >
                            <Typography variant='h5' align='right'>
                                {urlLocation}
                            </Typography>
                        </Grid>
                        <SwipeMenu/>
                    </Toolbar>
                    { loginStatus && <>
                     
                        <Grid container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            style={{width:'100%',paddingBottom:10}}
                            columnSpacing={2}
                        >
                            <Grid item>
                                <AccountCircleOutlinedIcon /> 
                            </Grid>
                            <Grid item component={Typography}>
                                {loggedInEmail}
                            </Grid> 
                        </Grid>
                        </>
                    }
                </AppBar>
                
            </Box>
  );
}

export default Menu;
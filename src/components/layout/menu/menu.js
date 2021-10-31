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



const Menu = () =>{
    
    const dispatch = useDispatch();
    const loginStatus = useSelector(state=> state.authorization.authorizationStatus)
    const urlLocation = useSelector(state=> state.layout.location)
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
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" style={{width: 100}} onClick={hangeLoginStatusHandler}>
                            {loginStatus ? 'Log Out' : 'Log In'} 
                        </Button>
                        <Grid container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            style={{paddingRight:40}}>
                                <Typography variant='h5'>
                                    {urlLocation}
                                </Typography>
                        </Grid>
                        <SwipeMenu/>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
  );
}

export default Menu;
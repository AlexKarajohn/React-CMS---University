import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SwipeMenu from './swipeMenu/swipeMenu';
import { useSelector,useDispatch } from 'react-redux';

import { authorizationActions } from '../../../store/authorization-slice';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import routes from '../../../assets/routes/routes';
import { useState,useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { history } from '../../../store/store';
import {matchPath} from 'react-router-dom'

const Menu = () => {
    const [title,setTitle] = useState()
    const currentPath = useSelector(state=>state.router.location.pathname)
    useEffect(()=>{
        setTitle(()=>{
            let matchedTitle = 404;
            Object.entries(routes).forEach((route,index)=>{
                let match = matchPath(window.location.pathname, {
                    ...route[1],
                    });
                if(match){
                    matchedTitle = route[1].title
                }
            })
            return matchedTitle;
        })
    },[currentPath])
    
    const dispatch = useDispatch();
    const authStatus = useSelector(state=> state.authorization.authorizationStatus)
    const loggedInEmail = useSelector(state=> state.user.user.email)

    const authStatusHandler = () => {
        if(authStatus){
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
                        <Button color="inherit" style={{width: 120,height:60}} onClick={authStatusHandler} variant='outlined'>
                            {authStatus ? 'Log Out' : 'Log In'} 
                        </Button>
                        <Grid container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            style={{paddingRight:40,width:'100%'}}
                            sx={{alignItems: 'flex-end'}}

                        >
                            <Typography variant='h5' align='right'>
                                {title}
                            </Typography>
                        </Grid>
                        <SwipeMenu/>
                    </Toolbar>
                    { authStatus && <>
                     
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

export default withRouter(Menu);

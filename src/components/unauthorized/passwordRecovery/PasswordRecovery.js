import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect,useState } from 'react';
import { useDispatch } from "react-redux";
import { layoutActions } from "../../../store/layout-slice";
import validator from 'validator'
import TextField from '@mui/material/TextField';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Button from '@mui/material/Button';

const PasswordRecovery = () =>{
    const dispatch = useDispatch();
    //Input Data
    const [email,setEmail] = useState('');
    //Error 
    const [hasError,setHasError] = useState(false);
    const [emailErrorText,setEmailErrorText] = useState(' ');
    useEffect(()=>{
        dispatch(layoutActions.setLocation('Password Recovery'))
    },[dispatch])
    useEffect(()=>{
        if(emailErrorText.trim())
            setHasError(true);
        else
            setHasError(false);
    },[emailErrorText])
    //validation functions 
    const emailValidation = (e) =>{
        if(!e){
            e = email
        }
        if(!validator.isEmail(e)){
            setEmailErrorText('Invalid Email')
            return false
        }
        setEmailErrorText(' ')
        return true
    }
    const emailChangeHandler = (e) => {
        setEmail(e.target.value.trim())
        emailValidation(e.target.value.trim());
    }
    //Submit Handler
    const validateHandler = () =>{
        if(!emailValidation())
            return
    }
    const submitHandler = () => {
        if(!emailValidation())
            return
        console.log('dispatch')
    }

    return (
            <Paper variant='outlined' sx={{ 
                width: [
                    '100%',
                    '100%',
                    '50%',
                ]
            }}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{height:'100%'}}
                    rowSpacing={2}
                >   
                    <Grid 
                        item
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        columnSpacing={2}
                        sx={{width:'100%'}}
                    >  
                        <Grid item>
                            <LockOpenIcon/> 
                        </Grid>
                        <Grid item>
                            <Typography>
                                Password Recovery
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item
                        sx={{width:'100%'}}
                        >
                        <TextField 
                            id="Email" 
                            label="Email" 
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AlternateEmailIcon />
                                  </InputAdornment>
                                ),
                              }}
                            value={email}
                            onChange={emailChangeHandler}
                            error={emailErrorText.trim().length>0}
                            helperText={emailErrorText}
                            onFocus={emailChangeHandler}
                        />
                    </Grid>
                    <Grid item 
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{width:'100%'}}> 
                        <Button 
                            variant="contained" 
                            sx={{width:'100%'}} 
                            onClick={submitHandler} 
                            disabled={hasError}
                            onMouseEnter={validateHandler}    
                        >
                                Submit
                        </Button>
                    </Grid> 
                </Grid>
            </Paper>
	);
}
export default PasswordRecovery;
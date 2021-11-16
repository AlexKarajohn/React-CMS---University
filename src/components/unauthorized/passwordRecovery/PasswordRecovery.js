import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { authorizationActions, passwordRecovery } from '../../../store/authorization-slice';
import validator from 'validator'
import TextField from '@mui/material/TextField';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Button from '@mui/material/Button';
import { history } from '../../../App';
import SuccessForm from '../layout/successForm/SuccessForm';
const PasswordRecovery = () =>{
    const dispatch = useDispatch();
    //Input Data
    const [email,setEmail] = useState('');
    //Error 
    const [hasError,setHasError] = useState(false);
    const [emailErrorText,setEmailErrorText] = useState(' ');
    const passwordRecoveryOperation = useSelector(state=>state.authorization.operations.passwordRecovery)

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
        dispatch(passwordRecovery(email))
    }

    if(passwordRecoveryOperation.status === 'Success'){
        setTimeout(()=>{
            dispatch(authorizationActions.setOperations({function:'passwordRecovery',status:''}))
            history.push('/')
        },4000)
        return <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '50%',
            ]
        }}>
            <SuccessForm text="An email has been sent with further instructions!"/>
        </Paper>
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
                            disabled={hasError || passwordRecoveryOperation.status==='Pending'}
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
import React from 'react';
import { useEffect ,useState} from 'react';
import { useDispatch,useSelector } from "react-redux";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import validator from 'validator'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PasswordIcon from '@mui/icons-material/Password';
import { history } from '../../../store/store';
import SuccessForm from '../layout/successForm/SuccessForm'
import { authorizationActions, login } from '../../../store/authorization-slice';
import routes from '../../../assets/routes/routes';
const Login = () => {
    const dispatch = useDispatch();
    //Input Data
    const loginOperation = useSelector(state=>state.authorization.operations.login)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    //Error 
    const [hasError,setHasError] = useState(false);
    const [emailErrorText,setEmailErrorText] = useState(' ');
    const [passwordErrorText,setPasswordErrorText] = useState(' ');
    //Ui indicators
    const [showPassword,setShowPassword] = useState(false);


    useEffect(()=>{
        if(emailErrorText.trim() || passwordErrorText.trim())
            setHasError(true);
        else
            setHasError(false);
    },[emailErrorText,passwordErrorText])

    useEffect(()=>{
        if(loginOperation.error === 'INVALID_CREDENTIALS'){
            setEmailErrorText('Credentials do not match any user.')
            setPasswordErrorText('Credentials do not match any user.')
        }
    },[loginOperation])
    const toggleShowPasswordHandler= () => {
        setShowPassword(prev=>!prev);
    }
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
    const passwordValidation = (e) =>{
        if(!e){
            e = password
        }
        if(!validator.isStrongPassword(e,{minSymbols:0,minLength:6})){
            setPasswordErrorText('Invalid Password (min length 6 char, atleast 1 uppercase & 1 lowercase & 1 number)');
            return false
        }
        setPasswordErrorText(' ')
        return true
    }
    //Change Handlers
    const emailChangeHandler = (e) => {
        setEmail(e.target.value.trim())
        emailValidation(e.target.value.trim());
    }
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value.trim())
        passwordValidation(e.target.value.trim())
    }
    //Submit Handler
    const validateHandler = () =>{
        if(!emailValidation() || !passwordValidation() )
            return
    }
    const submitHandler = () => {
        if(!emailValidation() || !passwordValidation() )
            return
        console.log('dispatch')
        dispatch(login(email,password));
    }

    if(loginOperation.status === 'Success'){
        return <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '50%',
            ]
        }}>
            <SuccessForm text="LogIn in was successful!"
                toBeDispatched={[
                    authorizationActions.setAuthorizationStatus(true),
                    authorizationActions.setOperations({function:'login',status:''})
                ]}
                pushTo={routes.dashboard.path}
            />
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
                            <LoginIcon/> 
                        </Grid>
                        <Grid item>
                            <Typography>
                                Login
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
                            onFocus={validateHandler}
                        />
                    </Grid>
                    <Grid item sx={{width:'100%'}}>
                        <TextField 
                            id="Password" 
                            label="Password" 
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end" onClick={toggleShowPasswordHandler}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </InputAdornment>
                                )
                              }} 
                            value={password}
                            onChange={passwordChangeHandler}
                            error={passwordErrorText.trim().length>0}
                            helperText={passwordErrorText}
                            onFocus={validateHandler}

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
                            disabled={hasError || loginOperation.status === 'Pending'}
                            onMouseEnter={validateHandler}    
                        >
                                Submit
                        </Button>
                        <Typography variant="subtitle2" sx={{marginTop:'5px'}}>
                            <a href="/auth/passwordRecovery" onClick={(e)=>{
                                e.preventDefault();
                                history.push(routes.passwordRecovery.path)
                            }}> 
                                Forgot Password?
                            </a>
                        </Typography>
                    </Grid> 
                </Grid>
            </Paper>
    )
}
export default Login;
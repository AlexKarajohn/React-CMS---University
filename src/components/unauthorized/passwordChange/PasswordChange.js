import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { layoutActions } from "../../../store/layout-slice";
import validator from 'validator'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Button from '@mui/material/Button';
import {history} from '../../../App'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PasswordIcon from '@mui/icons-material/Password';
import { authorizationActions, passwordOverwrite } from '../../../store/authorization-slice';
import SuccessForm from '../layout/successForm/SuccessForm';
const PasswordChange = ({match,location}) => {
    const dispatch = useDispatch();
    const resetToken = match.params.resetToken;
    //Input Data
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [invalidToken,setInvalidToken] = useState(false);
    //Error 
    const [hasError,setHasError] = useState(false);
    const [emailErrorText,setEmailErrorText] = useState(' ');
    const [passwordErrorText,setPasswordErrorText] = useState(' ');
    const [confirmPasswordErrorText,setConfirmPasswordErrorText] = useState(' ');
    //Ui indicators
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const passwordOverwriteOperation = useSelector(state=>state.authorization.operations.passwordOverwrite)
    useEffect(()=>{
        dispatch(layoutActions.setLocation('Change Password'))
    },[dispatch])
    if(!validator.isLength(resetToken,{min:36,max:36})){
        history.push('/auth/passwordRecovery')
    }
    useEffect(()=>{
        if(emailErrorText.trim() || passwordErrorText.trim() || confirmPasswordErrorText.trim() )
            setHasError(true);
        else
            setHasError(false);
    },[emailErrorText,passwordErrorText,confirmPasswordErrorText])

    useEffect(()=>{
        if(passwordOverwriteOperation.error !== undefined){
            let errorArray = [passwordOverwriteOperation.error];
            if(passwordOverwriteOperation.error.includes(',')){
                errorArray = passwordOverwriteOperation.error.split(',')
            }
            errorArray.forEach(error=>{
                switch(error){
                    case 'INVALID_USER' : {
                        setEmailErrorText('Email does not exist')
                        break;
                    } 
                    case 'INVALID_RESET_TOKEN' :{
                        setInvalidToken(true)
                        break;
                    }
                    case 'TOKEN_EXPIRED' :{
                        setInvalidToken(true)
                        break;
                    }
                    default: 
                        setHasError(true);
                }
            })
        }
    },[passwordOverwriteOperation])
    const toggleShowPasswordHandler= () => {
        setShowPassword(prev=>!prev);
    }
    const toggleShowConfirmPasswordHandler= () => {
        setShowConfirmPassword(prev=>!prev);
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
        if(!validator.equals(e,confirmPassword)){
            setConfirmPasswordErrorText('Passwords need to match')
        }else{
            setConfirmPasswordErrorText(' ')
        }
        if(!validator.isStrongPassword(e,{minSymbols:0,minLength:6})){
            setPasswordErrorText('Invalid Password (min length 6 char, atleast 1 uppercase & 1 lowercase & 1 number)');
            return false
        }
        setPasswordErrorText(' ')
        return true
    }
    const confirmPasswordValidation = (e) =>{
        if(!e){
            e = confirmPassword
        }
        if(!validator.equals(e,password)){
            setConfirmPasswordErrorText('Passwords need to match')
            return false
        }
        setConfirmPasswordErrorText(' ')
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
    const confirmPasswordChangeHandler = (e) => {
        setConfirmPassword(e.target.value.trim())
        confirmPasswordValidation(e.target.value.trim())
    }
    //Submit Handler
    const validateHandler = () =>{
        if(!emailValidation() || !passwordValidation() || !confirmPasswordValidation())
            return
    }
    const submitHandler = () => {
        if(!emailValidation() || !passwordValidation() || !confirmPasswordValidation() )
            return
        dispatch(passwordOverwrite(email,password,confirmPassword,resetToken))
    }
    if(invalidToken){
        setTimeout(()=>{
            dispatch(authorizationActions.setOperations({function:'passwordOverwrite',status:''}))
            history.push('/auth/login')
        },4000)
        return <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '50%',
            ]
        }}>
            <SuccessForm text="Invalid password change attempt, the password recovery link is valid for 15 minutes!" style={{color:'red'}}/>
        </Paper>
    }
    if(passwordOverwriteOperation.status === 'Success'){
        setTimeout(()=>{
            dispatch(authorizationActions.setOperations({function:'passwordOverwrite',status:''}))
            history.push('/auth/login')
        },4000)
        return <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '50%',
            ]
        }}>
            <SuccessForm text="Password was successfully changed!"/>
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
                        <PersonAddIcon/> 
                    </Grid>
                    <Grid item>
                        <Typography>
                            Sign Up
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
                        onFocus={passwordChangeHandler}
                    />
                </Grid>
                <Grid item sx={{width:'100%'}}>
                    <TextField 
                        id="Corfirm" 
                        label="Corfirm Password" 
                        variant="outlined" 
                        type={showConfirmPassword ? 'text' : 'password'}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" >
                                <PasswordIcon />
                            </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end" onClick={toggleShowConfirmPasswordHandler}>
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </InputAdornment>
                            )
                        }}
                        value={confirmPassword}
                        onChange={confirmPasswordChangeHandler}
                        error={confirmPasswordErrorText.trim().length>0}
                        helperText={confirmPasswordErrorText}
                        onFocus={confirmPasswordChangeHandler}
                    />
                </Grid>
                <Grid item container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{width:'100%'}}
                >
                    <Button 
                        variant="contained" 
                        sx={{width:'100%'}} 
                        onClick={submitHandler} 
                        disabled={hasError || passwordOverwriteOperation.status==='Pending'}
                        onMouseEnter={validateHandler}    
                    >
                            Submit
                    </Button>
                </Grid> 
            </Grid>
        </Paper>
    )
}
export default PasswordChange;
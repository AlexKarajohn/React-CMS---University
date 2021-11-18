import { Grid,Paper } from '@mui/material';
import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import validator from 'validator'
import { history } from '../../../store/store';
import SuccessForm from '../layout/successForm/SuccessForm';
import { authorizationActions,signUp } from '../../../store/authorization-slice';

const SignUp = (props) => {
	const dispatch = useDispatch();
    const signUpOperation = useSelector(state=>state.authorization.operations.signUp)
    //Input Data
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [serialKey,setSerialKey] = useState('');
    //Error 
    const [hasError,setHasError] = useState(false);
    const [emailErrorText,setEmailErrorText] = useState(' ');
    const [passwordErrorText,setPasswordErrorText] = useState(' ');
    const [confirmPasswordErrorText,setConfirmPasswordErrorText] = useState(' ');
    const [serialKeyErrorText,setSerialKeyErrorText] = useState(' ');
    //Ui indicators
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    useEffect(()=>{
        if(signUpOperation.error !== undefined){
            let errorArray = [signUpOperation.error];
            if(signUpOperation.error.includes(',')){
                errorArray = signUpOperation.error.split(',')
            }
            errorArray.forEach(error=>{
                switch(error){
                    case 'EMAIL_INUSE' : {
                        setEmailErrorText('Email already in use.')
                        break;
                    } 
                    case 'INVALID_SERIAL_KEY_NONEXISTENT' :{
                        setSerialKeyErrorText('Serial Key does not exist')
                        break;
                    }
                    default: 
                        setHasError(true);
                }
            })
        }
    },[signUpOperation])

    useEffect(()=>{
        if(emailErrorText.trim() || passwordErrorText.trim() || confirmPasswordErrorText.trim() || serialKeyErrorText.trim())
            setHasError(true);
        else
            setHasError(false);
    },[emailErrorText,passwordErrorText,confirmPasswordErrorText,serialKeyErrorText])

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
    const serialKeyValidation = (e) =>{
        if(!e){
            e = serialKey
        }
        if(!validator.isLength(e,{min:36,max:36})){
            setSerialKeyErrorText('Invalid key (must be 36 char)')
            return false
        }
        setSerialKeyErrorText(' ')
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
    const serialKeyChangeHandler = (e) => {
        setSerialKey(e.target.value.trim())
        serialKeyValidation(e.target.value.trim())
    }
    //Submit Handler
    const validateHandler = () =>{
        if(!emailValidation() || !passwordValidation() || !confirmPasswordValidation() || !serialKeyValidation())
            return
    }
    const submitHandler = () => {
        if(!emailValidation() || !passwordValidation() || !confirmPasswordValidation() || !serialKeyValidation())
            return
        dispatch(signUp(email,password,confirmPassword,email,serialKey))
    }

    if(signUpOperation.status === 'Success'){
        setTimeout(()=>{
            dispatch(authorizationActions.setOperations({function:'signUp',status:''}))
            history.push('/auth/login')
        },2000)
        return <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '50%',
            ]
        }}>
            <SuccessForm text="SignUp was successful!"/>
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
                            id="Confirm" 
                            label="Confirm Password" 
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
                    <Grid item sx={{width:'100%'}}>
                        <TextField 
                            id="Serial" 
                            label="Serial Key" 
                            variant="outlined" 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                                ),
                            }}
                            value={serialKey}
                            onChange={serialKeyChangeHandler}
                            error={serialKeyErrorText.trim().length>0}
                            helperText={serialKeyErrorText}
                            onFocus={serialKeyChangeHandler}
                        />
                    </Grid> 
                    <Grid item container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{width:'100%'}}
                    >
                        <Typography mb={2}>
                            By clicking Submit, you agree to our <a  target="_blank" rel="noreferrer" href="/termsAndConditions">Terms</a>.
                        </Typography>
                        <Button 
                            variant="contained" 
                            sx={{width:'100%'}} 
                            onClick={submitHandler} 
                            disabled={hasError || signUpOperation.status==='Pending'} 
                            onMouseEnter={validateHandler}    
                        >
                            Submit
                        </Button>
                    </Grid> 
                </Grid>
            </Paper>
	);
};
export default SignUp;

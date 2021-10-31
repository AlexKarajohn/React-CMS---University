import React from 'react';
import { useEffect ,useState} from 'react';
import { useDispatch } from "react-redux";
import { layoutActions } from "../../../store/layout-slice";
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import validator from 'validator'
import Form from '../../utils/forms/Form';
const Login = () => {
    const dispatch = useDispatch();
    const [formErrors,setFormErrors]= useState([])
    const loginFields = [{label:'Email'},{label:'Password'}]

    useEffect(()=>{
        dispatch(layoutActions.setLocation('Login'))
    },[dispatch])


    const submitHandler = (props) => {
        console.log('submit handler props')
        setFormErrors([])
        const errors = [];
        if(!validator.isEmail(props.find(textField => textField.label === 'Email').value))
            errors.push('Email is Invalid')
        if(!validator.isLength(props.find(textField => textField.label === 'Password').value,{min:5,max:35}))
            errors.push('Password is Invalid')
        setFormErrors(errors);
    }
    return ( 
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{height:'100%'}}
        >
            <Paper elevation={12} >
                <Form fields={loginFields} submitText={'Login'} submitHandler={submitHandler} errors={formErrors}/>
            </Paper>
        </Grid>

    )
}
export default Login;
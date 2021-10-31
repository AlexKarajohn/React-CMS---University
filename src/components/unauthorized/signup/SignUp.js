import styled from 'styled-components';
import { Grid,Paper } from '@mui/material';
import Form from '../../utils/forms/Form';

import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { layoutActions } from "../../../store/layout-slice";


const fields = [
	{label: 'Email'},
	{label: 'Password'},
	{label: 'ConfirmPassword'},
]

const SignUp = (props) => {
	const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(layoutActions.setLocation('Sign Up'))
    },[dispatch])
	return (
		<Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{height:'100%'}}
        >
            <Paper elevation={12} >
				<Form fields={fields} submitText='Sign Up'/>
            </Paper>
        </Grid>
		
	);
};
export default SignUp;

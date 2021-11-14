import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { layoutActions } from "../../../store/layout-slice";
import validator from "validator";
import { history } from "../../../App";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Grid";
import LinearProgress from '@mui/material/LinearProgress';
import InfoIcon from '@mui/icons-material/Info';
import SuccessForm from "../layout/successForm/SuccessForm";
const SignUpConfirmation = ({match,location}) => {
    const dispatch = useDispatch();
    const confirmationToken = match.params.confirmationToken
    useEffect(()=>{
        dispatch(layoutActions.setLocation('Email Confirmation'))
    },[dispatch])
    useEffect(()=>{
        if(!validator.isLength(confirmationToken,{min:36,max:36})){
            history.push('/')
            return;
        }
        console.log(`dispatch to api with token ${confirmationToken}`)
    },[confirmationToken])
    //while loading
    if('waiting for api')
    return (
        <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '50%',
            ]}}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{height:'100%'}}
                rowSpacing={2}
            >
                <Grid item>
                    <InfoIcon/>
                </Grid>
                <Grid item>
                    <Typography>
                        Confirming you Account, this might take a few seconds
                        <LinearProgress />
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
    //once done 
    return (
        <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '50%',
            ]}}>
                <SuccessForm text="Account was confirmed successfully"/>
        </Paper>
    )
}
export default SignUpConfirmation;
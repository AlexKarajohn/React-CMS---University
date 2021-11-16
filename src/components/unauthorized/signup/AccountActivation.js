import { useDispatch,useSelector } from "react-redux";
import { useEffect } from 'react';
import { layoutActions } from "../../../store/layout-slice";
import { authorizationActions,accountActivation } from "../../../store/authorization-slice";
import validator from "validator";
import { history } from "../../../App";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Grid";
import LinearProgress from '@mui/material/LinearProgress';
import InfoIcon from '@mui/icons-material/Info';
import SuccessForm from "../layout/successForm/SuccessForm";
const AccountActivation = ({match,location}) => {
    const dispatch = useDispatch();
    const token = match.params.token;
    const accountActivationOperation = useSelector(state=>state.authorization.operations.accountActivation)
    useEffect(()=>{
        dispatch(layoutActions.setLocation('Email Confirmation'))
    },[dispatch])
    useEffect(()=>{
        if(!validator.isLength(token,{min:24,max:24})){
            history.push('/')
            return;
        }
        dispatch(accountActivation(token));
    },[token])
    //while loading
    if(accountActivationOperation.status!=='Success' && accountActivationOperation.status!=='Failed')
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
    if(accountActivationOperation.status==='Success')
    return (
        <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '50%',
            ]}}>
                <SuccessForm text="Account was activated successfully"/>
        </Paper>
    )
    if(accountActivationOperation.status==='Failed')
    return (
        <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '50%',
            ]}}>
                <SuccessForm text="Something went wrong, either no user was found or your serial key has already been activated." style={{color:'red'}}/>
        </Paper>
    )
}
export default AccountActivation;
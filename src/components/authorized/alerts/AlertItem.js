import { Button, Card, Typography ,Grid} from "@mui/material";
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { acknowledgeAlert,deleteAlert,userActions } from "../../../store/user-slice";
import { useDispatch } from "react-redux";
import {useEffect} from 'react';
import { useSnackbar } from 'notistack';

const AlertsItem = ({alert,facilityId,sensorId}) =>{
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(()=>{
        if(!alert.hasOwnProperty('operations'))
            return;
        if(alert.operations.acknowledgeAlert.status === 'Failed'){
            dispatch(userActions.setAlertOperations({
                function: 'acknowledgeAlert',
                facilityId,
                sensorId,
                alertId: alert._id
            }))
            enqueueSnackbar('Oops! Something went wrong!',{
                variant: 'error',
            })
        }
        if(alert.operations.acknowledgeAlert.status === 'Success'){
            dispatch(userActions.setAlertOperations({
                function: 'acknowledgeAlert',
                facilityId,
                sensorId,
                alertId:alert._id,
            }))
        }
        if(alert.operations.deleteAlert.status === 'Success'){
            dispatch(userActions.setAlertOperations({
                function: 'deleteAlert',
                facilityId,
                sensorId,
                alertId:alert._id,
            }))
            dispatch(userActions.deleteAlert({
                facilityId,
                sensorId,
                alertId:alert._id,
            }))
        }
    },[alert,dispatch,enqueueSnackbar,facilityId,sensorId])
  
    const acknowledgeOnClickHandler = ( ) =>{
        dispatch(acknowledgeAlert(facilityId,sensorId,alert._id))
    }
    const deleteOnClickHandler = ( ) =>{
        dispatch(deleteAlert(facilityId,sensorId,alert._id))
    }
    const badgeContent =  alert.acknowledged ?
    <IconButton aria-label="delete" size="small" color="error" onClick={deleteOnClickHandler}>
        <DeleteIcon fontSize="small" />
    </IconButton> : ''
    const formattedDate = new Date(Number(alert.time)).toString().split('(')[0]
    return (
        <Badge badgeContent={badgeContent} sx={{width:'100%'}} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }} >
        <Card sx={{width:'100%',backgroundColor: (alert.acknowledged ? 'green' : 'red'),color:'white'}}>
            <Grid container
                direction="row"
                justifyContent='center'
                alignItems="center" 
            >
            <Typography fontSize={12} sx={{width:'100%'}} align='center'>
                {formattedDate}
            </Typography>
            {!alert.acknowledged && 
                <Button onClick={acknowledgeOnClickHandler} xs={{width:'100%'}} variant='outlined' color='error'> 
                    <Typography>acknowledge</Typography> 
                </Button>
            }
            </Grid>

        </Card>
        </Badge>
    )
}
export default AlertsItem;
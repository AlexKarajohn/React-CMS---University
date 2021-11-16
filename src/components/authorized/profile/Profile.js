import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { layoutActions } from "../../../store/layout-slice";
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
const Profile = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(layoutActions.setLocation('Profile'))
    },[dispatch])
    return ( 
        <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '75%',
            ]
        }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{height:'100%'}}
            >   
                asdasd
            </Grid>
        </Paper>
    )
}
export default Profile;
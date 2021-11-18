import { useSelector } from "react-redux";
import { useEffect } from "react";
import Paper from '@mui/material/Paper';
// import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import FacilityListItem from "./facilitiesListItem/FacilityListItem";
import {v4 as uuid } from 'uuid';
const Facilities = () => {
    const facilities = useSelector(state=>state.user.user.facilities)
    useEffect(()=>{
        if(!facilities.detailed){
            //dispatch()
            console.log('dispatch to grab facilities');
        }
    },[facilities.detailed])

    if(!facilities.detailed){
        return <div>Loading</div>
    }

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
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{height:'100%'}}
                rowSpacing={4}
            >   
                {facilities.items.map(facility=>{
                    return (
                        <Grid item sx={{width:'100%'}} key={uuid()}>
                            <FacilityListItem facility={facility}/>
                        </Grid>       
                    )
                })}
            </Grid>
        </Paper>
    )
}
export default Facilities;
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
    const fakeFacilities = {
        items : [
            {id:'1',name:'facility 1',triggered:false,status:true,alerts:['1']},
            {id:'2',name:'facility 2',triggered:true,status:true,alerts:[]},
            {id:'3',name:'facility 3',triggered:true,status:false,alerts:['1','2']},
        ],
        detailed : true
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
                {fakeFacilities.items.map(facility=>{
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
import { useSelector } from "react-redux";
import Paper from '@mui/material/Paper';
// import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import FacilityListItem from "./facilitiesListItem/FacilityListItem";
import {v4 as uuid } from 'uuid';
import FacilityAdd from "./facility/FacilityAdd";
import {useState} from 'react';
const Facilities = () => {
    const [expanded, setExpanded] = useState(false);
    const facilities = useSelector(state=>state.user.user.facilities.items)
    

    if(!facilities){
        return <div>Loading</div>
    }
    const handleExpandClick = () =>{
        setExpanded(prev=>!prev);
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
             <Grid item sx={{width:'100%'}}>
                    <Button variant='contained' onClick={handleExpandClick}>{expanded ? 'HIDE ADD' : 'SHOW ADD'}</Button>
                    <Collapse in={expanded} timeout="auto" unmountOnExit sx={{width:'100%'}}>
                    <FacilityAdd submitted={()=> setExpanded(prev=>!prev)}/>
                    </Collapse>
             </Grid>       
                {facilities.map(facility=>{
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
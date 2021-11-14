import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import InfoIcon from '@mui/icons-material/Info';
import {useState} from 'react'
const SuccessForm = (props) => {

    return (
        <Card 
            sx={{transform: 'scale(0,0)',border:'2px solid #34a8eb',color:'#34a8eb'}} 
            style={{animation: `showInformation linear 0.5s 1 normal forwards`}}
            >
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                rowSpacing={2}
                style={{height:'100%',opacity:0,animation: `fadeIn  linear 0.5s 0.6s 1 normal forwards`}}
            >   
                <Grid item>
                    <InfoIcon/>
                </Grid>
                <Grid item>
                    {props.text}
                </Grid>
            </Grid>    
        </Card>
    )
}
export default SuccessForm;
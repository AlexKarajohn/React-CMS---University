import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import InfoIcon from '@mui/icons-material/Info';
import { history } from "../../../../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const SuccessForm = (props) => {
    const dispatch = useDispatch();
    let timeout;
    useEffect(()=>{
        return (()=>{
            clearTimeout(timeout);
        })
    },[timeout])
    
    const animationEndHandler = () =>{
        console.log(props)
        if(props.timeout){
            timeout = setTimeout(()=>{
                if(props.hasOwnProperty('toBeDispatched') && Array.isArray(props.toBeDispatched) && props.toBeDispatched.length > 0){
                    props.toBeDispatched.forEach(dispatchedAction=>{
                        dispatch(dispatchedAction)
                    })
                }else if(props.hasOwnProperty('toBeDispatched')){
                    dispatch(props.toBeDispatched)
                }
                if(props.pushTo){
                    history.push(props.pushTo)
                }
            },props.timeout * 1000)
        }else{
            if(props.hasOwnProperty('toBeDispatched') && Array.isArray(props.toBeDispatched) && props.toBeDispatched.length > 0){
                props.toBeDispatched.forEach(dispatchedAction=>{
                    dispatch(dispatchedAction)
                })
            }else if(props.hasOwnProperty('toBeDispatched')){
                dispatch(props.toBeDispatched)
            }
            if(props.pushTo)
                history.push(props.pushTo)
        }   
    }
    return (
        <Card 
            sx={{transform: 'scale(0,0)',border:'2px solid #34a8eb'}} 
            style={{animation: `showInformation linear 0.5s 1 normal forwards`}}
            >
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                rowSpacing={2}
                style={{height:'100%',opacity:0,animation: `fadeIn  linear 1.5s 0.6s 1 normal forwards`}}
                onAnimationEnd={(e)=>{
                    if(e.animationName==='fadeIn')
                        animationEndHandler()
                }}
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
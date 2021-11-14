import  Paper from "@mui/material/Paper"
import SuccessForm from "../layout/successForm/SuccessForm"
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { layoutActions } from "../../../store/layout-slice";

const TermsAndConditions = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(layoutActions.setLocation('Terms And Conditions'))
    },[dispatch])
    const termsText = 'PlaceHolder Terms And Conditions'
    return  <Paper variant='outlined' sx={{ 
        width: [
            '100%',
            '100%',
            '50%',
        ]}}>
            <SuccessForm text={termsText}/>
    </Paper>
}

export default TermsAndConditions;
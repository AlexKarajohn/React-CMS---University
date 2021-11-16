import  Paper from "@mui/material/Paper"
import SuccessForm from "../layout/successForm/SuccessForm"

const TermsAndConditions = () => {

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
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
  } from '@mui/material/';
  import CloseIcon from '@mui/icons-material/Close';

import { layoutActions } from '../../../store/layout-slice';
import { useDispatch,useSelector } from 'react-redux';

const DialogRedux = () => {
    const dispatch = useDispatch()
    const {onSubmit , message } = useSelector(state=>state.layout.dialog)
    const close = () =>{
        dispatch(layoutActions.closeDialog())
    }
    return (
        // if the onSubmit is undefined the dialog will be closed. 
        // close() function sets the onSubmit to undefined, 
        // so it will close the dialog, if we pass it to the onClose attribute.
        <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm" fullWidth> 
        <DialogTitle>Confirm the action</DialogTitle>
        <Box position="absolute" top={0} right={0}>
            <IconButton onClick={close}>
            <CloseIcon />
            </IconButton>
        </Box>
        <DialogContent>
            <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
            <Button color="primary" variant="contained" onClick={close}>
            Cancel
            </Button>
            <Button
            color="secondary"
            variant="contained"
            onClick={() => {
                if (onSubmit) {
                    dispatch(onSubmit)
                }
                close();
            }}
            >
            Confirm
            </Button>
        </DialogActions>
        </Dialog>
    );

}
export default DialogRedux;
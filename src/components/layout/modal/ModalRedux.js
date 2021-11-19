import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch,useSelector } from 'react-redux';
import { layoutActions } from '../../../store/layout-slice';

const ModalRedux = ()  => {
  
  const dispatch = useDispatch();
  const modal = useSelector(state=>state.layout.modal)
  const handleClose = () => dispatch(layoutActions.setModal({open:false}))
  const acceptOnClickHandler = () => {
    dispatch(modal.submit);
    dispatch(layoutActions.setModal({open:false}))
  }
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  return (
      <Modal
        open={modal.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal.open}>
          <Box sx={style} component={Card}>
            <Grid  direction="row"
              justifyContent='center'
              alignItems="center" 
            >
              <Grid item >
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  {modal.message}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant='contained' onClick={acceptOnClickHandler} sx={{width:'50%'}}>YES</Button>
                <Button variant='contained' onClick={handleClose} sx={{width:'50%'}}>NO</Button>
              </Grid>
             
            </Grid>
              
          </Box>
        </Fade>
      </Modal>
    
  );
}
export default ModalRedux;
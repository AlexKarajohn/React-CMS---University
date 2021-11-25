import { useSelector } from "react-redux";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Stack from '@mui/material/Stack';
import SensorItem from "../../sensor/SensorItem";
import Switch from '@mui/material/Switch';
import {v4 as uuid } from 'uuid'
import Button from '@mui/material/Button';
import { useState,useEffect } from "react";
import Collapse from '@mui/material/Collapse';
import validator from 'validator';
import SensorAdd from "../../sensor/SensorAdd";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { layoutActions } from "../../../../store/layout-slice";
import { useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { deleteFacility,getFacility, updateFacility, userActions } from "../../../../store/user-slice";
import { useSnackbar } from 'notistack';
import { history } from "../../../../store/store";
import routes from "../../../../assets/routes/routes";
import ClearIcon from '@mui/icons-material/Clear';
import Badge from '@mui/material/Badge';
const Facility = ({match,location}) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    const [expanded, setExpanded] = useState(false);
    const deleteFacilityOperation = useSelector(state=>state.user.operations.deleteFacility)
    const updateFacilityOperation = useSelector(state=>state.user.operations.updateFacility)
    const facility = useSelector(state=>state.user.user.facilities.items.find(facility=> facility._id === match.params.facilityId))
    useEffect(()=>{
        if(facility && !facility.detailed){
            dispatch(getFacility(match.params.facilityId))
        }
        if(facility && facility.detailed){
            setName(facility.name)
            setDescription(facility.description)
            setEnabled(facility.enabled)
        }
    },[facility,dispatch,match.params.facilityId])

    useEffect(()=>{
        if(deleteFacilityOperation.status==='confirmed'){
            dispatch(deleteFacility(facility._id));
        }
        if(deleteFacilityOperation.status==='Success'){
            dispatch(userActions.setOperations({function:'deleteFacility'}));
            enqueueSnackbar('Facility Was Removed!',{
                variant: 'success',
            })
            history.push(routes.facilities.path)
        }
        if(deleteFacilityOperation.status==='Failed'){
            dispatch(userActions.setOperations({function:'deleteFacility'}));
            enqueueSnackbar('Oops! Something went wrong!',{
                variant: 'error',
            })
        }
        if(updateFacilityOperation.status==='Success'){
            dispatch(userActions.setOperations({function:'updateFacility'}));
            setEditState(false);
        }
        if(updateFacilityOperation.status==='Failed'){
            dispatch(userActions.setOperations({function:'updateFacility'}));
            enqueueSnackbar('Oops! Something went wrong!',{
                variant: 'error',
            })
        }
    },[updateFacilityOperation,deleteFacilityOperation,dispatch,facility,enqueueSnackbar])

    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [enabled,setEnabled] = useState(false);
    const [nameError,setNameError] = useState('');
    const [descriptionError,setDescriptionError] = useState('');
    const [hasErrors,setHasErrors] = useState(false);
    const [editState,setEditState] = useState(false);

    
    const resetData = () =>{
        setNameError('')
        setDescriptionError('')
        setName(facility.name)
        setDescription(facility.description)
        setEnabled(facility.enabled)
        setEditState(true);
        setHasErrors(false);
    }
    const cancelOnClickHandler = () =>{
        setEnabled(facility.enabled)
        setEditState(false);
        setHasErrors(false);
    }
    const nameValidation = (e) =>{
        if(!e){
            e = name
        }
        if(!validator.isLength(e,{min:3,max:20})){
            setNameError('Min:3, Max:20')
            setHasErrors(true);
            return false
        }
        setNameError(' ')
        setHasErrors(false);
        return true
    }
    const descriptionValidation = (e) =>{
        if(!e){
            e = description
        }
        if(!validator.isLength(e,{min:3,max:20})){
            setDescriptionError('Min:3, Max:20')
            setHasErrors(true);
            return false
        }
        setDescriptionError(' ')
        setHasErrors(false);
        return true
    }
    const nameChangeHandler = (e) => {
        setName(e.target.value.trim())
        nameValidation(e.target.value.trim());
    }
    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value.trim())
        descriptionValidation(e.target.value.trim())
    }
    const enabledOnChangeHandler = (e) => {
        setEnabled(prev=>!prev)
    }
    const handleExpandClick = () =>{
        setExpanded(prev=>!prev);
    }
    //Submit Handler
    const editFacilityOnClickHandler= () =>{
        if(!editState){
            resetData();
            return;
        }
        let errors = false;
        if(!nameValidation()){
            setNameError('Min:3, Max:20')
            errors = true;
        }
        if(!descriptionValidation()){
            setDescriptionError('Min:3, Max:20')
            errors = true;
        }
        if(errors){
            setHasErrors(true);
            return;
        }
        setHasErrors(false);
        dispatch(updateFacility(facility._id,name,description,enabled))
    }
    const deleteFacilityOnClickHandler = ( ) =>{
        dispatch(layoutActions.createDialog({
            submit: userActions.setOperations({function:'deleteFacility',status:'confirmed'}),
            message: `Are you sure you want to delete ${facility.name}`
        }))
    }
    if(!facility){
        return <div>Loading</div>
    }
    const badgeContent =  editState ?
    <Button onClick={cancelOnClickHandler} aria-label="cancel" variant='contained' size="small" sx={{marginLeft:11,marginTop:5,fontSize:12,height:40}}  color='error'>
        <ClearIcon fontSize="small" /> CANCEL
    </Button> : ''
    return (
        <Paper variant='outlined' sx={{ 
            width: [
                '100%',
                '100%',
                '75%',
            ],
            
        }}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{width:'100%'}}
                    rowSpacing={2}
                >  
                    <Grid item 
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                         <Badge badgeContent={badgeContent} sx={{width:'100%',}} anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                            
                        }} invisible={!editState}>
                        <Card sx={{width:'100%'}}>
                        <Grid item   xs={12} variant='h4'align='center' sx={{height:'80px'}}>
                            <Stack  
                                direction="column"
                                justifyContent='center'
                                alignItems="center"
                                >
                                <Typography sx={{height:'30px',width:'100%'}} align='center'>
                                Name: 
                                </Typography>
                                {editState ? 
                                <TextField
                                    value={name}
                                    onChange={nameChangeHandler}
                                    size='small'
                                    error={nameError.trim().length >0}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    helperText={nameError}
                                    sx={{height:'30px'}}
                                />
                                : 
                                <Typography sx={{height:'30px',width:'100%'}} align='center'>
                                    {facility.name}
                                </Typography>
                                }
                            </Stack>
                        </Grid>
                        <Grid item xs={12} variant='h6' align='center' sx={{height:'80px'}}>
                            <Stack  
                                direction="column"
                                justifyContent='center'
                                alignItems="center"
                            >
                                <Typography sx={{height:'30px',width:'100%'}} align='center'>
                                Description : 
                                </Typography>
                                {editState ? 
                                <TextField
                                    value={description}
                                    onChange={descriptionChangeHandler}
                                    size='small'
                                    error={descriptionError.trim().length >0}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    helperText={descriptionError}
                                    sx={{height:'30px'}}
                                />
                                : 
                                <Typography sx={{height:'30px',width:'100%'}} align='center'>
                                    {facility.description}
                                </Typography>
                                }
                            </Stack> 
                        </Grid>
                       
                        
                        
                        
                            <Grid  
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item 
                                    xs={12}
                                    sm={4}
                                   
                                >
                                    <Stack direction="row"
                                        justifyContent={{xs: 'center',sm:'flex-start'}}
                                        alignItems="center"
                                    >
                                        Enable :                             
                                        <Switch 
                                            checked={enabled}
                                            onChange={enabledOnChangeHandler}
                                            disabled={!editState}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item 
                                    xs={12}
                                    sm={4}
                                   
                                >
                                    <Stack direction="row"
                                        justifyContent='center'
                                        alignItems="center"
                                    >
                                        Triggered : {facility.triggered ? <ReportIcon fontSize='large'/> : <CheckCircleIcon fontSize='large'/>}
                                    </Stack>
                                </Grid>
                                <Grid item 
                                    xs={12}
                                    sm={4}
                                   
   
                                    justifyContent={{xs: 'center',sm:'flex-end'}}
                                    alignItems="center"
                                >
                                    <Stack direction="row"
                                        justifyContent={{xs: 'center',sm:'flex-end'}}
                                        alignItems="center"
                                    >
                                        Status : {facility.status ? <PowerIcon fontSize='large' sx={{color:'green'}}/> : <PowerOffIcon fontSize='large' sx={{color:'red'}}/>}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} align='center' >
                            <Stack  
                                direction="row"
                                justifyContent='center'
                                alignItems="center"
                             
                            >
                                <Button variant="contained" color='error' sx={{marginRight:2}} onClick={deleteFacilityOnClickHandler}>
                                    <DeleteIcon/> DELETE
                                </Button>
                                <Button 
                                    variant="contained" 
                                    sx={{minWidth:'120px'}} 
                                    onClick={editFacilityOnClickHandler} 
                                    onMouseEnter={()=>{
                                        editState && nameValidation();
                                        editState && descriptionValidation();
                                    }} 
                                    disabled={hasErrors}
                                >
                                    {!editState ? <><EditIcon/> EDIT </> : <> <SendIcon/>UPDATE</>}
                                </Button>
                            </Stack> 
                            
                        </Grid>
                      
                            </Grid>
                            
                        </Card>
                        </Badge>
                    </Grid>
                    <Grid item 
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card sx={{width:'100%',backgroundColor:'#EEE'}} >
                            <Grid  
                                container
                       
                                justifyContent="center"
                                alignItems="center"
                                rowSpacing={1}
                            >
                                <Grid item 
                                    xs={12}
                                    sm={12}
                                    variant='h5'
                                >
                                    <Stack direction="column"
                                        justifyContent='center'
                                        alignItems="center"
                                    >
                                      Sensors
                                      <Button sx={{width:'150px'}} variant='contained' onClick={handleExpandClick}>
                                          {!expanded ? 'SHOW ADD' : 'HIDE ADD'}
                                      </Button>
                                    </Stack>
                                </Grid>
                                <Collapse in={expanded} timeout="auto" unmountOnExit sx={{width:'100%',marginTop:'5px'}}>
                                <Grid item 
                                        xs={12}
                                        key={uuid()}    
                                    >
                               
                                    
                                        <SensorAdd facilityId={facility._id} submitted={()=>{
                                            setExpanded(false)
                                        }}/>
                                   
                                
                                </Grid>
                                </Collapse>
                                {facility.sensors.map(sensor=>{
                                    return (
                                        <Grid item 
                                            xs={12}
                                            key={uuid()}
                                            
                                        >
                                            <Stack direction="row"
                                                justifyContent='center'
                                                alignItems="center"
                                            >
                                                <SensorItem sensor={sensor} facilityId={facility._id}/>
                                            </Stack>
                                        </Grid>
                                    )
                                })}
                                
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
           
        </Paper>

    )
}

export default Facility;
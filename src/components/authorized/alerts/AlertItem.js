import { Button, Card, Typography ,Grid} from "@mui/material";
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const AlertsItem = (props) =>{

    const acknowledgeOnClickHandler = ( ) =>{
        
        console.log(`dispatch ack with id ${props.alert._id}`)
    }
    const deleteOnClickHandler = ( ) =>{
        console.log(`dispatch delete with id ${props.alert._id}`)
    }
    const badgeContent =  props.alert.acknowledged ?
    <IconButton aria-label="delete" size="small" color="error" onClick={deleteOnClickHandler}>
        <DeleteIcon fontSize="small" />
    </IconButton> : ''
    

    return (
        <Badge badgeContent={badgeContent} sx={{width:'100%'}} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }} >
        <Card sx={{width:'100%',backgroundColor: (props.alert.acknowledged ? 'green' : '#ff8080')}}>
            <Grid container
                direction="row"
                justifyContent='center'
                alignItems="center" 
            >
            <Typography fontSize={12} sx={{width:'100%'}} align='center'>
                {Date(props.alert.time).split('(')[0]}
            </Typography>
            {!props.alert.acknowledged && 
                <Button onClick={acknowledgeOnClickHandler} xs={{width:'100%'}} variant='outlined' color='error'> 
                    <Typography>acknowledge</Typography> 
                </Button>
            }
            </Grid>

        </Card>
        </Badge>
    )
}
export default AlertsItem;
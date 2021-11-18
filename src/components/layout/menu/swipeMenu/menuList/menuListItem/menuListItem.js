import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { history } from '../../../../../../store/store';
import React from 'react'
const MenuListItem = (props) => {
  const navigateToHandler = () => {
    history.push(props.linkTo)
  }
  
  return (
    <ListItem key={props.text} >
      <ListItemButton onClick={navigateToHandler}>
        <ListItemIcon> {React.createElement(props.icon)} </ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItemButton>
    </ListItem>
  )
}
export default MenuListItem
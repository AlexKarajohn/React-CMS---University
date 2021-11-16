import List from '@mui/material/List';
import Box from '@mui/material/Box';
import MenuListItem from './menuListItem/menuListItem';
import {v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux';
import routes from '../../../../../assets/routes';
import React from 'react';
const MenuList = ( props) => {
    const authStatus = useSelector(state=>state.authorization.authorizationStatus)
    return (
      <Box
        sx={{ width:250 }}
        role="presentation"
        onClick={props.toggleDrawer(false)}
        onKeyDown={props.toggleDrawer(false)}
      >
        <List>
          {
            routes.filter(route => ((route.authorization === authStatus || route.universal === true )&& route.hasOwnProperty('icon'))).map(route=>{
              return <MenuListItem  key={uuid()} icon={route.icon} text={route.title} linkTo={route.path} />
            })
          }
        </List>
      </Box>
    )
}
export default MenuList;
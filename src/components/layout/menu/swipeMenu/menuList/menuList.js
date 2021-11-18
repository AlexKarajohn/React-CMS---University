import List from '@mui/material/List';
import Box from '@mui/material/Box';
import MenuListItem from './menuListItem/menuListItem';
import {v4 as uuid } from 'uuid'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import routes from '../../../../../assets/routes/routes';
import React from 'react';
const MenuList = ( props) => {
    const authStatus = useSelector(state=>state.authorization.authorizationStatus)
    const [menuListItems,setMenuListItems] = useState([])
    useEffect(()=>{


      setMenuListItems(
        Object.entries(routes)
          .filter(route => ((route[1].authorization === authStatus || route[1].universal === true )&& route[1].menu && route[1].hasOwnProperty('icon')))
          .map(route=>{
            return <MenuListItem  key={uuid()} icon={route[1].icon} text={route[1].title} linkTo={route[1].path} />
      }))

    },[authStatus])
    return (
      <Box
        sx={{ width:250 }}
        role="presentation"
        onClick={props.toggleDrawer(false)}
        onKeyDown={props.toggleDrawer(false)}
      >
        <List>
          {
            menuListItems
          }

        </List>
      </Box>
    )
}
export default MenuList;
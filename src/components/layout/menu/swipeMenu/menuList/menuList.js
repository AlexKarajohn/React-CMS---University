import List from '@mui/material/List';
import Box from '@mui/material/Box';
import MenuListItem from './menuListItem/menuListItem';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {v4 as uuid } from 'uuid'
const MenuList = ( props) => {
    const authStatus = useSelector(state=>state.authorization.authorizationStatus)
    const UnauthorizedMenuList = [
        {icon:<HomeIcon/>,text:'Home',linkTo:'/'},
        {icon:<LoginIcon/>,text:'Log In',linkTo:'/auth/login'},
        {icon:<PersonAddIcon/>,text:'Sign Up',linkTo:'/auth/signup'},
      ]
    return (
      <Box
        sx={{ width:250 }}
        role="presentation"
        onClick={props.toggleDrawer(false)}
        onKeyDown={props.toggleDrawer(false)}
      >
        <List>
          {UnauthorizedMenuList.map(listItem=><MenuListItem  key={uuid()} icon={listItem.icon} text={listItem.text} linkTo={listItem.linkTo} />)}
        </List>
      </Box>
    )
}
export default MenuList;
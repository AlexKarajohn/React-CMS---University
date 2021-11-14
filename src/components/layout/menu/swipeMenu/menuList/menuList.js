import List from '@mui/material/List';
import Box from '@mui/material/Box';
import MenuListItem from './menuListItem/menuListItem';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {v4 as uuid } from 'uuid'
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PersonIcon from '@mui/icons-material/Person';
const MenuList = ( props) => {
    const authStatus = useSelector(state=>state.authorization.authorizationStatus)
    const UnauthorizedMenuList = [
        {icon:<HomeIcon/>,text:'Home',linkTo:'/'},
        {icon:<LoginIcon/>,text:'Log In',linkTo:'/auth/login'},
        {icon:<PersonAddIcon/>,text:'Sign Up',linkTo:'/auth/signup'},
        {icon:<LockOpenIcon/>,text:'Password Recovery',linkTo:'/auth/passwordRecovery'},
        {icon:<DescriptionIcon/>,text:'Terms And Conditions',linkTo:'/termsAndConditions'}
      ]
    const AuthorizedMenuList = [
        {icon:<DashboardIcon/>,text:'Dashboard',linkTo:'/auth/dashboard'},
        {icon:<PersonIcon/>,text:'Profile',linkTo:'/auth/profile'},
        {icon:<HomeWorkIcon/>,text:'Facilities',linkTo:'/auth/facilities'},
        {icon:<DescriptionIcon/>,text:'Terms And Conditions',linkTo:'/termsAndConditions'}
      ]
    const menuArray = !authStatus ? UnauthorizedMenuList : AuthorizedMenuList
    return (
      <Box
        sx={{ width:250 }}
        role="presentation"
        onClick={props.toggleDrawer(false)}
        onKeyDown={props.toggleDrawer(false)}
      >
        <List>
          {menuArray.map(listItem=><MenuListItem  key={uuid()} icon={listItem.icon} text={listItem.text} linkTo={listItem.linkTo} />)}
        </List>
      </Box>
    )
}
export default MenuList;
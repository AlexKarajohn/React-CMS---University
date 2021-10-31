import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuList from './menuList/menuList';
import { useState } from 'react';


const SwipeMenu = ()  =>{
  const [menuState, setMenuState] = useState(false);

  const toggleDrawer = (booleanValue) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setMenuState(booleanValue);
  };



  return (
    <div>
            <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
            <SwipeableDrawer
                anchor='right'
                open={menuState}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <MenuList toggleDrawer={toggleDrawer}/>
            </SwipeableDrawer>
    </div>
  );
}

export default SwipeMenu;
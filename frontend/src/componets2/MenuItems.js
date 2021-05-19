
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Add, Deck, Pages, Person } from '@material-ui/icons'
import {NavLink} from 'react-router-dom'

export const mainListItems = (
    <div>
     <NavLink to="/">
      <ListItem button>
        <ListItemIcon>
          <Pages />
        </ListItemIcon>
        <ListItemText primary="MyChannel" />
      </ListItem>
    </NavLink>

    <NavLink to="/">
      <ListItem button > 
     
        <ListItemIcon>
          <Deck />
        </ListItemIcon>
        <ListItemText primary="My Rooms" />
       
      </ListItem>
     </NavLink>

     <NavLink to="/">
      <ListItem >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Profile" />
        
      </ListItem>
      </NavLink>

      <NavLink to="/">
      <ListItem button>
        <ListItemIcon>
          <Add/>
        </ListItemIcon>
        <ListItemText primary="CreateRoom" />
        
      </ListItem>
      </NavLink>
    </div>
  );
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import MMS from './minMenu.styl';

import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

let activeIndex = 0;
function MenuList(props) {
  const [status, setStatus] = useState(false);
  let { name, children } = props.menuData;

  function handleClick() {
    setStatus(!status)
  }
  let listIndex = false;
  for(let i = 0;i<children.length;i++){
    if(children[i].value === activeIndex){
      listIndex = true;
      break;
    }
  }
  
  return (
    <div onClick={handleClick}>
      <ListItem button>
        <ListItemText primary={name} styleName={listIndex ? 'list active' : 'list'} />
        <span styleName="list-icon">{status ? <ExpandLess /> : <ExpandMore />}</span>
      </ListItem>
      <Collapse in={status} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((o, i) => {
            return (
              <ListItem button component="a" key={i} href={`#${props.menuPath + o.value}`}>
                <ListItemText inset primary={o.name} styleName={activeIndex === o.value ? 'list-child active' : 'list-child'} />
              </ListItem>
            )
          })}
        </List>
      </Collapse>
    </div>
  )
}

const MinMenu = (props) => {
  let { listData, menuPath, isChange } = props;
  const MenuListMMS = CSSModules(MenuList, MMS, { "allowMultiple": true })
  activeIndex = parseInt(props.activeIndex);
  return (
    <List component="nav">
      {
        listData.map((o, i) => {
          if (o.children) {
            return <MenuListMMS key={i} menuData={o} menuPath={menuPath} isChange={isChange} />
          } else {
            return (
              <ListItem key={i} button component="a" href={`#${menuPath + o.value}`}>
                <ListItemText primary={o.name} styleName={activeIndex === o.value ? 'list active' : 'list'} />
              </ListItem>
            )
          }
        })
      }
    </List>
  )
};

MinMenu.propTypes = {
  listData: PropTypes.array,
  menuPath: PropTypes.string,
  isChagnge: PropTypes.bool,
  activeIndex: PropTypes.string
}

export default CSSModules(MinMenu, MMS, { "allowMultiple": true })
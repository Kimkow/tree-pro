import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import MMS from './minMenu.styl';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

let activeIndex = 0;
function MenuList(props) {
  const [status, setStatus] = useState(false);
  let { name, children } = props.menuData;

  function handleClick() {
    setStatus(!status)
  }
  let listIndex = false;
  for (let i = 0; i < children.length; i++) {
    if (children[i].value === activeIndex) {
      listIndex = true;
      break;
    }
  }

  return (
    <div onClick={handleClick}>
      <ListItem button>
        <ListItemText primary={name} styleName={listIndex ? 'list active' : 'list'} />
        <span styleName="list-icon">{status ? <ArrowDropDown /> : <ArrowRight />}</span>
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
  let { listData, menuPath, isChange, isMaiomu } = props;
  const MenuListMMS = CSSModules(MenuList, MMS, { "allowMultiple": true })
  const [miaomuStatus, setMiaomuStatus] = useState(null)
  activeIndex = parseInt(props.activeIndex);
  let handleHoverIn = (i) => {
    setMiaomuStatus(i)
  }
  let handleHoverOut = () => {
    setMiaomuStatus(null)
  }
  return (
    <List component="nav">
      {
        listData.map((o, i) => {
          if (isMaiomu) {
            return (
              <ListItem key={i} button component="a" href={`#${menuPath + o.value}`} style={{ position: 'relative' }} onMouseOver={() => { handleHoverIn(i) }} onMouseLeave={handleHoverOut}>
                <ListItemText primary={o.name} styleName={activeIndex === o.value ? 'list active' : 'list'} />
                {o.children && o.children.length > 0 ? <span styleName="list-icon"><ArrowRight /></span> : ''}
                {o.children && o.children.length > 0 ?
                  (
                    miaomuStatus === i ? <div styleName='list-children-box'>
                      {
                        o.children.map((c, childIndex) => {
                          return (<Button color="primary" key={childIndex} styleName="body-button">{c.name}</Button>)
                        })
                      }
                    </div> : ''
                  ) : ''}
              </ListItem>
            )
          } else {
            if (o.children && o.children.length > 0) {
              return <MenuListMMS key={i} menuData={o} menuPath={menuPath} isChange={isChange} />
            } else {
              return (
                <ListItem key={i} button component="a" href={`#${menuPath + o.value}`}>
                  <ListItemText primary={o.name} styleName={activeIndex === o.value ? 'list active' : 'list'} />
                </ListItem>
              )
            }
          }
        })
      }
    </List>
  )
};

MinMenu.defaultProps = {
  isMaiomu: false
};
MinMenu.propTypes = {
  listData: PropTypes.array,
  menuPath: PropTypes.string,
  activeIndex: PropTypes.string,
  isMaiomu: PropTypes.bool
}

export default CSSModules(MinMenu, MMS, { "allowMultiple": true })
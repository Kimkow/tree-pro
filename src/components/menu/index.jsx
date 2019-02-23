import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import MS from './menu.styl';
import IconButton from '@material-ui/core/IconButton';
import Hideen from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

const options = [
  { name: '首页', link: '/' ,pathname:'index'},
  { name: '关于四季青', link: '/others/about/1',pathname:'about' },
  { name: '工程系列', link: '/others/project/1',pathname:'project' },
  { name: '苗木系列', link: '/others/miaomu/1' ,pathname:'miaomu'},
  { name: '新闻资讯', link: '/others/news/1' ,pathname:'news'},
  { name: '人力资源', link: '/others/peoples',pathname:'peoples' },
  { name: '联系我们', link: '/others/callUs/1',pathname:'callUs' }
];

const ITEM_HEIGHT = 48;
class TreeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      anchorEl: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClick(event) {
    this.setState({
      isOpen: true,
      anchorEl: event.currentTarget
    });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }
  render() {
    const open = this.state.isOpen;
    const anchorEl = this.state.anchorEl;

    const menuList = options.map((option, index) => {
      let activeMenu = '';
      if (option.pathname === this.props.menuName) {
        activeMenu = 'on'
      }
      return (
        <div styleName={`title-0${index + 1} ${activeMenu}`} key={index}>
          <span><Link to={option.link} replace></Link></span>
        </div>
      )
    })
    return (
      <div styleName="tree-menu">
        <Hideen smDown>
          <div styleName="title-box">
            {menuList}
          </div>
        </Hideen>
        <Hideen mdUp>
          <IconButton
            aria-label="More"
            aria-owns={open ? 'long-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MenuIcon style={{ color: '#c0a264', fontSize: '2.5rem' }} />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200,
              },
            }}
            MenuListProps={{
              style: {
                padding: 0
              }
            }}
          >
            {options.map((option, index) => (
              <MenuItem styleName="menuLink" key={index} selected={option.name === 'Pyxis'} onClick={this.handleClose}>
                <Link to={option.link} replace>{option.name}</Link>
              </MenuItem>
            ))}
          </Menu>
        </Hideen>
      </div>
    )
  }
}
TreeMenu.propTypes = {
  menuName: PropTypes.string
}
export default CSSModules(TreeMenu, MS, { "allowMultiple": true });
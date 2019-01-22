import React, { Component } from 'react'
import CSSModules from 'react-css-modules';
import CS from '../assets/style/common.styl';
import IconButton from '@material-ui/core/IconButton';
import Hideen from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

const options = [
  { name: '首页', link: '/', pathName:'index'},
  { name: '关于四季青', link: '/others/about' },
  { name: '工程系列', link: '/others/object'},
  { name: '苗木系列', link: '/others/miaomu' },
  { name: '新闻资讯', link: '/others/news' },
  { name: '人力资源', link: '/others/peoples' },
  { name: '联系我们', link: '/others/callUs' }
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
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    const open = this.state.isOpen;
    const anchorEl = this.state.anchorEl;
    return (
      <div styleName="tree-menu">
        <Hideen smDown>
          <div styleName="title-box">
            {options.map((option, index) => (
              <div styleName={`title-0${index +1}`} key={index}>
                <span><Link to={option.link} replace></Link></span>
              </div>
            ))}
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
export default CSSModules(TreeMenu, CS, { "allowMultiple": true });
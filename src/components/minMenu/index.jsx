import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import MMS from './minMenu.styl';
import { Link } from "react-router-dom";

const minMenu = ()=>{
  return (
    <div styleName="min-menu">这是副菜单</div>
  )
};

export default CSSModules(minMenu,MMS,{ "allowMultiple": true })
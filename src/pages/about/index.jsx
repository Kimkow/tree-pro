import React, { Component, useState } from 'react';
import CSSModules from 'react-css-modules';
import MinMenu from '../../components/minMenu';
import Hideen from '@material-ui/core/Hidden';
import AS from './about.styl';

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aboutId: null
    }
  }
  componentDidMount() {
    console.log(this.props.match.params);
    let { id } = this.props.match.params;
    this.setState({ aboutId: id })
  }
  render() {
    const { aboutId } = this.state;
    return (
      <div styleName="container">
        <MinMenu />
        {aboutId}
      </div>
    )
  }
};
export default CSSModules(About, AS, { "allowMultiple": true });
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import CU from './callus.styl';
class CallUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  componentDidMount() {
    console.log(this.props.location)
  }
  render() {
    return (
      <div className="index-page">
        <div styleName="phone-number">
          <img src={require("../../assets/images/201703031532113211.jpg")} alt="phone"/>
          <p>电话 : 0755-82403817</p>
        </div>
        <div styleName="fax">
          <img src={require("../../assets/images/201703031532203220.jpg")} alt="phone"/>
          <p>传真 : 0755-82403817</p>
        </div>
        <div styleName="address">
          <img src={require("../../assets/images/201703031532293229.jpg")} alt="phone"/>
          <p>地址 : 深圳市罗湖区上步北路2006号</p>
        </div>
        
      </div>
    );
  }
}
export default CSSModules(CallUs, CU, { "allowMultiple": true });
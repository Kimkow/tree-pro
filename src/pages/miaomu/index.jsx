import React, { Component, useState } from 'react';
// import Button from '@material-ui/core/Button';
import CSSModules from 'react-css-modules';
import MS from './miaomu.styl';
import MinMenu from '../../components/minMenu';
import Hideen from '@material-ui/core/Hidden';
import { getMenu } from '../../api/miaomu';
import CircularProgress from '@material-ui/core/CircularProgress';

const Content = () =>{
  const [text,setText] = useState(1234)
  let handleClick = () =>{
    setText(222)
  }
  return (
    <div onClick={handleClick}>
      {text}
    </div>
  )
}
class MiaoMu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minMenuData: [],
      menuLoading: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    console.log('加载完成！')
    this.getMenuList()
  }
  componentDidUpdate() {
    console.log('更新完成！')
  }
  getMenuList() {
    this.setState({ menuLoading: true })
    getMenu({}).then(req => {
      this.setState({ menuLoading: false })
      this.setState({ minMenuData: req || [] })
    })
  }
  handleClick() {
    this.props.history.push('/')
  }
  render() {
    let path = this.props.match.path.split(':')[0];
    let activeIndex = this.props.match.params.id; // 当前子菜单ID
    return (
      <div styleName="container">
        {this.state.menuLoading && <CircularProgress size={30} thickness={5} style={{ color: '#c0a264', position: 'absolute',top:'70%', left: '50%',transform:'translateX(-50%)' }} />}
        <Hideen smDown>
          <div styleName="menu">
            <div styleName="img-group">
              <img src={require('../../assets/images/peoples/menu.png')} alt="" />
              <img src={require('../../assets/images/icont_tip_bg2.png')} alt="" />
            </div>
            <MinMenu isMaiomu listData={this.state.minMenuData} menuPath={path} activeIndex={activeIndex} />
          </div>
        </Hideen>
        <Hideen mdUp>
          <MinMenu listData={this.state.minMenuData} menuPath={path} activeIndex={activeIndex} />
        </Hideen>
        <Content />
      </div>
    );
  }
}
export default CSSModules(MiaoMu, MS, { "allowMultiple": true });;
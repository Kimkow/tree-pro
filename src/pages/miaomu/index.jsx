import React, {Component} from 'react';
// import Button from '@material-ui/core/Button';
import CSSModules from 'react-css-modules';
import MS from './miaomu.styl';
import MinMenu from '../../components/minMenu';
import Hideen from '@material-ui/core/Hidden';
import { getMenu } from '../../api/miaomu';
class MiaoMu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minMenuData: []
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
    getMenu({}).then(req=>{
      // this.setState({minMenuData:req|| []})
      console.log(req)
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
      <Hideen smDown>
        <div styleName="menu">
          <div styleName="img-group">
            <img src={require('../../assets/images/peoples/menu.png')} alt="" />
            <img src={require('../../assets/images/icont_tip_bg2.png')} alt="" />
          </div>
          <MinMenu listData={this.state.minMenuData} menuPath={path} activeIndex={activeIndex} />
        </div>
      </Hideen>
      <Hideen mdUp>
        <MinMenu listData={this.state.minMenuData} menuPath={path} activeIndex={activeIndex} />
      </Hideen>
    </div>
    );
  }
}
export default CSSModules(MiaoMu, MS, { "allowMultiple": true });;
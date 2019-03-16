import React, {Component, useState} from 'react';
import Button from '@material-ui/core/Button';
import CSSModules from 'react-css-modules';
import MS from './miaomu.styl';
import MinMenu from '../../components/minMenu';
import Hideen from '@material-ui/core/Hidden';
import {getMenu, getList, getInfo} from '../../api/miaomu';
import CircularProgress from '@material-ui/core/CircularProgress';

const Content = (props) => {
  const {listData, title, loading} = props;
  let handlerClick = (id) => {
    getInfo({id}).then(req => {
      console.log(req)
    })
  };
  return (
    <div styleName="list-content">
      {loading ?
        <div className="mask">
          <CircularProgress size={30} thickness={5} style={{
            color: '#c0a264',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99999
          }}/>
        </div>
        :
        <div>
          <h1 styleName="list-title">{title}</h1>
          <Button styleName="more-btn body-button">查看更多</Button>
          <div styleName="list">
            {listData.map((o, i) => {
              return (
                <div key={i} onClick={() => {
                  handlerClick(o.id)
                }}>
                  <p>{o.title}</p>
                  <img src={o.titlePicturePath} alt=""/>
                </div>
              )
            })}
          </div>
        </div>
      }
    </div>
  )
}

class MiaoMu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minMenuData: [],
      menuLoading: false,
      listData: [],
      listTitle: '',
      listLoading: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChildData = this.handleChildData.bind(this);
  }

  componentDidMount() {
    this.getMenuList()
  }

  getMenuList() {
    this.setState({menuLoading: true});
    getMenu().then(req => {
      this.setState({menuLoading: false});
      this.setState({minMenuData: req || []});
      this.getContentList(2, '鸡掰');
    })
  }

  getContentList(id, title) {
    this.setState({listLoading: true});
    getList({id}).then(req => {
      this.setState({listLoading: false});
      this.setState({listData: req || [], listTitle: title})
    })
  }
  handleClick() {
    this.props.history.push('/')
  }

  handleChildData(data) {
    let {value, name} = data;
    this.getContentList(value, name);
  }

  render() {
    let path = this.props.match.path.split(':')[0];
    let activeIndex = this.props.match.params.id; // 当前子菜单ID
    const ContentMS = CSSModules(Content, MS, {"allowMultiple": true});
    return (
      <div styleName="container">
        {this.state.menuLoading && <CircularProgress size={30} thickness={5} style={{
          color: '#c0a264',
          position: 'absolute',
          top: '70%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999
        }}/>}
        {this.state.menuLoading && <div className="mask" />}
        <Hideen smDown>
          <div styleName="menu">
            <div styleName="img-group">
              <img src={require('../../assets/images/peoples/menu.png')} alt=""/>
              <img src={require('../../assets/images/icont_tip_bg2.png')} alt=""/>
            </div>
            <MinMenu isMaiomu listData={this.state.minMenuData} menuPath={path} activeIndex={activeIndex}
                     handlerData={this.handleChildData}/>
          </div>
        </Hideen>
        <Hideen mdUp>
          <MinMenu listData={this.state.minMenuData} menuPath={path} activeIndex={activeIndex}
                   handlerData={this.handleChildData}/>
        </Hideen>
        <ContentMS loading={this.state.listLoading} listData={this.state.listData} title={this.state.listTitle}/>
      </div>
    );
  }
}

export default CSSModules(MiaoMu, MS, {"allowMultiple": true});
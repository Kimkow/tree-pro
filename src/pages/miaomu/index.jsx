import React, { Component, useState } from 'react';
import Button from '@material-ui/core/Button';
import CSSModules from 'react-css-modules';
import MS from './miaomu.styl';
import MinMenu from '../../components/minMenu';
import Hideen from '@material-ui/core/Hidden';
import { getMenu, getList, getInfo, getAllList } from '../../api/miaomu';
import CircularProgress from '@material-ui/core/CircularProgress';
import Detail from '../../components/detail';

const Content = (props) => {
  const { listData, loading } = props;
  const [isLoading, setIsLoading] = useState(loading);
  const [showInfo, setShowInfo] = useState(false);
  const [detail, setDetail] = useState({});
  const [contentList, setContentList] = useState(listData);
  const handlerClick = (id) => {
    setIsLoading(true)
    getInfo({ id }).then(req => {
      setIsLoading(false);
      setDetail(req);
      setShowInfo(true);
    }).catch(_ => {
      setIsLoading(false);
      console.log(_);
    })
  };
  const checkDataLength = (list) => {
    let status;
    if (list.data && list.data.length > 3) {
      if (list.show) {
        status = false;
      } else {
        status = true;
      }
    } else {
      status = false;
    }
    return status;
  };
  const handleShowAll = (index) => {
    let list = JSON.parse(JSON.stringify(contentList));
    list[index].show = true;
    setContentList(list);
  }
  return (
    <div>
      {isLoading ?
        <div className="mask">
          <CircularProgress size={30} thickness={5} style={{
            color: '#c0a264',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99999
          }} />
        </div>
        :
        showInfo ?
          <Detail isMaiomu detailObj={{ images: [], head: detail.title, text: detail.text }} video={ detail.video && detail.video.path} />
          :
          <div styleName="list-content">
            {
              contentList.map((list, index) => {
                return (
                  <div key={index} style={{ position: 'relative' }}>
                    <h1 styleName="list-title">{list.title}</h1>
                    {checkDataLength(list) ? <Button styleName="more-btn body-button" onClick={() => { handleShowAll(index) }}>查看更多</Button> : ''}
                    <div styleName="list">
                      {
                        list.data && list.data.length > 0
                          ?
                          list.data.map((o, i) => {
                            if (list.show) {
                              return (
                                <div key={i} onClick={() => { handlerClick(o.id) }}>
                                  <p>{o.title}</p>
                                  <img src={o.titlePicturePath} alt="" />
                                </div>
                              )
                            } else {
                              if (i < 4) {
                                return (
                                  <div key={i} onClick={() => { handlerClick(o.id) }}>
                                    <p>{o.title}</p>
                                    <img src={o.titlePicturePath} alt="" />
                                  </div>
                                )
                              } else {
                                return ''
                              }
                            }
                          })
                          :
                          '无数据'
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
      }
    </div>
  )
};

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
    this.getMenuList();
  }

  getMenuList() {
    this.setState({ menuLoading: true });
    getMenu().then(req => {
      this.setState({ menuLoading: false });
      this.setState({ minMenuData: req || [] });
      this.getAllContentList();
      /* let activeIndex = this.props.match.params.id; // 当前选中menu 的Index
      let childId = this.props.location.pathname.replace(new RegExp(this.props.match.url, 'g'), '');
      childId = parseInt(childId.replace(/\//g, ''));//详情ID
      if (activeIndex !== null && activeIndex !== undefined && activeIndex === '0') {
        this.getAllContentList();
      } else {
        let name = this.findMenuData(childId, req);
        this.getContentList(childId, name);
      } */
    }).catch(_ => {
      console.log(_);
      this.setState({ menuLoading: false });
    })
  }

  getAllContentList() {
    this.setState({ listLoading: true });
    getAllList().then(req => {
      this.setState({ listLoading: false });
      let listData = [];
      req.forEach((o, i) => {
        listData.push({
          title: o.menuName,
          id: o.menuId,
          data: o.articleListVOList
        })
      });
      this.setState({ listData })
    }).catch(_ => {
      console.log(_);
      this.setState({ listLoading: false });
    })
  }
  getContentList(id, title) {
    this.setState({ listLoading: true });
    getList({ id }).then(req => {
      this.setState({ listLoading: false });
      this.setState({ listData: [{ data: req || [], title, show: true }] })
    }).catch(_ => {
      console.log(_);
      this.setState({ listLoading: false });
    })
  }

  handleClick() {
    this.props.history.push('/')
  }

  handleChildData(data) {
    let { value, name } = data;
    this.getContentList(value, name);
  }
  findMenuData(value, data) {
    let name = onceFn(value, data) || '';

    function onceFn(id, list) {
      let newName = ''
      for (let i = 0; i < list.length; i++) {
        if (id === list[i].value) {
          newName = list[i].name;
          break;
        }
        if (list[i].children && list[i].children.length > 0) {
          let hasName = onceFn(id, list[i].children);
          if (hasName) {
            newName = hasName;
            break;
          }
        }
      }
      return newName;
    }

    return name;
  }
  render() {
    let path = this.props.match.path.split(':')[0];
    let activeIndex = this.props.match.params.id; // 当前子菜单ID
    const ContentMS = CSSModules(Content, MS, { "allowMultiple": true });
    return (
      <div styleName="container">
        {this.state.menuLoading && <CircularProgress size={30} thickness={5} style={{
          color: '#c0a264',
          position: 'absolute',
          top: '70%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999
        }} />}
        {this.state.menuLoading && <div className="mask" />}
        <Hideen smDown>
          <div styleName="menu">
            <div styleName="img-group">
              <img src={require('../../assets/images/miaomu/miaomu_title.png')} alt="" />
              <img style={{ cursor: 'pointer' }} src={require('../../assets/images/icont_tip_bg2.png')} alt="" onClick={() => { this.getAllContentList() }} />
            </div>
            <MinMenu isMaiomu listData={this.state.minMenuData} menuPath={path} activeIndex={activeIndex}
              handlerData={this.handleChildData} />
          </div>
        </Hideen>
        <Hideen mdUp>
          <MinMenu listData={this.state.minMenuData} menuPath={path} activeIndex={activeIndex}
            handlerData={this.handleChildData} />
        </Hideen>
        <ContentMS loading={this.state.listLoading} listData={this.state.listData} />
      </div>
    );
  }
}

export default CSSModules(MiaoMu, MS, { "allowMultiple": true });
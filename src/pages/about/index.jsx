import React, { Component, useState } from 'react';
import CSSModules from 'react-css-modules';
import MinMenu from '../../components/minMenu';
import Hideen from '@material-ui/core/Hidden';
import AS from './about.styl';
import contentText from './text';
import Pagination from '../../components/pagination';
import ScrollArea from 'react-scrollbar';

const minMenuData = [
  { name: '公司简介', value: 1 },
  {
    name: '分支机构', value: 2,
    children: [
      { name: '深港花卉中心', value: 3 },
      { name: '湖南长沙子公司', value: 4 },
      { name: '安徽子公司', value: 5 },
      { name: '江西九江子公司', value: 6 },
      { name: '湖北分公司', value: 7 },
      { name: '安徽分公司', value: 8 },
      { name: '湖南永州苗木基地', value: 9 }
    ]
  },
  { name: '荣誉资质', value: 10 },
  { name: '企业文化', value: 11 },
  { name: '历史沿革', value: 12 },
];

function OtherContent10() {
  const contentList = contentText['10']
  const [activePage, setActivePage] = useState(1);
  const [activeBox, setActiveBox] = useState(null);
  const [activeList, setActiveList] = useState(contentList[0]);
  function handleChangePage(page) {
    setActivePage(page);
    setActiveList(contentList[parseInt(page - 1)])
  }
  function handleClick(obj) {
    setActiveBox(obj);
  }
  function handleClose() {
    setActiveBox(null);
  }
  function MaskBox() {
    if (activeBox) {
      return (
        <div styleName="active-box">
          <div styleName="active-content">
            <span styleName="close-btn" onClick={handleClose}></span>
            <img src={require(`../../assets/images/about/10-${activePage}/${activeBox.url}`)} alt="" styleName="img" />
            <p styleName="title">{activeBox.name}</p>
          </div>
        </div>
      )
    } else {
      return
    }
  }
  const MaskBoxAS = CSSModules(MaskBox, AS, { "allowMultiple": true });
  return (
    <div styleName="text-container">
      <div styleName="list-container">
        {
          activeList.map((o, i) => {
            return (
              <div key={i} styleName="list" onClick={() => { handleClick(o) }}>
                <img src={require(`../../assets/images/about/10-${activePage}/${o.url}`)} alt="" />
                <p>{o.name}</p>
              </div>
            )
          })
        }
      </div>
      <Pagination total={14} pageSize={6} currentChange={handleChangePage} />
      <MaskBoxAS />
    </div>
  )
}
function OtherContent12() {
  const contentList = contentText['12']
  return (
    <div styleName="text-container">
      <div styleName="line"></div>
      {
        contentList.map((o, i) => {
          return (
            <div key={i} styleName={i % 2 ? 'history-list right' : 'history-list left'}>
              <div styleName="history-img">
                <img src={require(`../../assets/images/about/12/${o.url}`)} alt="" />
                <span styleName="years">{o.years}</span>
              </div>
              <div styleName='history-body'>
                <h1>{o.name}</h1>
                <ScrollArea className="myScroll">
                  <p styleName="history-text" dangerouslySetInnerHTML={{ __html: o.text }}></p>
                </ScrollArea>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}
function NormalContent(props) {
  const { activeIndex } = props;
  const contentObj = contentText[activeIndex];
  let img = '';
  if (contentObj.url) {
    img = <img src={require(`../../assets/images/${contentObj.url}`)} alt="" />
  }
  return (
    <div styleName="text-container">
      <div styleName="line"></div>
      <h1>{contentObj.h1}</h1>
      {
        contentObj.list.map((o, i) => {
          return (<p key={i}>{o}</p>)
        })
      }
      {img}
    </div>
  )
}
function DefaultContent() {
  return (<div styleName="text-container">暂无数据</div>)
}
function ContentText(props) {
  let { activeIndex } = props;
  let valueCount = parseInt(activeIndex);
  const NormalContentAS = CSSModules(NormalContent, AS, { "allowMultiple": true });
  const OtherContent10AS = CSSModules(OtherContent10, AS, { "allowMultiple": true });
  const OtherContent12AS = CSSModules(OtherContent12, AS, { "allowMultiple": true });
  const DefaultAS = CSSModules(DefaultContent, AS, { "allowMultiple": true });
  if (valueCount < 10) {
    return <NormalContentAS activeIndex={activeIndex} />
  } else if (valueCount === 10) {
    return (<OtherContent10AS activeIndex={activeIndex} />)
  } else if (valueCount === 12) {
    return (<OtherContent12AS activeIndex={activeIndex} />)
  } else {
    return <DefaultAS />
  }
}

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChange: true
    }
  }
  render() {
    const { isChange } = this.state;
    let path = this.props.match.path.split(':')[0];
    let activeIndex = this.props.match.params.id;

    return (
      <div styleName="container">
        <Hideen smDown>
          <div styleName="menu">
            <div styleName="img-group">
              <img src={require('../../assets/images/about/menu.png')} alt="" />
              <img src={require('../../assets/images/icont_tip_bg2.png')} alt="" />
            </div>
            <MinMenu listData={minMenuData} menuPath={path} activeIndex={activeIndex} isChange={isChange} />
          </div>
        </Hideen>
        <Hideen mdUp>
          <MinMenu listData={minMenuData} menuPath={path} activeIndex={activeIndex} isChange={isChange} />
        </Hideen>
        <ContentText activeIndex={activeIndex} />
      </div>
    )
  }
};
export default CSSModules(About, AS, { "allowMultiple": true });